import * as ERRORS from './types'

const ToastErrors = {
  [ERRORS.RESTAURANT_NOT_FOUND]: "We couldn't find a restaurant for this QR code in our system. Please scan a different code or let the restaurant know.",
  [ERRORS.HOTEL_NOT_FOUND]: "We couldn't find a hotel for this QR code in our system. Please scan a different code or let the hotel know.",
  [ERRORS.MENU_ITEM_NOT_FOUND]: 'It looks like the menu item no longer exists. Browse through the restaurant menu and click on one of them to view details.',
  [ERRORS.CART_ITEM_NOT_FOUND]: "We couldn't find this item in your cart. Please choose an item from the new orders section to view it."
}

export default ToastErrors
