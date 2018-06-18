import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import setAllMetadata from '../../thunks/metadata'
import ScrollToTop from '../../components/scroll-to-top'

class Metadata extends Component {
  componentWillMount = () => {
    this.props.initialize()
  }

  componentDidMount = () => {
    if (this.props.metadata &&
      typeof this.props.metadata.rid === 'string' &&
      this.props.metadata.rid.length > 0) this.props.replaceRoute()
  }

  componentDidUpdate = () => {
    if (this.props.metadata &&
      typeof this.props.metadata.rid === 'string' &&
      this.props.metadata.rid.length > 0) this.props.replaceRoute()
  }

  // this little scroll to top hack helps to load the
  // restaurant with the banner at the top
  render = () => (<ScrollToTop key="scroll-to-top" />)
}

Metadata.propTypes = {
  initialize: PropTypes.func.isRequired,
  metadata: PropTypes.shape({
    rid: PropTypes.string
  }).isRequired,
  replaceRoute: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  metadata: state.metadata
})

const mapDispatchToProps = (dispatch,
  { match: { params: { rid, sid } }, location: { search }, history }) => ({
  initialize: () => {
    const bkidRegexp = /bkid=([\d\w_-]*)/
    const [, bkid] = bkidRegexp.exec(search) || []
    dispatch(setAllMetadata(rid, sid, bkid))
  },

  replaceRoute: () => {
    history.replace('/restaurant')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Metadata)
