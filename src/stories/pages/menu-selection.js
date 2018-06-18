import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Navbar from '../../components/navbar'
import ItemDescription from '../../components/item-description'
import ItemQuantity from '../../components/item-quantity'
import ItemCustomization from '../../components/item-customization'
import ChefInstruction from '../../components/chef-instruction'
import { ButtonGroup, ConfirmButton, DeleteButton } from '../../components/button-group'

class MenuSelection extends PureComponent {
  constructor() {
    super()
    this.unitPrice = 5.25
    this.state = {
      count: 1,
      options: [
        { name: 'Sweet Sauce' },
        { name: 'Spicy Sauce', isSelected: true },
        { name: 'Extra Dahi', price: 1.25 },
        { name: 'Extra Boondhi', price: 1, isSelected: true },
        { name: 'Some ridiculously long name that messes with the price beside it', price: 10, isSelected: false }
      ],
      requiredCount: 2
    }
  }

  getTotalPrice = () => {
    let totalPrice = this.state.count * this.unitPrice
    this.state.options.forEach((option) => {
      if (!option.isSelected) return
      if (option.price == null) return
      totalPrice += option.price
    })
    return totalPrice.toFixed(2)
  }

  getSelectedCount = () => this.state.options.reduce((prev, option) =>
    (option.isSelected ? prev + 1 : prev), 0)

  handleItemCustomizationChange = (i, option) => {
    this.setState({
      options: [].concat(this.state.options.slice(0, i), option, this.state.options.slice(i + 1))
    })
  }

  handleItemQuantityChange = (count) => {
    this.setState({ count })
  }

  render = () => (
    <Page>
      <Navbar
        fixed
        title="Guru Lakshmi"
        handleBack={() => this.props.action('Back pressed')}
      />
      <ItemDescription
        name="Dahi (Yoghurt) Vada (2)"
        desc="Lentil doughnuts soaked in seasoned yoghurt, topped with fresh coriander and boondhi *(sweet and spicy tamarind sauce optional)"
        extra="All prices are exclusive of applicable taxes and a 5% service charge"
      />
      <ItemQuantity
        count={this.state.count}
        maxCount={5}
        minCount={1}
        handleChange={this.handleItemQuantityChange}
      />
      <ItemCustomization
        type="Extra"
        options={this.state.options}
        selectedCount={this.getSelectedCount()}
        requiredCount={this.state.requiredCount}
        disabled={this.getSelectedCount() >= this.state.requiredCount}
        handleChange={this.handleItemCustomizationChange}
      />
      <ChefInstruction
        placeholder="Some flirty note to spice up things"
        handleChange={this.props.action}
        instruction="Some flirty note to spice up things"
      />
      <ButtonGroup>
        <ConfirmButton
          text="Add to Order"
          aside={`${this.getTotalPrice()}`}
          handleClick={() => this.props.action('Added to cart')}
        />
        <DeleteButton
          text="Delete"
          handleClick={() => this.props.action('Deleted')}
        />
      </ButtonGroup>
    </Page>
  )
}

MenuSelection.propTypes = {
  action: PropTypes.func.isRequired
}

export default MenuSelection
