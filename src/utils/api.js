import { database, auth, EmailAuthProvider } from './firebase'
import businessRules from './business-rules'
import * as ERRORS from '../errors/types'

const curateMenu = (menu) => {
  const now = new Date()
  return Object.keys(menu).reduce((newMenu, iid) => {
    const available = menu[iid].available &&
      businessRules.isMenuItemAvailable(menu[iid].timings, now)
    return ({ ...newMenu, [iid]: { iid, ...menu[iid], available } })
  }, {})
}

export const GetRestaurant = rid => (
  new Promise((resolve, reject) => {
    database.ref().child(`/restaurants/${rid}`)
      .once('value', (snap) => {
        if (!snap.exists()) {
          reject(ERRORS.RESTAURANT_NOT_FOUND)
        } else {
          const restaurant = snap.val()
          restaurant.menu = curateMenu(restaurant.menu)
          const isRoomService = !!restaurant.config && restaurant.config.isRoomService
          restaurant.timings = businessRules.computeOpenHours(restaurant.timings, isRoomService)
          resolve(restaurant)
        }
      })
      .catch(reject)
  })
)

const makeHttpRequest = (path, body) => new Promise((resolve, reject) => {
  auth.currentUser.getIdToken().then((token) => {
    const req = new XMLHttpRequest()
    req.onload = () => {
      let response = null
      try {
        response = JSON.parse(req.responseText)
      } catch (error) {
        response = req.responseText
      }
      if (req.status !== 201 && req.status !== 200) reject(response)
      else resolve(response)
    }
    req.onerror = () => reject()
    req.open('POST', `${process.env.REACT_APP_APP_URL || window.location.origin}${path}`, true)
    req.setRequestHeader('Authorization', `Bearer ${token}`)
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify(body))
  })
})

export const CreateOrder = (rid, sid, uid, bkid) => makeHttpRequest('/app/orders', { rid, sid, uid, bkid })
export const AddToOrder = (oid, items) => makeHttpRequest(`/app/orders/${oid}/buckets`, { items })

let bucketsRef = null
let closedRef = null
let custClosedRef = null

export const ListenForBuckets = (
  oid,
  handleBucketAdded,
  handleBucketUpdated,
  handleOrderClosedByTenant,
  handleOrderClosedByCustomer,
  handleInitialSyncComplete
) => {
  if (bucketsRef != null) {
    throw Error('It is incorrect to call this API multiple times. Call StopListeningForBuckets.')
  }

  bucketsRef = database.ref(`/orders/${oid}/buckets`)
  closedRef = database.ref(`/orders/${oid}/closed`)
  custClosedRef = database.ref(`/orders/${oid}/custClosed`)

  bucketsRef.on('child_added', (snap) => {
    handleBucketAdded(snap.key, snap.val())
  })

  bucketsRef.on('child_changed', (snap) => {
    handleBucketUpdated(snap.key, snap.val())
  })

  bucketsRef.once('value', () => {
    handleInitialSyncComplete()
    // Whether an order is closed (by customer or tenant) or not is
    // checked only after the initial sync is complete
    // Also wrapping with a promise here to ensure that the handle callbacks
    // are called only once
    new Promise((resolve) => {
      closedRef.on('value', (snap) => {
        const closed = snap.val()
        if (closed) resolve()
      })
    }).then(handleOrderClosedByTenant)
    new Promise((resolve) => {
      custClosedRef.on('value', (snap) => {
        const closed = snap.val()
        if (closed) resolve()
      })
    }).then(handleOrderClosedByCustomer)
  })
}

export const StopListeningForBuckets = () => {
  if (bucketsRef == null) {
    throw Error('ListenForBuckets not called')
  }
  bucketsRef.off()
  closedRef.off()
  custClosedRef.off()
  bucketsRef = null
  closedRef = null
  custClosedRef = null
}

export const CloseOrder = (rid, oid) => (
  new Promise((resolve, reject) => {
    const custClosedAt = Date.now()
    database.ref().child(`orders/${oid}`)
      .update({
        custClosed: true,
        custClosedAt,
        'rid-custClosed-custClosedAt': `${rid}-${true}-${custClosedAt}`
      })
      .then(resolve)
      .catch(reject)
  })
)

export const GetTags = () => (
  new Promise((resolve, reject) => {
    database.ref().child('tags')
      .once('value', (snap) => {
        resolve(snap.val())
      })
      .catch(reject)
  })
)

export const SubmitFeedback = feedback => (
  new Promise((resolve, reject) => {
    database.ref('feedback').push(feedback)
      .then(resolve)
      .catch(reject)
  })
)

export const LinkEmail = email => (
  new Promise((resolve, reject) => {
    const credential = EmailAuthProvider.credential(email, 'password')
    auth.currentUser.linkWithCredential(credential).then(resolve).catch(reject)
  })
)

/**
 * @param {*} rid Restaurant Id
 * @param {*} handleMenuItemChange Callback that returns the iid and the menu item
 */
let menuRef = null
export const ListenForMenuItemChanges = (rid, handleMenuItemChange) => {
  if (menuRef != null) {
    throw Error('It is incorrect to call this API multiple times. Call StopListeningForMenuItemChanges.')
  }
  menuRef = database.ref(`/restaurants/${rid}/menu`)
  menuRef.on('child_changed', (snap) => {
    const iid = snap.key
    const itemSnapshot = snap.val()
    itemSnapshot.available = itemSnapshot.available &&
      businessRules.isMenuItemAvailable(itemSnapshot.timings)
    handleMenuItemChange(iid, { iid, ...itemSnapshot })
  })
}

/**
 * Remove listener for menu item updates
 */
export const StopListeningForMenuItemChanges = () => {
  if (menuRef == null) {
    throw Error('ListenForMenuItemChanges not called')
  }
  menuRef.off()
  menuRef = null
}

export const GetHotel = hid => (
  new Promise((resolve, reject) => {
    database.ref().child(`/hotels/${hid}`)
      .once('value', (snap) => {
        if (!snap.exists()) {
          reject(ERRORS.HOTEL_NOT_FOUND)
        } else {
          const hotel = snap.val()
          hotel.hid = hid
          hotel.restaurants = hotel.restaurants.map(restaurant =>
            ({ ...restaurant, timings: businessRules.computeOpenHours(restaurant.timings, true) }))
          resolve(hotel)
        }
      })
      .catch(reject)
  })
)
