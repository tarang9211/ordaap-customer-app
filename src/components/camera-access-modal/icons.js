import React from 'react'
import icChromeApp from './ic-chrome-app.png'
import icChromeAndroidMore from './ic-chrome-android-more.png'
import icChromeAndroidInfo from './ic-chrome-android-info.png'
import icChromeAndroidRefresh from './ic-chrome-android-refresh.png'

const icons = {
  chrome: {
    android: {
      app: <img className="icon is-small" src={icChromeApp} alt="Chrome" />,
      more: <img className="icon is-small" src={icChromeAndroidMore} alt="More" />,
      info: <img className="icon is-small" src={icChromeAndroidInfo} alt="Information" />,
      refresh: <img className="icon is-small" src={icChromeAndroidRefresh} alt="Refresh" />
    }
  }
}

export default icons
