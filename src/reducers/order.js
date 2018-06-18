import * as ACTIONS from '../actions/types'

const initialState = {
  buckets: new Map(),
  closed: false
}

const order = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.ADD_BUCKET:
  case ACTIONS.UPDATE_BUCKET: {
    const buckets = new Map(state.buckets)
    buckets.set(action.bid, action.bucket)
    return { ...state, buckets }
  }
  case ACTIONS.CLOSE_ORDER:
  case ACTIONS.ORDER_CLOSED_BY_TENANT:
    return {
      ...state,
      closed: true
    }
  case ACTIONS.CLEAR_APP_DATA:
    return initialState
  default:
    return state
  }
}

export default order
