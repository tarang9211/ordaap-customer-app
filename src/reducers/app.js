import * as ACTIONS from '../actions/types'

const initialState = {
  loaded: false,
  cameraAccessStatus: '', // see src/components/qr-scanner for different status
  emailLinked: false,
  emailAlreadyInUse: '',
  uid: null,
  isFetchingRestaurant: false,
  isFetchingHotel: false,
  isListeningForBuckets: false,
  isListeningForMenuItems: false,
  bucketsSyncInProgress: false,
  isSendingCart: false,
  isClosingOrder: false,
  isSubmittingFeedback: false,
  restaurantSetAt: null
}

const app = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.SET_APP_LOADED:
    return {
      ...state,
      loaded: true
    }
  case ACTIONS.SET_CAMERA_ACCESS_STATUS:
    return { ...state, cameraAccessStatus: action.status }
  case ACTIONS.SET_UID:
    return {
      ...state,
      uid: action.uid,
      emailLinked: false
    }
  case ACTIONS.EMAIL_LINKED:
    return {
      ...state,
      emailLinked: true,
      emailAlreadyInUse: ''
    }
  case ACTIONS.EMAIL_ALREADY_IN_USE:
    return {
      ...state,
      emailAlreadyInUse: action.email
    }
  case ACTIONS.FETCHING_RESTAURANT:
    return {
      ...state,
      isFetchingRestaurant: action.isFetchingRestaurant
    }
  case ACTIONS.FETCHING_HOTEL:
    return {
      ...state,
      isFetchingHotel: action.isFetching
    }
  case ACTIONS.SET_LISTENING_FOR_BUCKETS:
    return {
      ...state,
      isListeningForBuckets: action.isListeningForBuckets
    }
  case ACTIONS.SET_LISTENING_FOR_MENU_ITEMS: {
    return {
      ...state,
      isListeningForMenuItems: action.isListeningForMenuItems
    }
  }
  case ACTIONS.SET_BUCKETS_SYNC_IN_PROGRESS:
    return {
      ...state,
      bucketsSyncInProgress: action.inProgress
    }
  case ACTIONS.SET_IS_SENDING_CART_ITEMS:
    return {
      ...state,
      isSendingCart: action.isSending
    }
  case ACTIONS.SET_IS_CLOSING_ORDER:
    return {
      ...state,
      isClosingOrder: action.isClosing
    }
  case ACTIONS.SET_IS_SUBMITTING_FEEDBACK:
    return {
      ...state,
      isSubmittingFeedback: action.isSubmitting
    }
  case ACTIONS.SET_RESTAURANT:
    return {
      ...state,
      restaurantSetAt: Date.now()
    }
  case ACTIONS.CLEAR_APP_DATA:
    return {
      ...state,
      restaurantSetAt: null
    }
  default:
    return state
  }
}

export default app
