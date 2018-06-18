import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const EMAIL_VALIDATION_DELAY = 100
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i

class EmailInput extends PureComponent {
  static delayedEmailValidationTimer

  state = {
    emailValid: false,
    email: ''
  }

  componentDidMount = () => {
    this.setState({ email: this.props.emailAlreadyInUse })
  }

  componentWillUnmount = () => {
    clearTimeout(this.delayedEmailValidationTimer)
  }

  handleEmailInput = (event) => {
    this.setState({ email: event.target.value })
    // Deferring email validation since regex matching is heavy and is not
    // need for every character change
    clearTimeout(this.delayedEmailValidationTimer)
    this.delayedEmailValidationTimer = setTimeout(this.validateEmail, EMAIL_VALIDATION_DELAY)
  }

  validateEmail = () => {
    const isEmailValid = EMAIL_REGEX.test(this.state.email) &&
      (this.state.email !== this.props.emailAlreadyInUse)
    this.setState({ emailValid: isEmailValid })
    if (isEmailValid) this.props.handleChange(this.state.email)
  }

  render = () => (
    <section className="email-input">
      <p >Can you give us your email address? We will keep it safe and will never spam you.</p>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailInput}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-envelope" />
          </span>
          <span className="icon is-small is-right">
            {
              this.state.emailValid ?
                <i className="fa fa-check-circle" />
                :
                <i className="fa fa-exclamation-triangle" />
            }
          </span>
        </p>
        {
          this.state.email.length > 0 && this.state.email === this.props.emailAlreadyInUse ?
            <p className="help is-danger">This email is already in use</p>
            :
            null
        }
      </div>
    </section>
  )
}

EmailInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  emailAlreadyInUse: PropTypes.string
}

EmailInput.defaultProps = {
  emailAlreadyInUse: ''
}

export default EmailInput
