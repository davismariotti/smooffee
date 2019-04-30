import Immutable from 'seamless-immutable'
import HomeActions from './actions'

const initialState = Immutable({
  createOrderModalOpen: false,
  selectedDeliveryPeriod: null
})

export default {
  home: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case HomeActions.OPEN_CREATE_ORDER_MODAL:
          return {
            ...state,
            createOrderModalOpen: true
          }
        case HomeActions.CLOSE_CREATE_ORDER_MODAL:
          return {
            ...state,
            createOrderModalOpen: false
          }
        case HomeActions.CHOOSE_CLASS_PERIOD:
          return {
            ...state,
            selectedDeliveryPeriod: action.payload.deliveryPeriod
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}