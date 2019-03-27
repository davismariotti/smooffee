export default class HomeActions {
  static OPEN_CREATE_ORDER_MODAL  = 'OPEN_CREATE_ORDER_MODAL'

  static CLOSE_CREATE_ORDER_MODAL = 'CLOSE_CREATE_ORDER_MODAL'

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
}