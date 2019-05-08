export default class OrderActions {
  static SELECT_ORDER_MODIFIER = 'SELECT_ORDER_MODIFIER'
  static SELECT_SIZE = 'SELECT_SIZE'

  static selectOrderModifier(orderModifier) {
    return {
      type: OrderActions.SELECT_ORDER_MODIFIER,
      payload: {
        orderModifier
      }
    }
  }

  static selectSize(size) {
    return {
      type: OrderActions.SELECT_SIZE,
      payload: {
        size
      }
    }
  }
}
