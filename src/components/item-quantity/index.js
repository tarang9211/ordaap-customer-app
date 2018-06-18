import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './item-quantity.css'

class ItemQuantity extends PureComponent {
  static defaultProps = {
    count: 0,
    maxCount: 10,
    minCount: 0
  }

  increment = () => {
    if (this.props.count >= this.props.maxCount) {
      return
    }
    this.props.handleChange(this.props.count + 1)
  }

  decrement = () => {
    if (this.props.count <= this.props.minCount) {
      return
    }
    this.props.handleChange(this.props.count - 1)
  }

  render = () => (
    <section className="item-quantity">
      <div className="field has-addons">
        <p className="control">
          <button
            className="button is-medium"
            {...!this.props.disabled && { onClick: this.decrement }}
            disabled={this.props.count <= this.props.minCount || this.props.disabled}
          >
            <span className="icon">
              <i className="fa fa-minus" />
            </span>
          </button>
        </p>
        <p className={`control count${this.props.disabled ? ' disabled' : ''}`}>
          <span>
            {Math.max(
              Math.min(this.props.count, this.props.maxCount),
              this.props.minCount
            )}
          </span>
        </p>
        <p className="control">
          <button
            className="button is-medium"
            {...!this.props.disabled && { onClick: this.increment }}
            disabled={this.props.count >= this.props.maxCount || this.props.disabled}
          >
            <span className="icon">
              <i className="fa fa-plus" />
            </span>
          </button>
        </p>
      </div>
    </section>
  )
}

ItemQuantity.propTypes = {
  handleChange: PropTypes.func.isRequired,
  count: PropTypes.number,
  maxCount: PropTypes.number,
  minCount: PropTypes.number,
  disabled: PropTypes.bool.isRequired
}

export default ItemQuantity
