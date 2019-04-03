export default class AuthActions {
  static SIGN_IN_SUCCESS  = 'SIGN_IN_SUCCESS'

  static SIGN_IN_ERROR = 'SIGN_IN_ERROR'

  static signInSuccess() {
    return {
      type: AuthActions.SIGN_IN_SUCCESS
    }
  }

  static signInError(error) {
    return {
      type: AuthActions.SIGN_IN_ERROR,
      payload: {
        error
      }
    }
  }
}