import Immutable from 'seamless-immutable'
import AuthActions from './actions'
import Order from '../home/components/Order';
import OrderActions from './actions';
// import console = require('console');

const initialState = Immutable({
  orderModifiers: [],
  size: null
})

export default {
  order: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case OrderActions.SELECT_ORDER_MODIFIER:{
          let oldModifiers = Array.from(state.orderModifiers.slice())
          oldModifiers.push(action.payload.orderModifier)
          
          return { 
            ...state,
            orderModifiers: oldModifiers
          }
        }
        case OrderActions.SELECT_SIZE:{
          return {
            ...state,
            size: action.payload.size
          }
        }
        default:
          return {
            ...state
          }
      }
    }
  }
}