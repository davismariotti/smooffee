import firebase from 'react-native-firebase'
import { StorageService } from './StorageService'

export default class AuthService {
  static signout() {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          StorageService.clearAll()
          // history.push('/')
        },
        () => {
          console.log('an error happened')
        }
      )
  }

  //
  // static isSignedIn() {
  //   if (firebase.auth().currentUser) return true
  //   return StorageService.getUserId() != null && StorageService.getUserId() !== ''
  // }

  static getAuthToken() {
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser.getIdToken()
    } else {
      return new Promise((success, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe()
          if (!user) {
            StorageService.clearAll()
          } else {
            user.getIdToken()
              .then(token => {
                success(token)
              }).catch(error => {
              reject(error)
            })
          }
        })
      })
    }
  }

  // static getProviderId() {
  //   if (!firebase.auth().currentUser) return null
  //   return firebase.auth().currentUser.providerData[0].providerId
  // }
  //
  // static getEmail() {
  //   if (!firebase.auth().currentUser) return null
  //   return firebase.auth().currentUser.email
  // }

  static sendPasswordResetEmail(emailAddress) {
    return firebase.auth().sendPasswordResetEmail(emailAddress)
  }

}
