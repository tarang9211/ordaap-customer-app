import * as ACTIONS from '../actions/types'

const initialState = {
  hid: '',
  name: '',
  message: '',
  restaurants: []
}

const hotel = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.SET_HOTEL:
    return {
      ...action.hotel
    }
  case ACTIONS.CLEAR_APP_DATA:
    return initialState
  default:
    return state
  }
}

export default hotel
