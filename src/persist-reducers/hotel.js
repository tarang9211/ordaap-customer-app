import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import hotel from '../reducers/hotel'

const hotelPersistReducerGenerator = debug => persistReducer({
  key: 'hotel',
  version: 1,
  storage,
  debug
}, hotel)

export default hotelPersistReducerGenerator
