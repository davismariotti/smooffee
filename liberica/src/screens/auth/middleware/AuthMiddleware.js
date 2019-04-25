import isEmail from 'validator/lib/isEmail'
// import { readCurrentUserQuery } from '../../graphql/userQueries'
// import { client } from '../../services/apollo'
import AuthActions from '../actions'
import { StorageService } from '../../../services/StorageService'
import firebase from 'react-native-firebase'


export default class AuthMiddleware {
  static createUserWithEmailAndPassword(email, password) {
    return dispatch => {
      if (isEmail(email)) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email.trim(), password.trim())
          .then((result) => {
            return StorageService.setUserId(result.uid)
          })
          .then(() => {
            return firebase
              .auth()
              .currentUser.getToken()
          })
          .then(token => {
            dispatch(AuthActions.signUpSuccess())
            // history.push('/signupcontinued')
          })
          .catch(error => {
            dispatch(AuthActions.signUpError(error.message))
          })
      } else {
        dispatch(AuthActions.signUpError('Email Address in not valid'))
      }
    }
  }

  static signInWithEmailAndPassword(email, password) {
    return dispatch => {
      if (isEmail(email)) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
          console.log('result', result)
          console.log('result.user', result.user)
          AuthMiddleware.continueLogin(result.user, dispatch)
        })
          .catch(error => {
            dispatch(AuthActions.signInError(error.message))
          })
      } else {
        dispatch(AuthActions.signInError('Email Address is not valid'))
      }
    }
  }

  // static signInWithGoogle() {
  //   return dispatch => {
  //     firebase
  //       .auth()
  //       .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  //       .then(result => {
  //         AuthMiddleware.continueLogin(result, dispatch)
  //       })
  //       .catch(error => {
  //         dispatch(AuthActions.signInError(error.message))
  //       })
  //   }
  // }

  static continueLogin(result, dispatch) {
    StorageService.setUserId(result.uid).then(async () => {
      const userId = await StorageService.getUserId()
      dispatch(AuthActions.signInError(`Success for ${userId}`))
    })

    // firebase.auth().currentUser.getToken().then(token => {
    //   StorageService.setAuthToken(token)
    //   client.query({query: readCurrentUserQuery}).then(({error, data}) => {
    //     if (error) {
    //       dispatch(AuthActions.signInError(error))
    //     } else {
    //       StorageService.setOrganizationId(data.user.currentUser.organizationId)
    //       dispatch(AuthActions.signInSuccess())
    //       history.push('/home')
    //     }
    //   })
    // })
  }

  static recoverWithEmail(email) {
    return dispatch => {
      if (isEmail(email)) {
        firebase.auth().sendPasswordResetEmail(email.trim())
          .then(
            () => {
              dispatch(AuthActions.recoverSuccess(`Please check your email ${email.trim()} for instructions.`))
            },
            () => {
              dispatch(AuthActions.recoverError('Sorry an error has occured, Please try again.'))
            }
          )
      } else {
        dispatch(AuthActions.recoverError('Please enter a valid email.'))
      }
    }
  }


}