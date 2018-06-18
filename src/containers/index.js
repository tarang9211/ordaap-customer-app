import Loadable from 'react-loadable'
import Loader from '../components/loader'

export const RestaurantHome = Loadable({
  loader: () => import('./restaurant-home'),
  loading: Loader
})

export const Hotel = Loadable({
  loader: () => import('./hotel'),
  loading: Loader
})

export const ReadQR = Loadable({
  loader: () => import('./read-qr'),
  loading: Loader
})

export const MenuItem = Loadable({
  loader: () => import('./menu-item'),
  loading: Loader
})

export const CartItem = Loadable({
  loader: () => import('./cart-item'),
  loading: Loader
})

export const Order = Loadable({
  loader: () => import('./order'),
  loading: Loader
})

export const Billing = Loadable({
  loader: () => import('./billing'),
  loading: Loader
})

export const FeedbackPage = Loadable({
  loader: () => import('./feedback-page'),
  loading: Loader
})

export { default as RoutesContainer } from './routes-container'
export { default as DataContainer } from './data-container'
export { default as ToastContainer } from './toast-container'
export { default as Metadata } from './metadata'

Hotel.preload()
RestaurantHome.preload()
ReadQR.preload()
MenuItem.preload()
CartItem.preload()
Order.preload()
Billing.preload()
