import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Banner from '../../components/banner'
import MenuList from '../../components/menu-list'
import Fab from '../../components/fab'

import { DataContainer } from '../../containers'

import tagMapper from '../../utils/tag-mapper'

const RestaurantHome = ({
  isFetchingRestaurant,
  restaurant: { name, cuisines, currency, timings, images, menu } = {},
  hideUnavailableMenuItems,
  cartSize,
  oid,
  tagDefinitions,
  initialize,
  onInitializeError,
  handleClick,
  navigateToCart
}) => [
  <Banner
    key="banner"
    {...{ name, cuisines, timings }}
    imageUrl={images[0]}
  />,
  <MenuList
    key="menu-list"
    {...{ menu, currency, tagDefinitions, hideUnavailableMenuItems, handleClick }}
  />,
  (oid.length > 0 || cartSize > 0) &&
    <Fab
      key="fab"
      icon="cutlery"
      handleClick={navigateToCart}
      tag={cartSize}
    />,
  <DataContainer
    key="data-container"
    initialize={() => initialize(isFetchingRestaurant, name)}
    onError={onInitializeError}
  />
]

RestaurantHome.propTypes = {
  isFetchingRestaurant: PropTypes.bool.isRequired,
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cuisines: PropTypes.string,
    currency: PropTypes.string,
    timings: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    menu: PropTypes.shape()
  }),
  hideUnavailableMenuItems: PropTypes.bool.isRequired,
  cartSize: PropTypes.number.isRequired,
  oid: PropTypes.string,
  tagDefinitions: PropTypes.shape().isRequired,
  initialize: PropTypes.func.isRequired,
  onInitializeError: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  navigateToCart: PropTypes.func.isRequired
}

RestaurantHome.defaultProps = {
  oid: ''
}

const mapStateToProps = ({
  metadata: { oid },
  app: { isFetchingRestaurant },
  restaurant: { config, ...restaurant },
  cart: { items },
  tags: { global }
}) => ({
  isFetchingRestaurant,
  restaurant,
  hideUnavailableMenuItems: !!config && !!config.hideUnavailable,
  cartSize: items.length,
  oid,
  tagDefinitions: tagMapper.combineTags(global, restaurant.tags)
})

const mapDispatchToProps = (dispatch, { history }) => ({

  initialize: (isFetchingRestaurant, name) => {
    if (typeof name === 'string' && name.length > 0) return Promise.resolve()
    if (isFetchingRestaurant) return Promise.resolve(false)
    return Promise.reject()
  },

  onInitializeError: () => {
    history.to('/scan')
  },

  handleClick: (iid) => {
    history.to(`/menu/${iid}`)
  },

  navigateToCart: () => {
    history.to('/orders')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantHome)
