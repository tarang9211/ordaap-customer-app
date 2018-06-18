import firebase from 'firebase'
import { setUID, signInAnonymousFailed, emailLinked } from '../actions'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
})

export const initializeFirebaseWithStore = store =>
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(setUID(user.uid))
        if (typeof user.email === 'string' && user.email.length > 0) {
          store.dispatch(emailLinked(user.email))
        }
        resolve()
      } else {
        firebase.auth().signInAnonymously()
      }
    }, (error) => {
      store.dispatch(signInAnonymousFailed(error))
      reject()
    })
  })

export const database = firebase.database()
export const auth = firebase.auth()
export const EmailAuthProvider = firebase.auth.EmailAuthProvider
