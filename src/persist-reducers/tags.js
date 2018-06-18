import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import tags from '../reducers/tags'

const tagsPersistReducerGenerator = debug => persistReducer({
  key: 'tags',
  version: 1,
  storage,
  debug
}, tags)

export default tagsPersistReducerGenerator
