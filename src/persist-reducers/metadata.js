import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import metadata from '../reducers/metadata'

const metadataPersistReducerGenerator = debug => persistReducer({
  key: 'metadata',
  version: 1,
  storage,
  debug
}, metadata)

export default metadataPersistReducerGenerator
