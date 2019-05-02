const LOAD = 'redux-form-examples/account/LOAD'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data,
      }
    default:
      return state
  }
}

// export const load = data => ({ type: LOAD, data });

export default reducer

/*
export default reduxForm({
    form: 'Form',
        const
   const validate: values => {
    const errors = {}

    values = values.toJS()

    if (!values.first_name) {
    errors.first_name = 'First name is required.'
}

    if (!values.last_name) {
    errors.last_name = 'Last name is required.'
}

    if (!values.email) {
    errors.email = 'Email is required.'
}

    return errors
}
})(FormView)

*/