export default class OrganizationSettingsActions {
  static OPEN_CREATE_PRODUCT_MODAL  = 'OPEN_CREATE_PRODUCT_MODAL'
  static CLOSE_CREATE_PRODUCT_MODAL = 'CLOSE_CREATE_PRODUCT_MODAL'
  static OPEN_EDIT_PRODUCT_MODAL  = 'OPEN_EDIT_PRODUCT_MODAL'

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

  static openEditProductModal(product) {
    return {
      type: OrganizationSettingsActions.OPEN_EDIT_PRODUCT_MODAL,
      payload: {
        product
      }
    }
  }
}