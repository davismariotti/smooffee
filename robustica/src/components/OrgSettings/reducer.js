import Immutable from 'seamless-immutable'
import OrganizationSettingsActions from './actions'

const initialState = Immutable({
  createProductModalOpen: false,
  editProduct: false,
  editProductObject: null
})

export default {
  organizationSettings: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {
        case OrganizationSettingsActions.OPEN_CREATE_PRODUCT_MODAL:
          return {
            ...state,
            createProductModalOpen: true,
            editProduct: false,
            editProductObject: null
          }
        case OrganizationSettingsActions.CLOSE_CREATE_PRODUCT_MODAL:
          return {
            ...state,
            createProductModalOpen: false,
            editProduct: false,
            editProductObject: null
          }
        case OrganizationSettingsActions.OPEN_EDIT_PRODUCT_MODAL:
          return {
            ...state,
            createProductModalOpen: true,
            editProduct: true,
            editProductObject: action.payload
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}