import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import toast from '../reducers/toast'

const toastPersistReducerGenerator = debug => persistReducer({
  key: 'toast',
  version: 1,
  storage,
  debug
}, toast)

export default toastPersistReducerGenerator
