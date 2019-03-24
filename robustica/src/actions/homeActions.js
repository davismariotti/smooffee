import {CLOSE_CREATE_ORDER_MODAL, OPEN_CREATE_ORDER_MODAL} from '../constants/actionTypes'

export const openHomeCreateOrderModal = () => ({
  type: OPEN_CREATE_ORDER_MODAL
})

export const closeHomeCreateOrderModal = () => ({
  type: CLOSE_CREATE_ORDER_MODAL
})
