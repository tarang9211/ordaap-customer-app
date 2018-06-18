import { PureComponent } from 'react'

class ScrollToTop extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() { return null }
}

export default ScrollToTop
