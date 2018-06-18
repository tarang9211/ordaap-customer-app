import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Navbar from '../../components/navbar'
import OrdersList from '../../components/orders-list'
import { ButtonGroup, ConfirmButton } from '../../components/button-group'
import { Toast } from '../../components/toast'

const rand = () => Math.random().toString(36).slice(2)

class OrderConfirmation extends PureComponent {
  state = {
    toastMessages: [],
    orders: [
      {
        iid: rand(),
        name: 'Sambhar Vada (2)',
        quantity: 2,
        total: 10
      },
      {
        iid: rand(),
        name: 'Aloo Masala Dosa',
        quantity: 1,
        total: 6.25,
        options: [
          { name: 'Sweet Sauce' },
          { name: 'Spicy Sauce' },
          { name: 'Extra Dahi', price: 1.25 }
        ],
        instruction: 'Do not add any corriander or nuts'
      },
      {
        iid: rand(),
        name: 'Aloo Masala Dosa',
        quantity: 1,
        total: 8.5
      }
    ]
  }

  dismissToast = () => {
    this.setState({ toastMessages: this.state.toastMessages.slice(1) })
    if (this.state.toastMessages.length === 0) {
      this.setState({ isSendingCart: false, sendingItemsCount: 0 })
    }
  }

  handleConfirmClick = () => {
    this.setState({
      isSendingCart: true,
      sendingItemsCount: 2,
      toastMessages: this.state.toastMessages.concat([
        {
          message:
            'You can continue browsing the menu while we pass your order to the kitchen',
          duration: Toast.DURATION_LONG
        },
        {
          message: 'There was some error contacting the kitchen',
          duration: Toast.DURATION_LONG,
          error: true
        },
        {
          message: 'We will keep retrying',
          duration: Toast.DURATION_SHORT,
          error: true
        },
        {
          message: 'Order passed to the kitchen successfully!',
          duration: Toast.DURATION_LONG
        },
        {
          message:
            'A long enough message that is used here serving absolutely no purpose whatsoever except to have itself wrap to several lines on mobile screens.',
          duration: Toast.DURATION_LONG
        }
      ])
    })
  }

  render = () => (
    <Page>
      <Toast toast={this.state.toastMessages[0]} handleDismiss={this.dismissToast} />
      <Navbar
        fixed
        title="New Order"
        handleBack={() => this.props.action('Back pressed')}
      />
      <OrdersList
        orders={this.state.orders}
        handleOnClick={this.props.action}
        sendingItemsCount={this.state.sendingItemsCount}
      />
      <ButtonGroup>
        <ConfirmButton
          text={this.state.isSendingCart ? 'Sending to kitchen' : 'Confirm Order'}
          disabled={this.state.isSendingCart}
          loading={this.state.isSendingCart}
          handleClick={this.handleConfirmClick}
        />
      </ButtonGroup>
      <OrdersList
        isPrevious
        orders={this.state.orders}
        handleOnClick={this.props.action}
      />
    </Page>
  )
}

OrderConfirmation.propTypes = {
  action: PropTypes.func.isRequired
}

export default OrderConfirmation
