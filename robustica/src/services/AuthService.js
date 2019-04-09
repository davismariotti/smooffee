import * as firebase from 'firebase'
import history from '../utils/history'
import { AUTH_TOKEN, USER_ID } from '../constants'

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
          history.push('/')
        },
        () => {
          console.log('an error happened')
        }
      )
  }
}

export default firebaseApp
