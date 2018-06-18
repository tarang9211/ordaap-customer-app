import React from 'react'
import PropTypes from 'prop-types'

import './orders-list.css'

const OrdersList = ({
  orders,
  sendingItemsCount,
  currency,
  isPrevious,
  placeholder,
  markUnavailable,
  handleClick
}) => [
  isPrevious ? (
    <section
      key="previous-orders-list-header"
      className="previous-orders-list-header"
    >
      <h4 className="title is-4">Sent orders</h4>
      <hr />
    </section>
  ) : null,

  <section
    key="orders-list"
    className="orders-list"
  >
    {orders && orders.length ? (
      orders.map(
        ({ iid, name, quantity, total, options = [], instruction, cancelled, available }, i) => (
          <div
            key={`${iid}-${i + 1}`}
            className={`item${cancelled ? ' cancelled' : ''}${markUnavailable && !available ? ' unavailable' : ''}`}
            {
            ...handleClick && i > sendingItemsCount - 1 && {
              role: 'button',
              tabIndex: 0,
              onClick: () => handleClick(i, {
                iid,
                name,
                quantity,
                total,
                options,
                instruction,
                cancelled
              })
            }
            }
          >
            <div className="desc">
              <h6 className="title is-6">{name}</h6>
              {options && options.length ? (
                <p>
                  {options
                    .reduce(
                      (str, option) =>
                        `${str}${option.name}${option.price ? ` (${currency} ${option.price.toFixed(2)})` : ''}, `,
                      ''
                    )
                    .slice(0, -2)}
                </p>
              ) : null}
              {instruction && instruction.length ? <i>{instruction}</i> : null}
              {i <= sendingItemsCount - 1 && <p><span className="tag is-primary is-small">Sending...</span></p>}
            </div>
            <h6 className="quantity">{`⨯ ${quantity}`}</h6>
            <h6 className="price">{`${currency} ${total.toFixed(2)}`}</h6>
          </div>
        )
      )
    ) : (
      <h6 className="subtitle is-6 has-text-centered has-text-grey-light">{placeholder}</h6>
    )}
  </section>
]

OrdersList.propTypes = {
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
  ),
  sendingItemsCount: PropTypes.number,
  currency: PropTypes.string,
  isPrevious: PropTypes.bool,
  placeholder: PropTypes.string,
  markUnavailable: PropTypes.bool,
  handleClick: PropTypes.func
}

OrdersList.defaultProps = {
  orders: [],
  sendingItemsCount: 0,
  currency: '',
  isPrevious: false,
  placeholder: '',
  markUnavailable: false,
  handleClick: null
}

export default OrdersList
