import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import restaurant from '../reducers/restaurant'

const restaurantPersistReducerGenerator = debug => persistReducer({
  key: 'restaurant',
  version: 1,
  storage,
  debug
}, restaurant)

export default restaurantPersistReducerGenerator
