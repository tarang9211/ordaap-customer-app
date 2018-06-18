import * as ACTIONS from '../actions/types'

const initialState = {
  name: '',
  address: '',
  city: '',
  pincode: '',
  country: '',
  cuisines: '',
  currency: '',
  timings: '',
  images: [],
  menu: {},
  tags: {}
}

const restaurant = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.SET_RESTAURANT:
    return {
      ...action.restaurant
    }
  case ACTIONS.CLEAR_APP_DATA:
    return initialState
  case ACTIONS.SET_MENU_ITEM:
    return {
      ...state,
      menu: {
        ...state.menu,
        [action.iid]: action.item
      }
    }
  default:
    return state
  }
}

export default restaurant
