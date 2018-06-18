import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Page from '../../components/page'
import Navbar from '../../components/navbar'
import OrdersList from '../../components/orders-list'
import { ButtonGroup, ConfirmButton } from '../../components/button-group'
import SubTotal from '../../components/sub-total'

const rand = () => Math.random().toString(36).slice(2)

class Billing extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
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
          total: 8.5
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
        }
      ]
    }
  }

  render = () => (
    <Page>
      <Navbar
        fixed
        title="Your Order(s)"
        handleBack={() => this.props.action('Back pressed')}
      />
      <OrdersList
        orders={this.state.orders}
        handleOnClick={this.props.action}
      />
      <SubTotal displayText="Your Total" orders={this.state.orders} />
      <ButtonGroup>
        <ConfirmButton
          text="Checkout"
          handleClick={this.props.action}
        />
      </ButtonGroup>
    </Page>
  )
}

Billing.propTypes = {
  action: PropTypes.func.isRequired
}

export default Billing
