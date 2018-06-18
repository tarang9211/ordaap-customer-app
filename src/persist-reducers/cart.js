import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import cart from '../reducers/cart'

const cartPersistReducerGenerator = debug => persistReducer({
  key: 'cart',
  version: 1,
  storage,
  debug
}, cart)

export default cartPersistReducerGenerator
