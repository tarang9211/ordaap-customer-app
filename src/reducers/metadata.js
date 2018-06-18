import * as ACTIONS from '../actions/types'

const initialState = {
  rid: '',
  sid: '',
  oid: '',
  bkid: ''
}

const metadata = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.CLEAR_APP_DATA:
    return initialState
  case ACTIONS.SET_METADATA:
    return {
      ...state,
      rid: action.metadata.rid,
      sid: action.metadata.sid || '',
      bkid: action.metadata.bkid || state.bkid
    }
  case ACTIONS.SET_OID:
    return {
      ...state,
      oid: action.oid
    }
  default:
    return state
  }
}

export default metadata
