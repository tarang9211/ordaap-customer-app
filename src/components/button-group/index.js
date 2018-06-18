import React from 'react'
import PropTypes from 'prop-types'

import './button-group.css'

export const ButtonGroup = ({ children, fixed }) => ([
  fixed ? <section key="spacer" className="button-group-spacer">&nbsp;</section> : null,
  <section key="buttons-container" className={`button-group${fixed ? ' is-fixed' : ''}`}>
    {children}
  </section>
])

export const ConfirmButton = ({ text, aside, disabled, loading, handleClick }) => (
  <button
    className={`button is-success is-medium${loading ? ' is-loading' : ''}`}
    disabled={disabled}
    {...!disabled && !loading && handleClick && { onClick: handleClick }}
    href=""
  >
    <span>{text}</span>
    {aside ? <span>{aside}</span> : null}
  </button>
)

export const DeleteButton = ({ text, disabled, handleClick }) => (
  <button
    className="button is-danger is-medium"
    disabled={disabled}
    onClick={disabled ? null : handleClick}
  >
    <span>{text}</span>
  </button>
)

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

ButtonGroup.defaultProps = { children: null, fixed: false }

ConfirmButton.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  aside: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
}

ConfirmButton.defaultProps = { aside: null, disabled: false, loading: false, handleClick: null }

DeleteButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

DeleteButton.defaultProps = { disabled: false }

export default ButtonGroup
