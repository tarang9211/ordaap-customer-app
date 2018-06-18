import { GetHotel } from '../utils/api'
import { fetchingHotel, setHotel } from '../actions'

export const getHotel = hid => (dispatch) => {
  dispatch(fetchingHotel(true))
  let hasError = false
  return GetHotel(hid)
    .then((hotel) => {
      dispatch(setHotel(hotel))
    })
    .catch(() => {
      // TODO handle error, report sentry?
      hasError = true
    })
    .then(() => {
      dispatch(fetchingHotel(false))
      return hasError ? Promise.reject() : Promise.resolve()
    })
}

export default getHotel
