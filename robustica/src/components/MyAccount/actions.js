export default class MyAccountActions {
  static RESET_PASSWORD_LINK_SENT = 'RESET_PASSWORD_LINK_SENT'

  static resetPasswordLinkSent() {
    return {
      type: MyAccountActions.RESET_PASSWORD_LINK_SENT
    }
  }
}