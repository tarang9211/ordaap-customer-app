import * as ERRORS from '../errors/types'
import { GetRestaurant, ListenForMenuItemChanges, StopListeningForMenuItemChanges } from '../utils/api'
import { fetchingRestaurant, setRestaurant, setListeningForMenuItems, setMenuItem } from '../actions'
import { resetApp } from '../thunks/app'

export const getRestaurant = () => (dispatch, getState) => {
  const { metadata: { rid } } = getState()
  if (!rid) {
    return Promise.reject(ERRORS.RESTAURANT_ID_NOT_SET)
      .catch(() => {
        // TODO
      })
  }
  dispatch(fetchingRestaurant(true))
  return GetRestaurant(rid)
    .then((restaurant) => {
      dispatch(setRestaurant(restaurant))
    })
    .catch((error) => {
      if (error === 'RESTAURANT_NOT_FOUND') {
        dispatch(resetApp())
      }
      // TODO other error cases
    })
    .then(() => { dispatch(fetchingRestaurant(false)) })
}

export const startMenuItemsSync = () => (dispatch, getState) => {
  const rid = getState().metadata.rid
  if (!rid) return
  ListenForMenuItemChanges(rid, (iid, item) => {
    dispatch(setMenuItem(iid, item))
  })
  dispatch(setListeningForMenuItems(true))
}

export const stopMenuItemsSync = () => (dispatch, getState) => {
  if (!getState().app.isListeningForMenuItems) return
  StopListeningForMenuItemChanges()
  dispatch(setListeningForMenuItems(false))
}

export default getRestaurant
