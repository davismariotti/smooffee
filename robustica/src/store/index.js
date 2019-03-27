import {combineReducers, createStore} from 'redux'
import homeReducer from '../components/Home/reducer'

const reducerList = [
  homeReducer
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

export default function createNewStore() {
  return createStore(
    combineReducers(reducers()),
    initialState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
