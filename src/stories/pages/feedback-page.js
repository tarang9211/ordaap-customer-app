import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Navbar from '../../components/navbar'
import Feedback from '../../components/feedback'

const FeedbackPage = ({ getEmail, emailAlreadyInUse, action }) => (
  <Page>
    <Navbar
      title="Feedback"
      handleBack={() => action('Back pressed')}
    />
    <Feedback
      getEmail={getEmail}
      handleChange={action('changed')}
      emailAlreadyInUse={emailAlreadyInUse}
    />
  </Page>
)

FeedbackPage.propTypes = {
  getEmail: PropTypes.bool,
  action: PropTypes.func.isRequired,
  emailAlreadyInUse: PropTypes.string
}

FeedbackPage.defaultProps = {
  getEmail: true,
  emailAlreadyInUse: ''
}

export default FeedbackPage
