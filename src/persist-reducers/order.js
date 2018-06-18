import { persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import order from '../reducers/order'

const transformBucketsKey = createTransform(
  (state) => {
    const arr = []
    state.forEach((val, key) => { arr.push([key, val]) })
    return JSON.stringify(arr)
  },
  state => new Map(JSON.parse(state)),
  { whitelist: ['buckets'] }
)

const orderPersistReducerGenerator = debug => persistReducer({
  key: 'order',
  version: 1,
  storage,
  debug,
  transforms: [transformBucketsKey]
}, order)

export default orderPersistReducerGenerator
