export default class AuthActions {
  static SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
  static SIGN_IN_ERROR = 'SIGN_IN_ERROR'

  static SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
  static SIGN_UP_ERROR = 'SIGN_UP_ERROR'

  static RECOVER_SUCESSS = 'RECOVER_SUCESSS'
  static RECOVER_ERROR = 'RECOVER_ERROR'

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

  static signUpSuccess() {
    return {
      type: AuthActions.SIGN_UP_SUCCESS
    }
  }

  static signUpError(error) {
    return {
      type: AuthActions.SIGN_UP_ERROR,
      payload: {
        error
      }
    }
  }

  static recoverSuccess(message) {
    return {
      type: AuthActions.RECOVER_SUCESSS,
      payload: {
        message,
        color: 'success'
      }
    }
  }

  static recoverError(message) {
    return {
      type: AuthActions.RECOVER_ERROR,
      payload: {
        message,
        color: 'danger'
      }
    }
  }
}