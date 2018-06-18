import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import OrdersList from '../../components/orders-list'
import Fab from '../../components/fab'


const PreviousOrder = ({ orders, currency, navigateToBilling }) => [
  <OrdersList
    key="previous-orders-list"
    isPrevious
    orders={orders}
    currency={currency}
    placeholder="No orders sent to kitchen"
  />,
  orders.length > 0 ?
    <Fab
      key="checkout-button"
      icon="money"
      handleClick={navigateToBilling}
    />
    : null
]

PreviousOrder.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      iid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          price: PropTypes.number
        })
      ),
      instruction: PropTypes.string,
      cancelled: PropTypes.bool
    })
  ).isRequired,
  currency: PropTypes.string.isRequired,
  navigateToBilling: PropTypes.func.isRequired
}

const mapStateToProps = ({ restaurant: { currency }, order: { buckets } }) => ({
  orders: ([...buckets.values()]).reduce((grouped, { items }) => grouped.concat(items), []),
  currency
})

export default connect(mapStateToProps, null)(PreviousOrder)
