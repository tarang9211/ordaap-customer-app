import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import QRScanner from '../../components/qr-scanner'

const ScanQR = ({ action }) => (
  <Page>
    <QRScanner
      hasOngoingOrder={false}
      hasCameraAccess={false}
      handleScan={action('scan')}
      handleError={action('error')}
      grantedCameraAccess={action('granted camera access')}
    />
  </Page>
)

ScanQR.propTypes = {
  action: PropTypes.func.isRequired
}

export default ScanQR
