export default class UserPageActions {
  static CHANGE_TAB = 'CHANGE_TAB'

  static OPEN_ORDER_HISTORY_MENU = 'OPEN_ORDER_HISTORY_MENU'
  static OPEN_PAYMENT_HISTORY_MENU = 'OPEN_PAYMENT_HISTORY_MENU'
  static CLOSE_ORDER_PAYMENT_HISTORY_MENU = 'CLOSE_ORDER_PAYMENT_HISTORY_MENU'

  static CLOSE_ARE_YOU_SURE = 'CLOSE_ARE_YOU_SURE'
  static OPEN_ARE_YOU_SURE = 'OPEN_ARE_YOU_SURE'

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


  static openAreYouSure(message, subText, onSubmit) {
    return {
      type: UserPageActions.OPEN_ARE_YOU_SURE,
      payload: {
        message,
        subText,
        onSubmit
      }
    }
  }

  static closeAreYouSure() {
    return {
      type: UserPageActions.CLOSE_ARE_YOU_SURE
    }
  }
}