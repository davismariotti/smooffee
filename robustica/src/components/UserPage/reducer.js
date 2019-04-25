import Immutable from 'seamless-immutable'
import { LOCATION_CHANGE } from 'connected-react-router'
import UserPageActions from './actions'

const initialState = Immutable({
  selectedTab: false
})

export default {
  userpage: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case UserPageActions.CHANGE_TAB:
          return {
            ...state,
            selectedTab: action.payload.selectedTab
          }
        case LOCATION_CHANGE:
          return {
            ...state,
            selectedTab: 0
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}