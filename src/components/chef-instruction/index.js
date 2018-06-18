import React from 'react'
import PropTypes from 'prop-types'

import './chef-instruction.css'

const ChefInstruction = ({ handleChange, placeholder, instruction, disabled }) => (
  <section className="chef-instruction">
    <div className={`header ${disabled ? ' disabled' : ''}`}>
      <h5 className="title is-5">{'Instructions to Chef'}</h5>
    </div>
    <div className="field">
      <div className="control">
        <input
          className="input"
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          {...!disabled && { onBlur: event => handleChange(event.target.value) }}
          defaultValue={instruction}
        />
      </div>
    </div>
  </section>
)

ChefInstruction.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  instruction: PropTypes.string,
  disabled: PropTypes.bool.isRequired
}

ChefInstruction.defaultProps = {
  placeholder: 'Instructions to Chef',
  instruction: ''
}

export default ChefInstruction
