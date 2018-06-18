import { combineReducers, createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import persistReducersGenerator from './persist-reducers'
import { sentryReporter, gaReporter, staleAppTimer } from './utils/redux-middlewares'

import { setAppLoaded } from './actions'
import { initializeFirebaseWithStore } from './utils/firebase'

import { setTags } from './thunks/tags'
import { getRestaurant, startMenuItemsSync } from './thunks/restaurant'
import { startListeningForBuckets } from './thunks/order'
import { resetStaleApp } from './thunks/app'

const debug = process.env.NODE_ENV !== 'production' || process.env.REACT_APP_ENV === 'development'
let middlewares = []

if (process.env.NODE_ENV === 'production') {
  middlewares = [sentryReporter, gaReporter, staleAppTimer, thunk]
} else {
  middlewares = [thunk, staleAppTimer]
}

if (debug) {
  middlewares.push(logger)
}

const persistReducers = persistReducersGenerator(debug)
const rootReducer = combineReducers(persistReducers)

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middlewares),
)

persistStore(store, undefined, () => {
  const initalBoot = initializeFirebaseWithStore(store).then(() => {
    // If a restaurant had been set and the app is closed and reopened later,
    // we consider it to have become stale if there is no ongoing order.
    store.dispatch(resetStaleApp())
    // Getting the restaurant and tags can continue even after we
    // continue into the app, there will be a loading animation.
    store.dispatch(getRestaurant()).then(() => {
      store.dispatch(startMenuItemsSync())
    })
    store.dispatch(setTags())
    // We ensure that the buckets are in sync before loading the app. This
    // also ensures that we catch closed orders when the app loads itself.
    return store.dispatch(startListeningForBuckets())
  })
  initalBoot.then(() => {
    store.dispatch(setAppLoaded())
  })
})

export default store
