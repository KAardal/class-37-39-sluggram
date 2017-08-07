import { combineReducers } from 'redux'
import auth from './auth.js'
import profile from './profile.js'
import photos from './photos.js'
export default combineReducers({ auth, profile, photos })
