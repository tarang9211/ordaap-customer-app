import * as ACTIONS from '../actions/types'

const initialState = {
  global: {}
}

const tags = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.SET_GLOBAL_TAGS:
    return {
      ...state,
      global: action.tags
    }
  default:
    return state
  }
}

export default tags
