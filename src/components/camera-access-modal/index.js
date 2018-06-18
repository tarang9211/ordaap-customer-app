import React from 'react'
import PropTypes from 'prop-types'

import './camera-access-modal.css'
import icons from './icons'

// https://stackoverflow.com/a/21742107/1508874
const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone'
  }
  if (/android/i.test(userAgent)) {
    return 'android'
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios'
  }
  return 'unknown'
}

const getBrowserInstructions = () => {
  const os = getMobileOperatingSystem()
  switch (os) {
  // https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DAndroid&hl=en&oco=0
  case 'android':
    return [
      <p key="text" className="has-text-centerd">
        Ordaap could not access your camera. To enable access,
      </p>,
      <ol key="steps" className="steps">
        <strong>Google Chrome</strong> {icons.chrome[os].app}
        <li>
          To the right of the address bar,<br />
          tap {icons.chrome[os].more} and then {icons.chrome[os].info}
        </li>
        <li>Tap <strong>Site settings</strong></li>
        <li>Tap <strong>Access your camera</strong> and then select <strong>Allow</strong></li>
        <li>Refresh this page by scrolling down<br />
        from top or by tapping {icons.chrome[os].more} and then {icons.chrome[os].refresh}</li>
      </ol>
    ]
    // https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DiOS&hl=en&oco=0
  case 'ios':
    return <p className="has-text-centered">Ordaap could not access your camera</p>
  default:
    return <p className="has-text-centered">Ordaap could not access your camera</p>
  }
}

const CameraAccessModal = ({
  isActive,
  shouldNotifyPermission,
  shouldNotifyEnableAccess,
  handleClick
}) => (
  <div className={`camera-access-modal modal${isActive ? ' is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-card">
      <section className="modal-card-body">
        {
          shouldNotifyPermission &&
          <p className="has-text-centered">
            Ordaap needs access to your<br />camera to scan QR code.<br />
            Click on <strong>Allow</strong> in the next pop-up.
          </p>
        }
        {
          shouldNotifyEnableAccess && getBrowserInstructions()
        }
      </section>
      <footer className="modal-card-foot">
        {
          shouldNotifyPermission &&
            <button className="button" onClick={() => handleClick(false)}>Not this time</button>
        }
        {
          shouldNotifyPermission &&
            <button className="button is-primary" onClick={() => handleClick(true)}>Ok, I will</button>
        }
        {
          shouldNotifyEnableAccess &&
            <button className="button is-primary" onClick={handleClick}>Ok</button>
        }

      </footer>
    </div>
  </div>
)

CameraAccessModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  shouldNotifyPermission: PropTypes.bool.isRequired,
  shouldNotifyEnableAccess: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default CameraAccessModal
