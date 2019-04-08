export default class OrganizationSettingsActions {
  static OPEN_CREATE_PRODUCT_MODAL = 'OPEN_CREATE_PRODUCT_MODAL'
  static CLOSE_CREATE_PRODUCT_MODAL = 'CLOSE_CREATE_PRODUCT_MODAL'
  static OPEN_EDIT_PRODUCT_MODAL = 'OPEN_EDIT_PRODUCT_MODAL'
  static OPEN_MORE_VERT_MENU = 'OPEN_MORE_VERT_MENU'
  static CLOSE_MORE_VERT_MENU = 'CLOSE_MORE_VERT_MENU'
  static OPEN_ARE_YOU_SURE_MODAL = 'OPEN_ARE_YOU_SURE_MODAL'
  static CLOSE_ARE_YOU_SURE_MODAL = 'CLOSE_ARE_YOU_SURE_MODAL'
  static OPEN_EDIT_ORGANIZATION_MODAL = 'OPEN_EDIT_ORGANIZATION_MODAL'
  static CLOSE_EDIT_ORGANIZATION_MODAL = 'CLOSE_EDIT_ORGANIZATION_MODAL'

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

  static openMoreVertMenu(row) {
    return {
      type: OrganizationSettingsActions.OPEN_MORE_VERT_MENU,
      payload: {
        row
      }
    }
  }

  static closeMoreVertMenu() {
    return {
      type: OrganizationSettingsActions.CLOSE_MORE_VERT_MENU
    }
  }

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
}