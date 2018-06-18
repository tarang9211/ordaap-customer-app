import { clearAppData, notifyStaleAppReset } from '../actions'
import { stopListeningForBuckets } from '../thunks/order'
import { stopMenuItemsSync } from '../thunks/restaurant'

export const resetApp = () => (dispatch, getState) => {
  const { app: { isListeningForBuckets, isListeningForMenuItems } } = getState()
  if (isListeningForBuckets) { dispatch(stopListeningForBuckets()) }
  if (isListeningForMenuItems) { dispatch(stopMenuItemsSync()) }
  dispatch(clearAppData())
}

export const resetStaleApp = () => (dispatch, getState) => {
  const { app: { restaurantSetAt }, metadata: { rid, oid } } = getState()
  if (restaurantSetAt == null) return
  if ((Date.now() - restaurantSetAt) < process.env.REACT_APP_STALE_APP_TIME) return
  if (rid.length === 0) return
  if (oid.length > 0) return
  dispatch(resetApp())
  dispatch(notifyStaleAppReset())
}

export default resetApp
