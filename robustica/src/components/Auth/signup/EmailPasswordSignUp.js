import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Field, propTypes, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { compose } from 'redux'
import { connect } from 'react-redux'

import AuthMiddleware from '../AuthMiddleware'
import { validateIsRequired } from '../../../utils/formUtils'
import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'

class EmailPasswordSignUp extends Component {
  render() {
    const {handleSubmit, createUserWithEmailAndPassword, invalid, pristine} = this.props

    const submit = ({email, password}) => {
      createUserWithEmailAndPassword(email, password)
    }

    return (
      <form onSubmit={handleSubmit(submit)}>
        <StyledFormRow>
          <StyledFormRowItem>
            <Field fullWidth name="email" type="email" component={TextField} validate={validateIsRequired} label="Email Address"/>
          </StyledFormRowItem>
        </StyledFormRow>
        <StyledFormRow>
          <StyledFormRowItem>
            <Field fullWidth name="password" type="password" component={TextField} validate={validateIsRequired} label="Password"/>
          </StyledFormRowItem>
        </StyledFormRow>
        <StyledFormRow>
          <StyledFormRowItem>
            <Button disabled={invalid || pristine} fullWidth type="submit" variant="contained">Submit</Button>
          </StyledFormRowItem>
        </StyledFormRow>
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
)(EmailPasswordSignUp)