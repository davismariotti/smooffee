import Immutable from 'seamless-immutable'
import { LOCATION_CHANGE } from 'connected-react-router'
import UserPageActions from './actions'

const initialState = Immutable({
  selectedTab: false,
  orderHistoryMenu: null,
  paymentHistoryMenu: null,
  areYouSure: null
})

export default {
  userpage: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case UserPageActions.CHANGE_TAB:
          return {
            ...state,
            selectedTab: action.payload.selectedTab,
            orderHistoryMenu: null,
            paymentHistoryMenu: null
          }
        case UserPageActions.OPEN_ORDER_HISTORY_MENU:
          return {
            ...state,
            orderHistoryMenu: {
              anchorEl: action.payload.anchorEl,
              order: action.payload.order
            }
          }
        case UserPageActions.CLOSE_ORDER_PAYMENT_HISTORY_MENU:
          return {
            ...state,
            orderHistoryMenu: null,
            paymentHistoryMenu: null
          }
        case UserPageActions.OPEN_PAYMENT_HISTORY_MENU:
          return {
            ...state,
            paymentHistoryMenu: {
              anchorEl: action.payload.anchorEl,
              payment: action.payload.payment
            }
          }
        case LOCATION_CHANGE:
          return {
            ...state,
            selectedTab: 0,
            orderHistoryMenu: null,
            paymentHistoryMenu: null,
            areYouSure: null
          }
        case UserPageActions.CLOSE_ARE_YOU_SURE:
          return {
            ...state,
            areYouSure: null
          }
        case UserPageActions.OPEN_ARE_YOU_SURE:
          return {
            ...state,
            areYouSure: action.payload,
            orderHistoryMenu: null,
            paymentHistoryMenu: null
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}