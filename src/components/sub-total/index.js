import React from 'react'
import PropTypes from 'prop-types'

import './sub-total.css'

const SubTotal = ({ displayText, currency, orders }) => (
  <section
    key="sub-total"
    className="sub-total-container"
  >
    <div className="sub-total">
      <h4 className="title is-4">{displayText}</h4>
      <h4 className="title is-4">{`${currency} ${orders.reduce((total, order) => (order.cancelled ? total : total + order.total), 0).toFixed(2)}`}</h4>
    </div>
  </section>
)

SubTotal.propTypes = {
  displayText: PropTypes.string.isRequired,
  currency: PropTypes.string,
  orders: PropTypes.arrayOf(PropTypes.shape())
}

SubTotal.defaultProps = {
  currency: '',
  orders: []
}

export default SubTotal
