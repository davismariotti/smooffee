export default class HomeActions {
  static OPEN_CREATE_ORDER_MODAL = 'OPEN_CREATE_ORDER_MODAL'
  static CLOSE_CREATE_ORDER_MODAL = 'CLOSE_CREATE_ORDER_MODAL'

  static CHOOSE_CLASS_PERIOD = 'CHOOSE_CLASS_PERIOD'

  static openCreateOrderModal() {
    return {
      type: HomeActions.OPEN_CREATE_ORDER_MODAL
    }
  }

  static closeCreateOrderModal() {
    return {
      type: HomeActions.CLOSE_CREATE_ORDER_MODAL
    }
  }

  static chooseClassPeriod(deliveryPeriod) {
    return {
      type: HomeActions.CHOOSE_CLASS_PERIOD,
      payload: {
        deliveryPeriod
      }
    }
  }
}