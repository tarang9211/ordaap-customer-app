import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import RatingBar from './rating-bar'
import FeedbackComments from './feedback-comments'
import OtherComments from './other-comments'
import EmailInput from './email-input'

import './feedback.css'

class Feedback extends PureComponent {
  state = {
    rating: 0
  }

  email = ''
  comments = new Map()
  otherComments = ''

  handleRatingChange = (rating) => {
    this.setState({ rating })
    this.comments.clear()
    this.handleChange()
  }

  handleCommentsChange = (hasCommented, i, comment) => {
    if (hasCommented) this.comments.set(i, comment)
    else this.comments.delete(i)
    this.handleChange()
  }

  handleOtherCommentsChange = (comment) => {
    this.otherComments = comment
    this.handleChange()
  }

  handleEmailChange = (email) => {
    this.email = email
    this.handleChange()
  }

  handleChange = () => {
    this.props.handleChange({
      rating: this.state.rating,
      comments: [...this.comments.values()].join(','),
      otherComments: this.otherComments,
      email: this.email
    })
  }

  render = () => [
    <RatingBar key="rating-bar" rating={this.state.rating} handleChange={this.handleRatingChange} />,
    <FeedbackComments key="feedback-comments" rating={this.state.rating} handleChange={this.handleCommentsChange} />,
    this.state.rating ? <OtherComments key="other-comments" handleChange={this.handleOtherCommentsChange} /> : null,
    this.state.rating && this.props.shouldGetEmail ?
      <EmailInput
        key="email-input"
        handleChange={this.handleEmailChange}
        emailAlreadyInUse={this.props.emailAlreadyInUse}
      /> : null
  ]
}

Feedback.propTypes = {
  shouldGetEmail: PropTypes.bool.isRequired,
  emailAlreadyInUse: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

Feedback.defaultProps = {
  emailAlreadyInUse: ''
}

export default Feedback
