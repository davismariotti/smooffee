import isEmail from 'validator/lib/isEmail'
import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import * as PropTypes from 'prop-types'
import {Field, propTypes, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import firebaseApp from '../../../services/AuthService'

export class EmailPasswordSignUp extends Component {
  constructor(props) {
    super(props)
    this.handleValues = this.handleValues.bind(this)
  }

  handleValues = values => {
    console.log(values)
    const {callback} = this.props
    const {email, password} = this.state
    if (isEmail(email)) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((result) => {
          callback(result)
        })
        .catch(error => {
          const errorMessage = error.message
          alert(`errorMessage: ${errorMessage}`)
        })
    } else {
      alert('Email Address in not valid')
    }
  }

  render() {
    const {handleSubmit} = this.props
    console.log('this.props', this.props)
    return (
      <form onSubmit={handleSubmit(this.handleValues)}>
        <Field fullWidth name="email" component={TextField} label="Email Address"/>
        <Field fullWidth name="password" component={TextField} label="Password"/>
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </form>
    )
  }
}

EmailPasswordSignUp.propTypes = {
  ...propTypes,
  callback: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'emailPasswordSignUpForm'
})(EmailPasswordSignUp)