import {CLOSE_CREATE_ORDER_MODAL, OPEN_CREATE_ORDER_MODAL} from '../constants/actionTypes'

const initialState = {
  home: {
    createOrderModalOpen: false
  }
};

function rootReducer(state = initialState, action) {
  if (action.type === OPEN_CREATE_ORDER_MODAL) {
    return {...state, home: {...state.home, createOrderModalOpen: true}}
  }
  if (action.type === CLOSE_CREATE_ORDER_MODAL) {
    return {...state, home: {...state.home, createOrderModalOpen: false}}
  }
  return state;
}
export default rootReducer;
