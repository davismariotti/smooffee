import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import {Field, propTypes, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import {compose} from 'redux'
import {connect} from 'react-redux'

import AuthMiddleware from '../AuthMiddleware'

class EmailPasswordSignUp extends Component {
  render() {
    const {handleSubmit, createUserWithEmailAndPassword} = this.props

    const submit = ({email, password}) => {
      createUserWithEmailAndPassword(email, password)
    }

    return (
      <form onSubmit={handleSubmit(submit)}>
        <Field fullWidth name="email" component={TextField} label="Email Address"/>
        <Field fullWidth name="password" component={TextField} label="Password"/>
        <Button type="submit" fullWidth variant="contained">Submit</Button>
      </form>
    )
  }
}

EmailPasswordSignUp.propTypes = {
  ...propTypes,
}

const mapDispatchToProps = dispatch => {
  return {
    createUserWithEmailAndPassword: (email, password) => AuthMiddleware.createUserWithEmailAndPassword(email, password)(dispatch)
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'emailPasswordSignUp'
  })
)
(EmailPasswordSignUp)