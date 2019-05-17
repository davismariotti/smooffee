import Immutable from 'seamless-immutable'
import OrganizationSettingsActions from './actions'

const initialState = Immutable({
  createProductModalOpen: false,
  editProduct: false,
  editProductObject: null,
  productMenu: null,

  createDeliveryPeriodModalOpen: false,
  editDeliveryPeriod: false,
  editDeliveryPeriodObject: null,
  deliveryPeriodMenu: null,

  createOrderModifierModalOpen: false,
  editOrderModifier: false,
  editOrderModifierObject: null,
  orderModifierMenu: null,

  userMenu: null,

  areYouSure: null,
  editOrganization: null,
  addMoreFunds: null,
  promoteUser: null
})

export default {
  organizationSettings: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {

        // Products

        case OrganizationSettingsActions.OPEN_CREATE_PRODUCT_MODAL:
          return {
            ...state,
            createProductModalOpen: true,
            editProduct: false,
            editProductObject: null,
            productMenu: null,
          }
        case OrganizationSettingsActions.CLOSE_CREATE_PRODUCT_MODAL:
          return {
            ...state,
            createProductModalOpen: false,
            editProduct: false,
            editProductObject: null,
            productMenu: null,
          }
        case OrganizationSettingsActions.OPEN_EDIT_PRODUCT_MODAL:
          return {
            ...state,
            createProductModalOpen: true,
            editProduct: true,
            editProductObject: action.payload,
            productMenu: null,
          }
        case OrganizationSettingsActions.OPEN_PRODUCT_MENU:
          return {
            ...state,
            productMenu: { ...action.payload }
          }
        case OrganizationSettingsActions.CLOSE_PRODUCT_MENU:
          return {
            ...state,
            productMenu: null
          }

        // Are you Sure?

        case OrganizationSettingsActions.OPEN_ARE_YOU_SURE_MODAL:
          return {
            ...state,
            areYouSure: action.payload,
            productMenu: null,
            deliveryPeriodMenu: null
          }
        case OrganizationSettingsActions.CLOSE_ARE_YOU_SURE_MODAL:
          return {
            ...state,
            areYouSure: null,
          }

        // Edit Organization

        case OrganizationSettingsActions.OPEN_EDIT_ORGANIZATION_MODAL:
          return {
            ...state,
            editOrganization: {
              organizationId: action.payload.id,
              name: action.payload.name
            }
          }
        case OrganizationSettingsActions.CLOSE_EDIT_ORGANIZATION_MODAL:
          return {
            ...state,
            editOrganization: null
          }

        // User Menu

        case OrganizationSettingsActions.OPEN_USER_MENU:
          return {
            ...state,
            userMenu: { ...action.payload }
          }
        case OrganizationSettingsActions.CLOSE_USER_MENU:
          return {
            ...state,
            userMenu: null
          }

        // Add funds

        case OrganizationSettingsActions.OPEN_ADD_FUNDS_MODAL:
          return {
            ...state,
            userMenu: null,
            addMoreFunds: action.payload
          }
        case OrganizationSettingsActions.CLOSE_ADD_FUNDS_MODAL:
          return {
            ...state,
            addMoreFunds: null
          }

        // Promote User

        case OrganizationSettingsActions.OPEN_PROMOTE_USER_MODAL:
          return {
            ...state,
            userMenu: null,
            promoteUser: action.payload
          }
        case OrganizationSettingsActions.CLOSE_PROMOTE_USER_MODAL:
          return {
            ...state,
            promoteUser: null
          }

        // Delivery Period

        case OrganizationSettingsActions.OPEN_DELIVERY_PERIOD_MENU:
          return {
            ...state,
            deliveryPeriodMenu: { ...action.payload }
          }
        case OrganizationSettingsActions.CLOSE_DELIVERY_PERIOD_MENU:
          return {
            ...state,
            deliveryPeriodMenu: null
          }
        case OrganizationSettingsActions.OPEN_CREATE_DELIVERY_PERIOD_MODAL:
          return {
            ...state,
            createDeliveryPeriodModalOpen: true,
            editDeliveryPeriod: false,
            editDeliveryPeriodObject: null,
            deliveryPeriodMenu: null,
          }
        case OrganizationSettingsActions.CLOSE_CREATE_DELIVERY_PERIOD_MODAL:
          return {
            ...state,
            createDeliveryPeriodModalOpen: false,
            editDeliveryPeriod: false,
            editDeliveryPeriodObject: null,
            deliveryPeriodMenu: null,
          }
        case OrganizationSettingsActions.OPEN_EDIT_DELIVERY_PERIOD_MODAL:
          return {
            ...state,
            createDeliveryPeriodModalOpen: true,
            editDeliveryPeriod: true,
            editDeliveryPeriodObject: action.payload,
            deliveryPeriodMenu: null,
          }

        // Order Modifiers

        case OrganizationSettingsActions.OPEN_ORDER_MODIFIER_MENU:
          return {
            ...state,
            orderModifierMenu: { ...action.payload }
          }
        case OrganizationSettingsActions.CLOSE_ORDER_MODIFIER_MENU:
          return {
            ...state,
            orderModifierMenu: null
          }
        case OrganizationSettingsActions.OPEN_CREATE_ORDER_MODIFIER_MODAL:
          return {
            ...state,
            createOrderModifierModalOpen: true,
            editOrderModifier: false,
            editOrderModifierObject: null,
            orderModifierMenu: null,
          }
        case OrganizationSettingsActions.CLOSE_CREATE_ORDER_MODIFIER_MODAL:
          return {
            ...state,
            createOrderModifierModalOpen: false,
            editOrderModifier: false,
            editOrderModifierObject: null,
            orderModifierMenu: null,
          }
        case OrganizationSettingsActions.OPEN_EDIT_ORDER_MODIFIER_MODAL:
          return {
            ...state,
            createOrderModifierModalOpen: true,
            editOrderModifier: true,
            editOrderModifierObject: action.payload,
            orderModifierMenu: null,
          }

        default:
          return {
            ...state
          }
      }
    }
  }
}
