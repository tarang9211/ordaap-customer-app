import appPersistReducerGenerator from './app'
import metadataPersistReducerGenerator from './metadata'
import cartPersistReducerGenerator from './cart'
import orderPersistReducerGenerator from './order'
import toastPersistReducerGenerator from './toast'
import restaurantPersistReducerGenerator from './restaurant'
import hotelPersistReducerGenerator from './hotel'
import menuPersistReducerGenerator from './menu'
import tagsPersistReducerGenerator from './tags'


const persistReducersGenerator = debug => ({
  app: appPersistReducerGenerator(debug),
  metadata: metadataPersistReducerGenerator(debug),
  cart: cartPersistReducerGenerator(debug),
  order: orderPersistReducerGenerator(debug),
  toast: toastPersistReducerGenerator(debug),
  restaurant: restaurantPersistReducerGenerator(debug),
  hotel: hotelPersistReducerGenerator(debug),
  menu: menuPersistReducerGenerator(debug),
  tags: tagsPersistReducerGenerator(debug)
})

export default persistReducersGenerator
