import update from 'immutability-helper'

import * as ACTIONS from '../actions/types'
import ToastErrors from '../errors/toast'
import { DURATION_SHORT } from '../components/toast'

const initialState = {
  toasts: []
}

const toast = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.CLEAR_TOAST:
    return update(state, {
      toasts: { $splice: [[0, 1]] }
    })
  case ACTIONS.NOTIFY_BUCKET:
    return update(state, {
      toasts: {
        $push: [{
          message: 'Order passed to the kitchen',
          duration: DURATION_SHORT
        }]
      }
    })
  case ACTIONS.ADD_TO_CART:
    return update(state, {
      toasts: {
        $push: [{
          message: 'Item added to order',
          duration: DURATION_SHORT
        }]
      }
    })

  case ACTIONS.ADD_TO_CART_ERROR:
    return update(state, {
      toasts: {
        $push: [{
          message: action.error,
          error: true
        }]
      }
    })

  case ACTIONS.REMOVE_CART_ITEM:
    return update(state, {
      toasts: {
        $push: [{
          message: 'Item removed from order',
          duration: DURATION_SHORT
        }]
      }
    })
  case ACTIONS.UPDATE_CART_ITEM:
    return update(state, {
      toasts: {
        $push: [{
          message: 'Item updated',
          duration: DURATION_SHORT
        }]
      }
    })
  case ACTIONS.ORDER_CLOSED_BY_TENANT:
    return update(state, {
      toasts: {
        $push: [{
          message: 'The restaurant has closed your order'
        }]
      }
    })
  case ACTIONS.ORDER_ERROR:
    return update(state, {
      toasts: {
        $push: [{
          message: 'There was an error contacting the kitchen',
          error: true
        }]
      }
    })
  case ACTIONS.FEEDBACK_SUBMITTED:
    return update(state, {
      toasts: {
        $push: [{
          message: 'Thank you for that feedback!'
        }]
      }
    })
  case ACTIONS.GENERIC_ERROR: {
    const error = ToastErrors[action.error]
    if (error) {
      return update(state, {
        toasts: {
          $push: [{
            message: error,
            error: true
          }]
        }
      })
    }
    return state
  }
  case ACTIONS.NOTIFY_STALE_APP_RESET: {
    return update(state, {
      toasts: {
        $push: [{
          message: 'Please scan a QR code again'
        }]
      }
    })
  }
  default:
    return state
  }
}

export default toast
