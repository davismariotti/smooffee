import * as firebase from 'firebase'
import history from '../utils/history'
import { AUTH_TOKEN, ORGANIZATION_ID, USER_ID, USER_ROLE } from '../constants'
import { SYSADMIN } from '../utils/role'

const config = {
  apiKey: 'AIzaSyBqHXy9cnVIfxuEQ1rO-V2eiZNC873xenY',
  authDomain: 'smooffee-test.firebaseapp.com',
  databaseURL: 'https://smooffee-test.firebaseio.com',
  projectId: 'smooffee-test',
  storageBucket: 'smooffee-test.appspot.com',
  messagingSenderId: '286867392347'
}

const firebaseApp = firebase.initializeApp(config)

export class AuthService {
  static signout() {
    firebaseApp
      .auth()
      .signOut()
      .then(
        () => {
          localStorage.setItem(AUTH_TOKEN, '')
          localStorage.setItem(USER_ID, '')
          localStorage.setItem(ORGANIZATION_ID, '')
          localStorage.setItem(USER_ROLE, '')
          history.push('/')
        },
        () => {
          console.log('an error happened')
        }
      )
  }

  static isSignedIn() {
    if (firebase.auth().currentUser) return true
    return localStorage.getItem(USER_ID) != null && localStorage.getItem(USER_ID) !== '';
  }

  static userHasRole(role) {
    return localStorage.getItem(USER_ROLE) === role
  }

  static userInRoles(roles) {
    return roles.includes(localStorage.getItem(USER_ROLE)) || AuthService.userHasRole(SYSADMIN)
  }
}

export default firebaseApp
