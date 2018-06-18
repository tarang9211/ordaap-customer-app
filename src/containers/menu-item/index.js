import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ScrollToTop from '../../components/scroll-to-top'
import Navbar from '../../components/navbar'
import ItemDescription from '../../components/item-description'
import ItemSelection from '../../components/item-selection'
import { ButtonGroup, ConfirmButton } from '../../components/button-group'

import { DataContainer } from '../../containers'
import tagMapper from '../../utils/tag-mapper'

import { setMenuItemSelection, addToCart, removeMenuItemSelection, addToCartError } from '../../actions'

const MenuItem = ({
  isFetchingRestaurant,
  restaurantName,
  item: { iid, name, desc, extra, price, tags, mods } = {},
  available,
  tagDefinitions,
  currency,
  selection,
  initialize,
  onInitializeError,
  navigateBack,
  storeSelection,
  addItemToCart
}) => ([
  <ScrollToTop key="scroll-to-top" />,
  <Navbar
    key="navbar"
    fixed
    title={restaurantName}
    handleBack={navigateBack}
  />,
  <ItemDescription
    key="item-description"
    {...{ name, desc, extra, tags, tagDefinitions }}
    disabled={!available}
  />,
  <DataContainer
    key="data-container"
    initialize={() => initialize(isFetchingRestaurant, iid, mods, price, selection)}
    onError={onInitializeError}
  >
    <ItemSelection
      {...{ price, currency, ...selection, available }}
      updateSelection={update => storeSelection(iid, update, selection)}
    />
    <ButtonGroup fixed>
      <ConfirmButton
        disabled={!available}
        text={!available ? 'Currently not available' : 'Add to order'}
        aside={!available ? '' : `${currency} ${selection && selection.total}`}
        handleClick={() => addItemToCart(iid, selection)}
      />
    </ButtonGroup>
  </DataContainer>
])

MenuItem.propTypes = {
  isFetchingRestaurant: PropTypes.bool.isRequired,
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
  addItemToCart: PropTypes.func.isRequired
}

MenuItem.defaultProps = {
  restaurantName: '',
  item: undefined,
  currency: '',
  selection: null
}

const mapStateToProps = ({
  app: { isFetchingRestaurant },
  restaurant: { name, currency, tags, menu },
  tags: { global },
  menu: { selections }
}, { match: { params: { iid } } }) => ({
  isFetchingRestaurant,
  currency,
  restaurantName: name,
  available: menu[iid].available,
  item: menu[iid],
  selection: selections.get(iid),
  tagDefinitions: tagMapper.combineTags(global, tags)
})

const mapDispatchToProps = (dispatch, { history }) => ({
  initialize: (isFetchingRestaurant, iid, mods, price, selection) => {
    if (iid != null) {
      if (selection != null) {
        return Promise.resolve()
      }

      dispatch(setMenuItemSelection(iid, {
        quantity: 1,
        mods: mods || [],
        instruction: '',
        price,
        total: price
      }))
      return Promise.resolve(false)
    }
    if (isFetchingRestaurant) return Promise.resolve(false)
    return Promise.resolve()
  },

  onInitializeError: () => {
    history.backOrTo('/restaurant')
  },

  navigateBack: () => {
    history.backOrTo('/restaurant')
  },

  storeSelection: (iid, update, selection) => {
    let options = []
    if (update.mods) {
      options = update.mods.reduce((allOptions, mod) =>
        mod.options.reduce((selectedOptions, { isSelected, ...option }) =>
          (isSelected ? selectedOptions.concat(option) : selectedOptions)
          , allOptions)
        , [])
    }
    dispatch(setMenuItemSelection(iid, { ...selection, ...update, options }))
  },

  addItemToCart: (iid, selection) => {
    let errorMessage = ''
    const error = selection.mods.some((mod) => {
      // The first part of the if ensures that either it is a required mod or
      // at least one option in the mod is selected. The second part checks
      // if the selected count is less than the designated min. One, both or neither of `mod.min`
      // and `mod.count` can be `undefined`.
      if ((mod.required || mod.count > 0) && ((mod.count || 0) < (mod.min || 0))) {
        errorMessage = `Please select options for ${mod.name}`
        return true
      }
      return false
    })
    if (error) {
      dispatch(addToCartError(errorMessage))
    } else {
      dispatch(addToCart(iid, selection))
      history.backOrTo('/restaurant')
      const unlisten = history.listen(() => {
        dispatch(removeMenuItemSelection(iid))
        unlisten()
      })
    }
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem)
