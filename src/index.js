import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import ReactGA from 'react-ga'
import Raven from 'raven-js'

import createCustomHistory from './utils/custom-history'
import { unregister } from './registerServiceWorker'
import './style/app.css'
import store from './store'

import { RoutesContainer } from './containers'

const history = createCustomHistory()

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
    titleCase: true,
    gaOptions: {
      userId: store.getState().app.userId
    }
  })
  history.listen((location) => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  })

  Raven.config(process.env.REACT_APP_SENTRY_DSN,
    process.env.REACT_APP_APP_VERSION && { release: process.env.REACT_APP_APP_VERSION }).install()
}

const App = () => (
  <Provider store={store}>
    <RoutesContainer history={history} />
  </Provider>
)

// Splash delay
const delay = t => new Promise((resolve) => {
  setTimeout(resolve, t)
})
const splashDelay = delay(3000)

splashDelay.then(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})

// For iOS 10 and above, pinch to zoom is disabled below
document.addEventListener('gesturestart', e => e.preventDefault())

unregister()

export default App
