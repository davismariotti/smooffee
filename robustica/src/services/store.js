import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import homeReducer from '../components/Home/reducer'
import organizationSettingsReducer from '../components/OrganizationSettings/reducer'
import authReducer from '../components/Auth/reducer'
import navbarReducer from '../components/Navbar/reducer'
import myAccountReducer from '../components/MyAccount/reducer'
import userPageReducer from '../components/UserPage/reducer'

const reducerList = [
  homeReducer,
  organizationSettingsReducer,
  authReducer,
  navbarReducer,
  myAccountReducer,
  userPageReducer
]

function reducers() {
  return Object.assign({}, ...[].concat(...reducerList.map(reducer => {
    return Object.keys(reducer).map(key => {
      return {
        [key]: reducer[key].reducer
      }
    })
  })))
}

function initialState() {
  const lst = Object.assign({}, ...[].concat(...reducerList.map(reducer => {
    return Object.keys(reducer).map(key => {
      return {
        [key]: reducer[key].initialState
      }
    })
  })))

  return Object.assign({}, ...Object.keys(lst).map(key => ({
    [key]: lst[key]
  })))
}

export default function createNewStore(history) {
  const hasDevTools = !!window.__REDUX_DEVTOOLS_EXTENSION__
  const middleWare = hasDevTools ? compose(applyMiddleware(routerMiddleware(history)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) : applyMiddleware(routerMiddleware(history))

  return createStore(
    combineReducers({
      ...reducers(),
      form: formReducer,
      router: connectRouter(history)
    }),
    initialState(),
    middleWare
  )
}
