import Immutable from 'seamless-immutable'

const initialState = Immutable({
})

export default {
  auth: {
    initialState,
    reducer(state = initialState, action) {
      switch (action.type) {

        default:
          return {
            ...state
          }
      }
    }
  }
}