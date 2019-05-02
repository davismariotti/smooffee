import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import homeReducer from '../components/Home/reducer'
import organizationSettingsReducer from '../components/OrganizationSettings/reducer'
import authReducer from '../components/Auth/reducer'
import navbarReducer from '../components/Navbar/reducer'
import myAccountReducer from '../components/MyAccount/reducer'
import userPageReducer from '../components/UserPage/reducer'
import OrganizationSettingsActions from '../components/OrganizationSettings/actions'

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

  const actionSanitizer = (action) => {
    if (action.type === OrganizationSettingsActions.OPEN_PRODUCT_MENU && action.payload) {
      return { ...action, payload: '<<LONG_BLOB>>' }
    }
    return action
  }

  const stateSanitizer = (state) => {
    let newState = state.organizationSettings.productMenu ? { ...state, organizationSettings: { ...state.organizationSettings, productMenu: '<<LONG_BLOB>>' } } : state
    newState = newState.organizationSettings.productMenuObject ? { ...newState, organizationSettings: { ...newState.organizationSettings, productMenuObject: '<<LONG_BLOB>>' } } : newState
    return newState
  }

  const middleWare = hasDevTools ? compose(applyMiddleware(routerMiddleware(history)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    actionSanitizer,
    stateSanitizer
  })) : applyMiddleware(routerMiddleware(history))

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
