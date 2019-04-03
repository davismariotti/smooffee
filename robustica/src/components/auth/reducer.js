import Immutable from 'seamless-immutable'
import AuthActions from './actions'

const initialState = Immutable({
  loggedIn: false,
  authError: null
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
        default:
          return {
            ...state
          }
      }
    }
  }
}