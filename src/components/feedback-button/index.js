import React from 'react'
import PropTypes from 'prop-types'

import './feedback-button.css'

const FeedbackButton = ({ handleClick }) => (
  <div className="feedback-button" role="button" tabIndex={0} onClick={handleClick}>
    <span className="icon">
      <i className="fa fa-bullhorn" />
    </span>
  </div>
)

FeedbackButton.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default FeedbackButton
