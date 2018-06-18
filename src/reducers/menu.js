import * as ACTIONS from '../actions/types'

const initialState = {
  selections: new Map()
}

const menu = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.SET_MENU_ITEM_SELECTION: {
    const selections = new Map(state.selections)
    selections.set(action.iid, action.selection)
    return { selections }
  }
  case ACTIONS.REMOVE_MENU_ITEM_SELECTION: {
    const selections = new Map(state.selections)
    selections.delete(action.iid)
    return { selections }
  }
  case ACTIONS.CLEAR_APP_DATA:
    return initialState
  default:
    return state
  }
}

export default menu
