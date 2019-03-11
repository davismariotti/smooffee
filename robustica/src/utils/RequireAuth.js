import firebaseApp from '../services/AuthService'

export default (nextState, replace) => {
  const user = firebaseApp.auth().currentUser
  if (!user) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
