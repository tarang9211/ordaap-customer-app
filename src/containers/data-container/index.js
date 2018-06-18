import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class DataContainer extends PureComponent {
  state = { loaded: false }

  componentDidMount = () => {
    this.runInitialize(this.props.initialize)
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.state.loaded) {
      this.runInitialize(nextProps.initialize)
    }
  }

  runInitialize = (initialize) => {
    initialize().then((hasLoaded = true) => {
      if (!hasLoaded) return
      if (this.props.onLoad) { this.props.onLoad() }
      this.setState({
        loaded: true
      })
    })
      .catch(this.props.onError)
  }

  render = () => (this.state.loaded ? this.props.children : this.props.placeholder)
}

DataContainer.propTypes = {
  initialize: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
  onError: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

DataContainer.defaultProps = {
  onLoad: () => { },
  placeholder: null,
  children: null
}

export default DataContainer
