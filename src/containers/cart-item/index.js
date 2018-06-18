import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ScrollToTop from '../../components/scroll-to-top'
import Navbar from '../../components/navbar'
import ItemDescription from '../../components/item-description'
import ItemSelection from '../../components/item-selection'
import { ButtonGroup, ConfirmButton, DeleteButton } from '../../components/button-group'

import { DataContainer } from '../../containers'
import tagMapper from '../../utils/tag-mapper'

import { setCurrentCartItem, updateCartItem, removeCartItem } from '../../actions'

const CartItem = ({
  restaurantName,
  item: { iid, name, desc, extra, tags, mods, available } = {},
  tagDefinitions,
  currency,
  cart,
  selection,
  initialize,
  onInitializeError,
  navigateBack,
  storeSelection,
  updateCart,
  removeItem
}) => ([
  <ScrollToTop key="scroll-to-top" />,
  <Navbar
    key="navbar"
    fixed
    title={restaurantName}
    handleBack={navigateBack}
  />,
  <DataContainer
    key="data-container"
    initialize={() => initialize(iid, cart)}
    onError={onInitializeError}
  >
    <ItemDescription
      {...{ name, desc, extra, tags, tagDefinitions, available }}
      disabled={!available}
    />,
    <ItemSelection
      {...{ mods, currency, ...selection, available }}
      updateSelection={update => storeSelection(iid, update, selection)}
    />
    <ButtonGroup fixed>
      <ConfirmButton
        disabled={!available}
        text={!available ? 'Currently not available' : 'Update'}
        aside={!available ? '' : `${currency} ${selection && selection.total}`}
        handleClick={() => updateCart(iid, selection)}
      />
      <DeleteButton
        text={'Remove'}
        handleClick={removeItem}
      />
    </ButtonGroup>
  </DataContainer>
])

CartItem.propTypes = {
  restaurantName: PropTypes.string,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string,
    extra: PropTypes.string,
    price: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    mods: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      min: PropTypes.number,
      max: PropTypes.number,
      options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number
      })).isRequired
    }))
  }),
  currency: PropTypes.string,
  selection: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    mods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    instruction: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
  }),
  tagDefinitions: PropTypes.shape(),
  initialize: PropTypes.func.isRequired,
  onInitializeError: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
  storeSelection: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
}

const mapStateToProps = ({
  restaurant: { name, currency, tags, menu },
  tags: { global },
  cart
}) => ({
  currency,
  cart,
  restaurantName: name,
  item: menu[cart.current.iid],
  selection: cart.current.selection,
  tagDefinitions: tagMapper.combineTags(global, tags)
})

const mapDispatchToProps = (dispatch, { history, match: { params: { cid } } }) => ({
  initialize: (iid, { current, items }) => {
    const item = items[cid]
    // if we are referring to an invalid cart item, then reject immediately
    if (item == null) return Promise.reject()
    // if the current cart item is set, then resolve
    if (item.iid === iid && item.selection === current.selection) return Promise.resolve()
    // else go ahead and set it
    dispatch(setCurrentCartItem(item.iid, item.selection))
    // and make way for DataContainer to repeat these checks
    // NOTE: the DataContainer will keep calling initialize till
    // it resolves at most once
    return Promise.resolve(false)
  },

  onInitializeError: () => {
    history.backOrTo('/orders')
  },

  navigateBack: () => {
    history.backOrTo('/orders')
  },

  storeSelection: (iid, update, selection) => {
    let options = selection.options
    if (update.mods) {
      options = update.mods.reduce((allOptions, mod) =>
        mod.options.reduce((selectedOptions, { isSelected, ...option }) =>
          (isSelected ? selectedOptions.concat(option) : selectedOptions)
          , allOptions)
        , [])
    }
    dispatch(setCurrentCartItem(iid, { ...selection, ...update, options }))
  },

  updateCart: (iid, selection) => {
    dispatch(updateCartItem(cid, iid, selection))
    history.backOrTo('/orders')
  },

  removeItem: () => {
    dispatch(removeCartItem(cid))
    history.backOrTo('/orders')
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
