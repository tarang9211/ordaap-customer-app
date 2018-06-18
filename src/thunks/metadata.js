import { setMetadata } from '../actions'
import { getRestaurant } from '../thunks/restaurant'
import { resetApp } from '../thunks/app'

const setAllMetadata = (rid, sid, bkid) => (dispatch, getState) => {
  const { metadata } = getState()
  // There is an ongoing order, do not reset or change the rid/sid
  if (typeof metadata.oid === 'string' && metadata.oid.length > 0) {
    // TODO notify user
    return
  }

  if (metadata.rid === rid) {
    // customer is changing stations or is assigning a new/different station
    // simply set the sid
    if (metadata.sid !== sid) {
      dispatch(setMetadata({ rid, sid, bkid }))
    } else {
      // it is the same restaurant and station, do nothing
    }
    return
  }
  dispatch(resetApp())
  dispatch(setMetadata({ rid, sid, bkid }))
  dispatch(getRestaurant())
}

export default setAllMetadata
