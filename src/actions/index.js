import * as ACTIONS from './types'

export const clearAppData = () => ({
  type: ACTIONS.CLEAR_APP_DATA
})

export const setMetadata = metadata => ({
  type: ACTIONS.SET_METADATA,
  metadata
})

export const setUID = uid => ({
  type: ACTIONS.SET_UID,
  uid
})

export const signInAnonymousFailed = error => ({
  type: ACTIONS.SIGN_IN_ANONYMOUS_FAILED,
  error
})

export const setAppLoaded = () => ({
  type: ACTIONS.SET_APP_LOADED
})

export const notifyStaleAppReset = () => ({
  type: ACTIONS.NOTIFY_STALE_APP_RESET
})

export const setCameraAccessStatus = status => ({
  type: ACTIONS.SET_CAMERA_ACCESS_STATUS,
  status
})

export const cameraAccessError = error => ({
  type: ACTIONS.CAMERA_ACCESS_ERROR,
  error
})

export const fetchingRestaurant = isFetchingRestaurant => ({
  type: ACTIONS.FETCHING_RESTAURANT,
  isFetchingRestaurant
})

export const setRestaurant = restaurant => ({
  type: ACTIONS.SET_RESTAURANT,
  restaurant
})

export const setGlobalTags = tags => ({
  type: ACTIONS.SET_GLOBAL_TAGS,
  tags
})

export const setMenuItemSelection = (iid, selection) => ({
  type: ACTIONS.SET_MENU_ITEM_SELECTION,
  iid,
  selection
})

export const removeMenuItemSelection = iid => ({
  type: ACTIONS.REMOVE_MENU_ITEM_SELECTION,
  iid
})

export const addToCart = (iid, selection) => ({
  type: ACTIONS.ADD_TO_CART,
  iid,
  selection
})

export const addToCartError = error => ({
  type: ACTIONS.ADD_TO_CART_ERROR,
  error
})

export const setCurrentCartItem = (iid, selection) => ({
  type: ACTIONS.SET_CURRENT_CART_ITEM,
  iid,
  selection
})

export const updateCartItem = (index, iid, selection) => ({
  type: ACTIONS.UPDATE_CART_ITEM,
  index,
  iid,
  selection
})

export const removeCartItem = index => ({
  type: ACTIONS.REMOVE_CART_ITEM,
  index
})

export const setIsSendingCartItems = isSending => ({
  type: ACTIONS.SET_IS_SENDING_CART_ITEMS,
  isSending
})

export const setOID = oid => ({
  type: ACTIONS.SET_OID,
  oid
})

export const setListeningForBuckets = isListeningForBuckets => ({
  type: ACTIONS.SET_LISTENING_FOR_BUCKETS,
  isListeningForBuckets
})

export const setListeningForMenuItems = isListeningForMenuItems => ({
  type: ACTIONS.SET_LISTENING_FOR_MENU_ITEMS,
  isListeningForMenuItems
})

export const setBucketsSyncInProgress = inProgress => ({
  type: ACTIONS.SET_BUCKETS_SYNC_IN_PROGRESS,
  inProgress
})

export const addBucket = (bid, bucket) => ({
  type: ACTIONS.ADD_BUCKET,
  bid,
  bucket
})

export const notifyBucket = () => ({
  type: ACTIONS.NOTIFY_BUCKET
})

export const updateBucket = (bid, bucket) => ({
  type: ACTIONS.UPDATE_BUCKET,
  bid,
  bucket
})

export const clearCart = () => ({
  type: ACTIONS.CLEAR_CART
})

export const clearToast = index => ({
  type: ACTIONS.CLEAR_TOAST,
  index
})

export const orderError = error => ({
  type: ACTIONS.ORDER_ERROR,
  error
})

export const setIsClosingOrder = isClosing => ({
  type: ACTIONS.SET_IS_CLOSING_ORDER,
  isClosing
})

export const closeOrder = () => ({
  type: ACTIONS.CLOSE_ORDER
})

export const orderClosedByTenant = () => ({
  type: ACTIONS.ORDER_CLOSED_BY_TENANT
})

export const emailLinked = email => ({
  type: ACTIONS.EMAIL_LINKED,
  email
})

export const emailAlreadyInUse = email => ({
  type: ACTIONS.EMAIL_ALREADY_IN_USE,
  email
})

export const emailLinkingFailed = (error, email, userId) => ({
  type: ACTIONS.EMAIL_LINKING_FAILED,
  error,
  email,
  userId
})

export const isSubmittingFeedback = isSubmitting => ({
  type: ACTIONS.SET_IS_SUBMITTING_FEEDBACK,
  isSubmitting
})

export const feedbackSubmitted = () => ({
  type: ACTIONS.FEEDBACK_SUBMITTED
})

export const genericError = error => ({
  type: ACTIONS.GENERIC_ERROR,
  error
})

export const setMenuItem = (iid, item) => ({
  type: ACTIONS.SET_MENU_ITEM,
  iid,
  item
})

export const fetchingHotel = isFetching => ({
  type: ACTIONS.FETCHING_HOTEL,
  isFetching
})

export const setHotel = hotel => ({
  type: ACTIONS.SET_HOTEL,
  hotel
})
