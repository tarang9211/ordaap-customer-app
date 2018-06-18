import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CameraAccessModal from '../../components/camera-access-modal'
import QRScanner from '../../components/qr-scanner'

import { setCameraAccessStatus, cameraAccessError } from '../../actions'
import setAllMetadata from '../../thunks/metadata'

// Metadata url format: http(s)://<domain>/path?/metadata/:rid/:sid?
const metadataUrlRegex = /metadata\/([A-Za-z0-9_-]*)\/?([A-Za-z0-9_-]*)\/*$/

class ReadQR extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cameraAccessModalActive: false,
      shouldNotifyPermission: false,
      shouldNotifyEnableAccess: false
    }
  }

  notifyPermission = () => {
    this.setState({ cameraAccessModalActive: true, shouldNotifyPermission: true })
    return new Promise((resolve) => {
      this.promiseResolve = resolve
    }).catch(() => {
      // noop
    })
  }

  notifyEnableAccess = () => {
    this.setState({ cameraAccessModalActive: true, shouldNotifyEnableAccess: true })
  }

  handleModalButtonClick = (bool) => {
    this.setState({
      cameraAccessModalActive: false,
      shouldNotifyPermission: false,
      shouldNotifyEnableAccess: false
    })
    if (this.promiseResolve) {
      this.promiseResolve(bool)
    }
  }

  render = () => [
    <QRScanner
      key="qr-scanner"
      delay={500}
      notifyPermission={this.notifyPermission}
      notifyEnableAccess={this.notifyEnableAccess}
      {...this.props}
    />,
    <CameraAccessModal
      key="camera-access-modal"
      isActive={this.state.cameraAccessModalActive}
      shouldNotifyPermission={this.state.shouldNotifyPermission}
      shouldNotifyEnableAccess={this.state.shouldNotifyEnableAccess}
      handleClick={this.handleModalButtonClick}
    />
  ]
}

ReadQR.propTypes = {
  cameraAccessStatus: PropTypes.string.isRequired,
  setCameraAccessStatus: PropTypes.func.isRequired,
  handleScan: PropTypes.func.isRequired,
  handleCameraAccessError: PropTypes.func.isRequired,
  continueOrder: PropTypes.func,
  handleModalDismiss: PropTypes.func
}

ReadQR.defaultProps = {
  continueOrder: null,
  handleModalDismiss: null
}

const mapStateToProps = ({
  app: { cameraAccessStatus },
  metadata: { rid },
  restaurant: { name },
  order: { buckets }
}, { isModal }) => ({
  cameraAccessStatus,
  hasRIDSet: rid.length > 0,
  restaurantName: name,
  lastOrderTime: buckets.size > 0 ? [...buckets.values()][buckets.size - 1].createdAt : -1,
  isModal
})

const mapDispatchToProps = (dispatch, { history, isModal }) => ({
  setCameraAccessStatus: (status) => { dispatch(setCameraAccessStatus(status)) },

  handleScan: (url) => {
    if (typeof url !== 'string') { return }
    const match = url.match(metadataUrlRegex)
    if (match == null) { return }
    const [, rid, sid] = match
    dispatch(setAllMetadata(rid, sid))
    if (!isModal) history.to('/restaurant')
  },

  handleCameraAccessError: (error) => { dispatch(cameraAccessError(error)) },

  continueOrder: () => { history.to('/restaurant') }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadQR)
