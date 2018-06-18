import * as ACTIONS from '../actions/types'

const initialState = {
  current: { iid: '', selection: null },
  items: [],
  sendingItemsCount: 0
}

const cart = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.ADD_TO_CART:
    return {
      ...state,
      items: state.items.concat({ iid: action.iid, selection: action.selection })
    }
  case ACTIONS.SET_CURRENT_CART_ITEM:
    return { ...state, current: { iid: action.iid, selection: action.selection } }
  case ACTIONS.UPDATE_CART_ITEM: {
    const items = Array.from(state.items)
    items[action.index] = { iid: action.iid, selection: action.selection }
    return { ...state, items }
  }
  case ACTIONS.REMOVE_CART_ITEM: {
    const items = Array.from(state.items)
    items.splice(action.index, 1)
    return { ...state, items }
  }
  case ACTIONS.SET_IS_SENDING_CART_ITEMS: {
    const sendingItemsCount = action.isSending ? state.items.length : 0
    return { ...state, sendingItemsCount }
  }
  case ACTIONS.CLEAR_CART: {
    const items = Array.from(state.items)
    items.splice(0, state.sendingItemsCount)
    return { ...state, items, sendingItemsCount: 0 }
  }
  case ACTIONS.CLEAR_APP_DATA:
    return initialState
  default:
    return state
  }
}

export default cart
