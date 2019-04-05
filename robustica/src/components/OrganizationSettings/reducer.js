import Immutable from 'seamless-immutable'
import OrganizationSettingsActions from './actions'

const initialState = Immutable({
  createProductModalOpen: false,
  editProduct: false,
  editProductObject: null,
  openMenu: null,
  areYouSure: null
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
            editProductObject: null,
            openMenu: null,
          }
        case OrganizationSettingsActions.CLOSE_CREATE_PRODUCT_MODAL:
          return {
            ...state,
            createProductModalOpen: false,
            editProduct: false,
            editProductObject: null,
            openMenu: null,
          }
        case OrganizationSettingsActions.OPEN_EDIT_PRODUCT_MODAL:
          return {
            ...state,
            createProductModalOpen: true,
            editProduct: true,
            editProductObject: action.payload,
            openMenu: null,
          }
        case OrganizationSettingsActions.OPEN_MORE_VERT_MENU:
          return {
            ...state,
            openMenu: {...action.payload.row}
          }
        case OrganizationSettingsActions.CLOSE_MORE_VERT_MENU:
          return {
            ...state,
            openMenu: null
          }
        case OrganizationSettingsActions.OPEN_ARE_YOU_SURE_MODAL:
          return {
            ...state,
            areYouSure: action.payload,
            openMenu: null
          }
        case OrganizationSettingsActions.CLOSE_ARE_YOU_SURE_MODAL:
          return {
            ...state,
            areYouSure: null,
          }
        default:
          return {
            ...state
          }
      }
    }
  }
}