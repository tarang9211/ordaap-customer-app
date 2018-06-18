import React, { PureComponent } from 'react'

import Logo from './logo'
import './splash.css'

const TIMEOUT = 200

class Splash extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { value: 0 }
  }

  componentDidMount = () => {
    this.timer = setTimeout(this.increaseValue, TIMEOUT)
  }

  componentWillUnmount = () => {
    clearTimeout(this.timer)
  }

  increaseValue = () => {
    const increase = Math.ceil(0.1 * (100 - this.state.value))
    const nextValue = this.state.value + increase
    const value = nextValue > 100 ? 100 : nextValue
    this.setState({ value })
    if (value <= 100) this.timer = setTimeout(this.increaseValue, TIMEOUT)
  }

  render = () => (
    <div className="splash" key="splash">
      <Logo />
      <progress className="progress is-small" value={this.state.value} max="100">unknown</progress>
    </div>
  )
}

export default Splash
