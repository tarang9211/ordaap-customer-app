import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import OrdersList from '../../components/orders-list'
import { ButtonGroup, ConfirmButton } from '../../components/button-group'

import ReadQR from '../read-qr'

import { placeOrder } from '../../thunks/order'

class NewOrder extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isQRReaderShown: false }
  }

  showQRReader = () => {
    this.setState({ isQRReaderShown: true })
  }

  hideQRReader = () => {
    this.setState({ isQRReaderShown: false })
  }

  render = () => [
    !this.props.isStationSet && this.state.isQRReaderShown &&
    <ReadQR key="read-qr" isModal handleModalDismiss={this.hideQRReader} />,
    <OrdersList
      key="new-orders-list"
      orders={this.props.orders}
      sendingItemsCount={this.props.sendingItemsCount}
      currency={this.props.currency}
      placeholder="No items"
      markUnavailable
      handleClick={this.props.editItem}
    />,
    this.props.orders.length > 0 ?
      <ButtonGroup key="button-group">
        {
          this.props.isSendingCart || this.props.orders.some(order => !order.available) ?
            <ConfirmButton
              key="confirm-button"
              text={this.props.isSendingCart ? 'Sending to kitchen' : 'Remove unavailable items'}
              disabled
              loading={this.props.isSendingCart}
            />
            :
            <ConfirmButton
              key="confirm-button"
              text={this.props.isStationSet ? 'Confirm Order' : 'Scan QR on the table'}
              handleClick={this.props.isStationSet ? this.props.confirmOrder : this.showQRReader}
            />
        }
      </ButtonGroup>
      : null
  ]
}

NewOrder.propTypes = {
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
      instruction: PropTypes.string
    })
  ).isRequired,
  isSendingCart: PropTypes.bool.isRequired,
  sendingItemsCount: PropTypes.number,
  currency: PropTypes.string.isRequired,
  isStationSet: PropTypes.bool.isRequired,
  editItem: PropTypes.func.isRequired,
  confirmOrder: PropTypes.func.isRequired
}

NewOrder.defaultProps = {
  sendingItemsCount: 0
}

const mapStateToProps = ({
  metadata: { sid },
  app: { isSendingCart },
  restaurant: { currency, menu },
  cart: { items, sendingItemsCount }
}) => ({
  orders: items.map(({ iid, selection }) =>
    ({ ...selection, iid, name: menu[iid].name, available: menu[iid].available })),
  isSendingCart,
  sendingItemsCount,
  currency,
  isStationSet: typeof sid === 'string' && sid.length > 0
})

const mapDispatchToProps = (dispatch, ownProps) => ({

  confirmOrder: () => {
    dispatch(placeOrder())
  },

  editItem: (index) => {
    ownProps.editItem(index)
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)
