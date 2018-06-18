import {
  CreateOrder,
  ListenForBuckets,
  StopListeningForBuckets,
  AddToOrder,
  CloseOrder } from '../utils/api'

import {
  setOID,
  setListeningForBuckets,
  setBucketsSyncInProgress,
  addBucket,
  updateBucket,
  clearCart,
  orderError,
  closeOrder,
  orderClosedByTenant,
  notifyBucket,
  setIsSendingCartItems,
  setIsClosingOrder } from '../actions'

let syncCompletePromise = null

// This function ensures that multiple calls to it does not call the underlying
// API unless the app is listening for buckets. This is useful when the order is closed
// and the app had already stopped listening for buckets and a resetApp() is needed
// after submitting the feedback (Billing container)
export const stopListeningForBuckets = () => (dispatch, getState) => {
  const { app: { isListeningForBuckets } } = getState()
  if (!isListeningForBuckets) return
  StopListeningForBuckets()
  dispatch(setListeningForBuckets(false))
  syncCompletePromise = null
}

// This returns a promise that resolves once the initial sync is complete
// This is useful for the calling function to know when the initial
// sync completes
// If there is no oid, then simply resolve, this is the case during inital load
// This functions keeps reference to this same promise so that it can return the same to
// to all its calling functions. This ensures that it sets up the appropriate listeners
// only once how many ever times it is called
export const startListeningForBuckets = () => (dispatch, getState) => {
  const { metadata: { oid }, app: { isListeningForBuckets } } = getState()
  if (!oid) return Promise.resolve()
  if (isListeningForBuckets) return syncCompletePromise
  syncCompletePromise = new Promise((resolve) => {
    dispatch(setBucketsSyncInProgress(true))
    ListenForBuckets(oid, (bid, bucket) => {
      // handleBucketAdded
      dispatch(addBucket(bid, bucket))
      const { app } = getState()
      if (!app.bucketsSyncInProgress) {
        dispatch(notifyBucket())
      }
    }, (bid, bucket) => {
      // handleBucketUpdated
      dispatch(updateBucket(bid, bucket))
    }, () => {
      // handleOrderClosedByTenant
      dispatch(orderClosedByTenant())
      dispatch(stopListeningForBuckets())
    }, () => {
      // handleOrderClosedByCustomer
      dispatch(closeOrder())
      dispatch(stopListeningForBuckets())
    }, () => {
      // handleInitialSyncComplete
      dispatch(setBucketsSyncInProgress(false))
      resolve()
    })
    dispatch(setListeningForBuckets(true))
  })
  return syncCompletePromise
}

export const placeOrder = () => (dispatch, getState) => {
  const {
    metadata: { rid, sid, bkid, ...metadata },
    app: { uid },
    cart: { items },
    restaurant: { menu }
  } = getState()
  dispatch(setIsSendingCartItems(true))

  const promise = metadata.oid.length > 0 ?
    Promise.resolve(metadata.oid) : CreateOrder(rid, sid, uid, bkid).then(({ oid }) => {
      dispatch(setOID(oid))
      return dispatch(startListeningForBuckets()).then(() => oid)
    })

  const mappedItems = items.map(({ iid, selection: { mods, ...selection } }) => ({
    iid,
    name: menu[iid].name,
    ...selection
  }))

  return promise.then(oid => AddToOrder(oid, mappedItems, uid))
    .then(() => {
      dispatch(clearCart())
    })
    .catch((error) => {
      dispatch(orderError(error))
    })
    .then(() => {
      dispatch(setIsSendingCartItems(false))
    })
}

export const checkout = () => (dispatch, getState) => {
  const { metadata: { rid, oid } } = getState()
  dispatch(setIsClosingOrder(true))
  const shouldCheckout = window.confirm('Are you sure you do not want to order anything more?') //eslint-disable-line
  if (shouldCheckout) {
    CloseOrder(rid, oid)
      .then(() => {
        dispatch(setIsClosingOrder(false))
      })
  }
  return shouldCheckout
}
