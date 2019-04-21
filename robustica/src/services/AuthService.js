import * as firebase from 'firebase'
import history from '../utils/history'
import { SYSADMIN } from '../utils/role'
import { StorageService } from './StorageService'

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
          StorageService.clearAll()
          history.push('/')
        },
        () => {
          console.log('an error happened')
        }
      )
  }

  static isSignedIn() {
    if (firebase.auth().currentUser) return true
    return StorageService.getUserId() != null && StorageService.getUserId() !== ''
  }

  static userHasRole(role) {
    return StorageService.getUserRole() === role
  }

  static userInRoles(roles) {
    return roles.includes(StorageService.getUserRole()) || AuthService.userHasRole(SYSADMIN)
  }

  static getAuthToken() {
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser.getToken()
    } else {
      return new Promise((success, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe()
          if (!user) {
            StorageService.clearAll()
            history.push('/login')
          } else {
            user.getToken()
              .then(token => {
                StorageService.setAuthToken(token)
                success(token)
              }).catch(error => {
              reject(error)
            })
          }
        })
      })
    }
  }

  static getProviderId() {
    if (!firebase.auth().currentUser) return null
    return firebase.auth().currentUser.providerData[0].providerId
  }

  static getEmail() {
    if (!firebase.auth().currentUser) return null
    return firebase.auth().currentUser.email
  }

  static sendPasswordResetEmail(emailAddress) {
    return firebase.auth().sendPasswordResetEmail(emailAddress)
  }

}

export default firebaseApp
