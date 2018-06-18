import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ItemQuantity from '../item-quantity'
import ItemCustomization from '../item-customization'
import ChefInstruction from '../chef-instruction'

class ItemSelection extends PureComponent {
  updateQuantity = (quantity) => {
    const total = this.props.price * quantity
    this.props.updateSelection({ quantity, total })
  }

  updateInstruction = (instruction) => {
    this.props.updateSelection({ instruction })
  }

  // It is important to not mutate the original mods object
  updateMods = (modIndex, optionIndex, option) => {
    const mods = Array.from(this.props.mods)
    mods[modIndex] = { ...mods[modIndex] }
    mods[modIndex].options = Array.from(mods[modIndex].options)
    mods[modIndex].options[optionIndex] = option
    mods[modIndex].count = (mods[modIndex].count || 0) + (option.isSelected ? 1 : -1)
    const total = this.props.quantity * (this.props.price +
      mods.reduce((modsPrice, mod) =>
        mod.options.reduce((price, modOption) =>
          (modOption.isSelected && modOption.price ? price + modOption.price : price)
          , modsPrice)
        , 0))
    this.props.updateSelection({ mods, total })
  }

  render = () => [
    <ItemQuantity
      key="item-quantity"
      disabled={!this.props.available}
      count={this.props.quantity}
      maxCount={this.props.quantityRestriction.max}
      minCount={this.props.quantityRestriction.min}
      handleChange={this.updateQuantity}
    />,
    this.props.mods &&
    this.props.mods.map(({ name, min, max, count = 0, options }, modIndex) => (
      <ItemCustomization
        key={name}
        type={name}
        options={options}
        currency={this.props.currency}
        selectedCount={count}
        requiredCount={count < min ? min : (max || min)}
        disableOptions={count >= max}
        disabled={!this.props.available}
        handleChange={
          (optionIndex, option) => this.updateMods(modIndex, optionIndex, option)
        }
      />
    )),
    <ChefInstruction
      disabled={!this.props.available}
      key="chef-instruction"
      placeholder="Any specific instructions?"
      instruction={this.props.instruction}
      handleChange={this.updateInstruction}
    />
  ]
}

ItemSelection.propTypes = {
  price: PropTypes.number,
  currency: PropTypes.string,
  available: PropTypes.bool.isRequired,
  quantity: PropTypes.number,
  mods: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number
    })).isRequired
  })),
  instruction: PropTypes.string,
  quantityRestriction: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  updateSelection: PropTypes.func.isRequired
}

ItemSelection.defaultProps = {
  price: 0,
  currency: '',
  quantity: 1,
  mods: [],
  instruction: '',
  total: 0,
  quantityRestriction: {
    min: 1,
    max: 10
  }
}

export default ItemSelection
