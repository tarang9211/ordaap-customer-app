import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import app from '../reducers/app'

const appPersistReducerGenerator = debug => persistReducer({
  key: 'app',
  version: 1,
  blacklist: [
    'loaded',
    'isFetchingRestaurant',
    'isFetchingHotel',
    'isListeningForBuckets',
    'bucketsSyncInProgress',
    'isSendingCart',
    'isClosingOrder',
    'isSubmittingFeedback',
    'isListeningForMenuItems'
  ],
  storage,
  debug
}, app)

export default appPersistReducerGenerator
