import Immutable from 'seamless-immutable'
import { LOCATION_CHANGE } from 'connected-react-router'
import AuthActions from './actions'

const initialState = Immutable({
  loggedIn: false,
  authError: null,
  recoverResponse: null
})

export default {
  auth: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case AuthActions.SIGN_UP_SUCCESS:
        case AuthActions.SIGN_IN_SUCCESS:
          return {
            ...state,
            loggedIn: true,
            authError: null
          }
        case AuthActions.SIGN_UP_ERROR:
        case AuthActions.SIGN_IN_ERROR:
          return {
            ...state,
            loggedIn: false,
            authError: action.payload.error
          }
        case AuthActions.RECOVER_SUCESSS:
          return {
            ...state,
            recoverResponse: action.payload
          }
        case LOCATION_CHANGE:
          return {
            ...state,
            authError: null,
            recoverResponse: null
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}