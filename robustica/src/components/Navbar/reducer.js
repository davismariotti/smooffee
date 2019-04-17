import Immutable from 'seamless-immutable'
import { LOCATION_CHANGE } from 'connected-react-router'
import NavbarActions from './actions'

const initialState = Immutable({
  leftMenuOpen: false,
  rightMenuOpen: false
})

export default {
  navbar: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case NavbarActions.LEFT_MENU_OPEN:
          return {
            ...state,
            leftMenuOpen: true,
            rightMenuOpen: false
          }
        case NavbarActions.RIGHT_MENU_OPEN:
          return {
            ...state,
            leftMenuOpen: false,
            rightMenuOpen: true
          }
        case NavbarActions.LEFT_MENU_CLOSE:
        case NavbarActions.RIGHT_MENU_CLOSE:
        case LOCATION_CHANGE:
          return {
            ...state,
            leftMenuOpen: false,
            rightMenuOpen: false
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}