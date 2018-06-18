import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './toast.css'

export const DURATION_SHORT = 1500
export const DURATION_LONG = 3000

export class Toast extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { shown: props.toast != null }
    this.dismissToastAfterTimeout()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.toast !== this.props.toast && nextProps.toast != null) {
      this.setState({ shown: true })
    }
  }

  componentDidUpdate = () => {
    this.dismissToastAfterTimeout()
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  dismissToastAfterTimeout = () => {
    if (this.state.shown) {
      this.timeout = setTimeout(() => {
        this.setState({ shown: false })
        if (this.props.handleDismiss) {
          this.timeout = setTimeout(this.props.handleDismiss, 1500)
        }
      }, this.props.toast.duration || DURATION_LONG)
    }
  }

  render = () => {
    const { error = false, message = '' } = this.props.toast != null ? this.props.toast : {}
    return (
      <section className={`toast ${this.state.shown ? 'is-shown' : ''}`}>
        <div
          className={`notification container ${error ? 'is-danger' : 'is-success'}`}
        >
          {
            error &&
            <span className="icon">
              <i className="fa fa-exclamation-circle" />
            </span>
          }
          <span>{message}</span>
        </div>
      </section>
    )
  }
}

Toast.propTypes = {
  toast: PropTypes.shape({
    message: PropTypes.string.isRequired,
    duration: PropTypes.oneOf([DURATION_SHORT, DURATION_LONG]),
    error: PropTypes.bool
  }),
  handleDismiss: PropTypes.func
}

Toast.defaultProps = {
  toast: null,
  handleDismiss: null
}
