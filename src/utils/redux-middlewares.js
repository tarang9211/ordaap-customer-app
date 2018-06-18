import ReactGA from 'react-ga'
import Raven from 'raven-js'
import * as ACTIONS from '../actions/types'
import { resetStaleApp } from '../thunks/app'

export const sentryReporter = store => next => (action) => {
  Raven.captureBreadcrumb({
    category: 'redux',
    level: 'info',
    message: action.type
  })
  switch (action.type) {
  case ACTIONS.SET_UID:
    Raven.setUserContext({ id: action.uid })
    break
  case ACTIONS.EMAIL_LINKED:
    Raven.setUserContext({ email: action.email })
    break
  // Record any handled error
  case ACTIONS.ORDER_ERROR:
  case ACTIONS.EMAIL_LINKING_FAILED:
  case ACTIONS.SIGN_IN_ANONYMOUS_FAILED:
  case ACTIONS.CAMERA_ACCESS_ERROR:
    Raven.captureException(action.error, {
      extra: {
        action,
        state: store.getState()
      }
    })
    break
  default:
  }
  // Capture any unhandled error
  try {
    return next(action)
  } catch (error) {
    Raven.captureException(error, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw error // Re-throwing this error as the app is in an indeterminate state
  }
}

export const gaReporter = () => next => (action) => {
  let args
  switch (action.type) {
  case ACTIONS.SET_OID:
    args = { category: 'Order', action: 'Create Order' }
    break
  case ACTIONS.CLOSE_ORDER:
    args = { category: 'Order', action: 'Close Order' }
    break
  default:
    return next(action)
  }

  ReactGA.event(args)
  return next(action)
}

// Reset the app if there had been no meaningful interaction
// with the menu
export const staleAppTimer = store => next => (action) => {
  if (action.type === ACTIONS.SET_RESTAURANT) {
    setTimeout(() => {
      store.dispatch(resetStaleApp())
    }, process.env.REACT_APP_STALE_APP_TIME)
  }
  return next(action)
}

export default { sentryReporter, gaReporter, staleAppTimer }
