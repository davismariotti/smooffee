export default class UserPageActions {
  static CHANGE_TAB = 'CHANGE_TAB'

  static OPEN_ORDER_HISTORY_MENU = 'OPEN_ORDER_HISTORY_MENU'
  static OPEN_PAYMENT_HISTORY_MENU = 'OPEN_PAYMENT_HISTORY_MENU'
  static CLOSE_ORDER_PAYMENT_HISTORY_MENU = 'CLOSE_ORDER_PAYMENT_HISTORY_MENU'

  static changeTab(selectedTab) {
    return {
      type: UserPageActions.CHANGE_TAB,
      payload: {
        selectedTab
      }
    }
  }

  static openOrderHistoryMenu(order, anchorEl) {
    return {
      type: UserPageActions.OPEN_ORDER_HISTORY_MENU,
      payload: {
        order,
        anchorEl
      }
    }
  }

  static closeOrderPaymentHistoryMenu() {
    return {
      type: UserPageActions.CLOSE_ORDER_PAYMENT_HISTORY_MENU
    }
  }

  static openPaymentHistoryMenu(payment, anchorEl) {
    return {
      type: UserPageActions.OPEN_PAYMENT_HISTORY_MENU,
      payload: {
        payment,
        anchorEl
      }
    }
  }
}