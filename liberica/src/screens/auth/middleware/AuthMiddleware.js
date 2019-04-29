import isEmail from 'validator/lib/isEmail'
import { client } from '../../../services/apollo'
import AuthActions from '../actions'
import { StorageService } from '../../../services/StorageService'
import firebase from 'react-native-firebase'
import NavigationService from '../../../services/NavigationService'
import { creatUserMutation, readCurrentUserQuery } from '../../../graphql/userQueries'

export default class AuthMiddleware {
  static createUserWithEmailAndPassword(email, password, firstName, lastName) {
    return dispatch => {
      if (isEmail(email)) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email.trim(), password.trim())
          .then((result) => {
            return StorageService.setUserId(result.user.uid)
          })
          .then(() => {
            dispatch(AuthActions.signUpSuccess())
            return client.mutate({
              mutation: creatUserMutation,
              variables: {
                organizationId: 3,
                userInput: {
                  firstName,
                  lastName
                }
              }
            })
          }).then(() => {
          NavigationService.navigate('App')
        })
          .catch(error => {
            console.log(error)
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

  static continueLogin(result, dispatch) {
    StorageService.setUserId(result.uid).then(async () => {
      const userId = await StorageService.getUserId()
      client.query({query: readCurrentUserQuery}).then(({error, data}) => {
        if (error) {
          dispatch(AuthActions.signInError(error))
        } else {
          dispatch(AuthActions.signInError(`Success for ${userId}, ${data.user.currentUser.firstName}`))
          NavigationService.navigate('Home')
        }
      })
    })
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