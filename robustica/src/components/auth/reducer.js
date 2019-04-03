import Immutable from 'seamless-immutable'
import AuthActions from './actions'

const initialState = Immutable({
  loggedIn: false,
  loginError: null
})

export default {
  auth: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case AuthActions.SIGN_IN_SUCCESS:
          return {
            ...state,
            loggedIn: true,
            loginError: null
          }
        case AuthActions.SIGN_IN_ERROR:
          return {
            ...state,
            loggedIn: false,
            loginError: action.payload.error
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}