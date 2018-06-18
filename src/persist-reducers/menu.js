import { persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import menu from '../reducers/menu'

const transformSelectionsKey = createTransform(
  (state) => {
    const arr = []
    state.forEach((val, key) => { arr.push([key, val]) })
    return JSON.stringify(arr)
  },
  state => new Map(JSON.parse(state)),
  { whitelist: ['selections'] }
)

const menuPersistReducerGenerator = debug => persistReducer({
  key: 'menu',
  version: 1,
  storage,
  debug,
  transforms: [transformSelectionsKey]
}, menu)

export default menuPersistReducerGenerator
