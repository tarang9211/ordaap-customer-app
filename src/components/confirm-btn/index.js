import React from 'react'
import PropTypes from 'prop-types'

import './confirm-btn.css'

const ConfirmBtn = ({ text, aside, disabled, handleClick }) => (
  <section className="confirm-button">
    <button
      className="button is-success is-fullwidth is-medium"
      disabled={disabled}
      {...!disabled && handleClick && { onClick: handleClick }}
    >
      <span>{text}</span>
      {aside ? <span>{aside}</span> : null}
    </button>
  </section>
)

ConfirmBtn.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  aside: PropTypes.string,
  disabled: PropTypes.bool
}

ConfirmBtn.defaultProps = {
  aside: null,
  disabled: false,
  handleClick: null
}

export default ConfirmBtn
