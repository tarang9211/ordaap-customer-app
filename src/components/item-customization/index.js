import React from 'react'
import PropTypes from 'prop-types'

import './item-customization.css'

const rand = () => Math.random().toString(36).slice(2)

const ItemCustomization = ({
  type,
  options,
  currency,
  selectedCount,
  requiredCount,
  disabled,
  disableOptions,
  handleChange
}) => (
  <section className="item-customization">
    <div className={`header${disabled ? ' disabled' : ''}`}>
      <h5 className="title is-5">{type}</h5>
      {requiredCount ? (
        <h5 className="title is-5 ">
          {selectedCount}/{requiredCount}
        </h5>
      ) : null}
    </div>
    {Array.isArray(options) &&
      options.map((option, i) => {
        const id = rand()
        return (
          <label key={option.name} className="checkbox" htmlFor={id} disabled={disabled}>
            <input
              id={id}
              type="checkbox"
              checked={option.isSelected || false}
              {...!disabled && {
                onChange: (e) => {
                  handleChange(i, Object.assign({}, option, { isSelected: e.target.checked }))
                }
              }}
              disabled={disabled || (disableOptions && !option.isSelected)}
            />
            <span>{option.name}</span>
            {option.price && <span>{`${currency} ${option.price}`}</span>}
          </label>
        )
      })}
  </section>
)

ItemCustomization.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      isSelected: PropTypes.bool
    })
  ).isRequired,
  currency: PropTypes.string,
  selectedCount: PropTypes.number,
  requiredCount: PropTypes.number,
  disabled: PropTypes.bool,
  disableOptions: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
}

ItemCustomization.defaultProps = {
  currency: '',
  selectedCount: null,
  requiredCount: null,
  disabled: false,
  disableOptions: false
}

export default ItemCustomization
