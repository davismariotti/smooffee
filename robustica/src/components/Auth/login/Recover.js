import React, { Component } from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { Field, propTypes, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { Alert } from 'reactstrap'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MainCenterDiv} from '../../styles/core'

import AuthMiddleware from '../AuthMiddleware'
import { StyledFormRow } from '../../styles/forms'

class Recover extends Component {
  render() {

    const {handleSubmit, recoverWithEmail, recoverResponse} = this.props

    const submit = ({email}) => {
      recoverWithEmail(email)
    }

    return (
      <main>
        <MainCenterDiv>
          <Paper className="centerSquare">
            <Typography component="h6" variant="h5" align="center">
              Forgot password
            </Typography>
            <form onSubmit={handleSubmit(submit)}>
              <StyledFormRow>
                <Alert hidden={!recoverResponse} color={(recoverResponse && recoverResponse.color) || 'success'}>{(recoverResponse && recoverResponse.message) || ''}</Alert>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth name="email" autoComplete="email" type="email" component={TextField} label="Email"/>
              </StyledFormRow>
              <Button type="submit" fullWidth variant="contained">Submit</Button>
            </form>
          </Paper>
        </MainCenterDiv>
      </main>
    )
  }
}

Recover.propTypes = {
  ...propTypes,
  recoverResponse: PropTypes.shape({
    message: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  recoverWithEmail: PropTypes.func.isRequired
}

const mapStateToProps = ({auth}) => {
  return {
    recoverResponse: auth.recoverResponse
  }
}

const mapDispatchToProps = dispatch => {
  return {
    recoverWithEmail: (email) => AuthMiddleware.recoverWithEmail(email)(dispatch)
  }
}

export default compose(
  reduxForm({
      form: 'recoverForm'
    }
  ),
  connect(mapStateToProps, mapDispatchToProps)
)(Recover)
