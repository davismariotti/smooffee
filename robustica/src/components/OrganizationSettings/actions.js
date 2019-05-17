export default class OrganizationSettingsActions {
  static OPEN_CREATE_PRODUCT_MODAL = 'OPEN_CREATE_PRODUCT_MODAL'
  static CLOSE_CREATE_PRODUCT_MODAL = 'CLOSE_CREATE_PRODUCT_MODAL'
  static OPEN_EDIT_PRODUCT_MODAL = 'OPEN_EDIT_PRODUCT_MODAL'

  static OPEN_PRODUCT_MENU = 'OPEN_PRODUCT_MENU'
  static CLOSE_PRODUCT_MENU = 'CLOSE_PRODUCT_MENU'

  static OPEN_CREATE_DELIVERY_PERIOD_MODAL = 'OPEN_CREATE_DELIVERY_PERIOD_MODAL'
  static CLOSE_CREATE_DELIVERY_PERIOD_MODAL = 'CLOSE_CREATE_DELIVERY_PERIOD_MODAL'
  static OPEN_EDIT_DELIVERY_PERIOD_MODAL = 'OPEN_EDIT_DELIVERY_PERIOD_MODAL'

  static OPEN_DELIVERY_PERIOD_MENU = 'OPEN_DELIVERY_PERIOD_MENU'
  static CLOSE_DELIVERY_PERIOD_MENU = 'CLOSE_DELIVERY_PERIOD_MENU'


  static OPEN_CREATE_ORDER_MODIFIER_MODAL = 'OPEN_CREATE_ORDER_MODIFIER_MODAL'
  static CLOSE_CREATE_ORDER_MODIFIER_MODAL = 'CLOSE_CREATE_ORDER_MODIFIER_MODAL'
  static OPEN_EDIT_ORDER_MODIFIER_MODAL = 'OPEN_EDIT_ORDER_MODIFIER_MODAL'

  static OPEN_ORDER_MODIFIER_MENU = 'OPEN_ORDER_MODIFIER_MENU'
  static CLOSE_ORDER_MODIFIER_MENU = 'CLOSE_ORDER_MODIFIER_MENU'

  static OPEN_ARE_YOU_SURE_MODAL = 'OPEN_ARE_YOU_SURE_MODAL'
  static CLOSE_ARE_YOU_SURE_MODAL = 'CLOSE_ARE_YOU_SURE_MODAL'

  static OPEN_EDIT_ORGANIZATION_MODAL = 'OPEN_EDIT_ORGANIZATION_MODAL'
  static CLOSE_EDIT_ORGANIZATION_MODAL = 'CLOSE_EDIT_ORGANIZATION_MODAL'

  static OPEN_USER_MENU = 'OPEN_USER_MENU'
  static CLOSE_USER_MENU = 'CLOSE_USER_MENU'

  static OPEN_ADD_FUNDS_MODAL = 'OPEN_ADD_FUNDS_MODAL'
  static CLOSE_ADD_FUNDS_MODAL = 'CLOSE_ADD_FUNDS_MODAL'

  static OPEN_PROMOTE_USER_MODAL = 'OPEN_PROMOTE_USER_MODAL'
  static CLOSE_PROMOTE_USER_MODAL = 'CLOSE_PROMOTE_USER_MODAL'

  // Products

  static openCreateProductModal() {
    return {
      type: OrganizationSettingsActions.OPEN_CREATE_PRODUCT_MODAL,
    }
  }

  static closeCreateProductModal() {
    return {
      type: OrganizationSettingsActions.CLOSE_CREATE_PRODUCT_MODAL
    }
  }

  static openEditProductModal(product, orderModifiers) {
    return {
      type: OrganizationSettingsActions.OPEN_EDIT_PRODUCT_MODAL,
      payload: {
        product,
        orderModifiers
      }
    }
  }

  static openProductMenu(row) {
    return {
      type: OrganizationSettingsActions.OPEN_PRODUCT_MENU,
      payload: {
        ...row
      }
    }
  }

  static closeProductMenu() {
    return {
      type: OrganizationSettingsActions.CLOSE_PRODUCT_MENU
    }
  }

  // Are you sure?

  static openAreYouSureModal(message, onSubmit) {
    return {
      type: OrganizationSettingsActions.OPEN_ARE_YOU_SURE_MODAL,
      payload: {
        message,
        onSubmit
      }
    }
  }

  static closeAreYouSureModal() {
    return {
      type: OrganizationSettingsActions.CLOSE_ARE_YOU_SURE_MODAL
    }
  }

  // Edit Organization

  static openEditOrganizationModal(organization) {
    return {
      type: OrganizationSettingsActions.OPEN_EDIT_ORGANIZATION_MODAL,
      payload: {
        ...organization
      }
    }
  }

  static closeEditOrganizationModal() {
    return {
      type: OrganizationSettingsActions.CLOSE_EDIT_ORGANIZATION_MODAL
    }
  }

  // User Menu

  static openUserMenu(row) {
    return {
      type: OrganizationSettingsActions.OPEN_USER_MENU,
      payload: {
        ...row
      }
    }
  }

  static closeUserMenu() {
    return {
      type: OrganizationSettingsActions.CLOSE_USER_MENU
    }
  }

  // Add Funds

  static openAddMoreFundsModal(user) {
    return {
      type: OrganizationSettingsActions.OPEN_ADD_FUNDS_MODAL,
      payload: {
        ...user
      }
    }
  }

  static closeAddFundsModal() {
    return {
      type: OrganizationSettingsActions.CLOSE_ADD_FUNDS_MODAL
    }
  }

  // Promote User

  static openPromoteUserModal(user) {
    return {
      type: OrganizationSettingsActions.OPEN_PROMOTE_USER_MODAL,
      payload: {
        ...user
      }
    }
  }

  static closePromoteUserModal() {
    return {
      type: OrganizationSettingsActions.CLOSE_PROMOTE_USER_MODAL
    }
  }

  // Delivery Period

  static openDeliveryPeriodMenu(row) {
    return {
      type: OrganizationSettingsActions.OPEN_DELIVERY_PERIOD_MENU,
      payload: {
        ...row
      }
    }
  }

  static closeDeliveryPeriodMenu() {
    return {
      type: OrganizationSettingsActions.CLOSE_DELIVERY_PERIOD_MENU
    }
  }

  static openCreateDeliveryPeriodModal() {
    return {
      type: OrganizationSettingsActions.OPEN_CREATE_DELIVERY_PERIOD_MODAL,
    }
  }

  static closeCreateDeliveryPeriodModal() {
    return {
      type: OrganizationSettingsActions.CLOSE_CREATE_DELIVERY_PERIOD_MODAL
    }
  }

  static openEditDeliveryPeriodModal(deliveryPeriod) {
    return {
      type: OrganizationSettingsActions.OPEN_EDIT_DELIVERY_PERIOD_MODAL,
      payload: {
        deliveryPeriod
      }
    }
  }

  // Order Modifier

  static openOrderModifierMenu(row) {
    return {
      type: OrganizationSettingsActions.OPEN_ORDER_MODIFIER_MENU,
      payload: {
        ...row
      }
    }
  }

  static closeOrderModifierMenu() {
    return {
      type: OrganizationSettingsActions.CLOSE_ORDER_MODIFIER_MENU
    }
  }

  static openCreateOrderModifierModal() {
    return {
      type: OrganizationSettingsActions.OPEN_CREATE_ORDER_MODIFIER_MODAL,
    }
  }

  static closeCreateOrderModifierModal() {
    return {
      type: OrganizationSettingsActions.CLOSE_CREATE_ORDER_MODIFIER_MODAL
    }
  }

  static openEditOrderModifierModal(orderModifier) {
    return {
      type: OrganizationSettingsActions.OPEN_EDIT_ORDER_MODIFIER_MODAL,
      payload: {
        orderModifier
      }
    }
  }
}
