import * as _firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import config from '../config'

if (_firebase.apps.length === 0) {
  _firebase.initializeApp(config.firebase)
}

export const firebase = _firebase
export const { auth, storage } = firebase
export const db = firebase.firestore
export const realtime = firebase.database

export const timestamp = firebase.firestore.Timestamp.now
export const { serverTimestamp } = firebase.firestore.FieldValue

export { Firemodel } from '@firelayer/core/lib/web'
