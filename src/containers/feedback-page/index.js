import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ScrollToTop from '../../components/scroll-to-top'
import Navbar from '../../components/navbar'
import Feedback from '../../components/feedback'
import { ButtonGroup, ConfirmButton } from '../../components/button-group'

import { linkEmail, submitFeedback } from '../../thunks/feedback'

class FeedbackPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { feedback: {} }
  }

  handleFeedbackChange = (feedback) => {
    this.setState({ feedback })
  }

  render = () => [
    <ScrollToTop key="scroll-to-top" />,
    <Navbar
      key="navbar"
      fixed
      title="Feedback"
      handleBack={this.props.navigateBack}
    />,
    <Feedback
      key="feedback"
      shouldGetEmail={this.props.shouldGetEmail}
      handleChange={this.handleFeedbackChange}
      emailAlreadyInUse={this.props.emailAlreadyInUse}
    />,
    <ButtonGroup key="button-group">
      <ConfirmButton
        text="Submit"
        disabled={this.state.feedback.rating <= 0}
        loading={this.props.isSubmittingFeedback}
        handleClick={this.props.handleFeedbackSubmit}
      />
    </ButtonGroup>
  ]
}

FeedbackPage.propTypes = {
  shouldGetEmail: PropTypes.bool.isRequired,
  emailAlreadyInUse: PropTypes.string.isRequired,
  isSubmittingFeedback: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  handleFeedbackSubmit: PropTypes.func.isRequired
}

const mapStateToProps = ({ app: { emailLinked, emailAlreadyInUse, isSubmittingFeedback } }) => ({
  shouldGetEmail: !emailLinked,
  emailAlreadyInUse,
  isSubmittingFeedback
})

const mapDispatchToProps = (dispatch, { history }) => ({
  handleFeedbackSubmit: ({ rating, comments, otherComments, email }) => {
    dispatch(submitFeedback(rating, comments, otherComments))
    if (email && email.length > 0) dispatch(linkEmail(email))
    history.backOrTo('/restaurant')
  },

  navigateBack: () => {
    history.backOrTo('/restaurant')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage)
