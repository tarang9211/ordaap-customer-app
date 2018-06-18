import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ScrollToTop from '../../components/scroll-to-top'
import Navbar from '../../components/navbar'
import Text from '../../components/text'
import OrdersList from '../../components/orders-list'
import SubTotal from '../../components/sub-total'
import Feedback from '../../components/feedback'
import { ButtonGroup, ConfirmButton } from '../../components/button-group'

import { checkout } from '../../thunks/order'
import { linkEmail, submitFeedback } from '../../thunks/feedback'
import { resetApp } from '../../thunks/app'

class Billing extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { feedback: {} }
  }

  handleFeedbackChange = (feedback) => {
    this.setState({ feedback })
  }

  handleFeedbackSubmit = () => {
    this.props.handleFeedbackSubmit({ ...this.state.feedback })
  }

  render = () => [
    <ScrollToTop key="scroll-to-top" />,
    <Navbar
      key="navbar"
      fixed
      title="Billing"
      handleBack={this.props.isOrderClosed ? null : this.props.navigateBack}
    />,
    this.props.isOrderClosed &&
    <Text
      key="order-closed-text"
      text={'Your order has been closed. You should receive your bill from the restaurant shortly.'}
    />,
    <OrdersList
      key="orders-list"
      orders={this.props.orders}
      currency={this.props.currency}
    />,
    <SubTotal
      key="sub-total"
      displayText="Your total"
      currency={this.props.currency}
      orders={this.props.orders}
    />,
    this.props.isOrderClosed &&
    <Feedback
      key="feedback"
      shouldGetEmail={this.props.shouldGetEmail}
      handleChange={this.handleFeedbackChange}
      emailAlreadyInUse={this.props.emailAlreadyInUse}
    />,
    <ButtonGroup key="button-group">
      <ConfirmButton
        text={this.props.isOrderClosed ? 'Submit' : 'Request Bill'}
        loading={this.props.isClosingOrder || this.props.isSubmittingFeedback}
        handleClick={this.props.isOrderClosed ?
          this.handleFeedbackSubmit : this.props.checkoutOrder}
        disabled={this.props.isOrderClosed && typeof this.state.feedback.rating !== 'number'}
      />
    </ButtonGroup>
  ]
}

Billing.propTypes = {
  isClosingOrder: PropTypes.bool.isRequired,
  isOrderClosed: PropTypes.bool.isRequired,
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
  currency: PropTypes.string.isRequired,
  shouldGetEmail: PropTypes.bool.isRequired,
  emailAlreadyInUse: PropTypes.string.isRequired,
  isSubmittingFeedback: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  handleFeedbackSubmit: PropTypes.func.isRequired,
  checkoutOrder: PropTypes.func.isRequired
}

const mapStateToProps = ({
  app: { isClosingOrder, emailLinked, emailAlreadyInUse, isSubmittingFeedback },
  restaurant: { currency },
  order: { buckets, closed }
}) => ({
  isClosingOrder,
  isOrderClosed: closed,
  orders: ([...buckets.values()]).reduce((grouped, { items }) => grouped.concat(items), []),
  currency,
  shouldGetEmail: !emailLinked,
  emailAlreadyInUse,
  isSubmittingFeedback
})

const mapDispatchToProps = (dispatch, { history }) => ({
  navigateBack: () => {
    history.backOrTo('/orders')
  },

  handleFeedbackSubmit: ({ rating, comments, otherComments, email }) => {
    if (email && email.length > 0) dispatch(linkEmail(email))
    dispatch(submitFeedback(rating, comments, otherComments)).then(() => {
      dispatch(resetApp())
      history.replace('/scan')
    })
  },

  checkoutOrder: () => {
    dispatch(checkout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Billing)
