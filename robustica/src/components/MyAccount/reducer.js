import Immutable from 'seamless-immutable'
import { LOCATION_CHANGE } from 'connected-react-router'
import MyAccountActions from './actions'

const initialState = Immutable({
  resetPasswordLinkSent: false
})

export default {
  myaccount: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case MyAccountActions.RESET_PASSWORD_LINK_SENT:
          return {
            ...state,
            resetPasswordLinkSent: true
          }
        case LOCATION_CHANGE:
          return {
            ...state,
            resetPasswordLinkSent: false
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}