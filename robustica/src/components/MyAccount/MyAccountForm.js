import React from 'react'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Button, Typography } from '@material-ui/core'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'
import { StyledFormRow, StyledFormRowItem } from '../styles/forms'
import { AlignCenter } from '../styles/core'
import { validateIsRequired} from '../../utils/formUtils'
import { connect } from 'react-redux'

class MyAccountForm extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }

  render() {
    const {handleSubmit, invalid, pristine} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <AlignCenter>
            <Typography variant="headline">
              Update Account Information
            </Typography>
          </AlignCenter>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{width: '300px'}} fullWidth name="firstName" validate={validateIsRequired} component={TextField} label="First Name"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{width: '300px'}} fullWidth name="lastName" validate={validateIsRequired} component={TextField} label="Last Name"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Button disabled={invalid || pristine} fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </StyledFormRowItem>
          </StyledFormRow>
        </form>
      </div>
    )
  }
}

MyAccountForm.propTypes = {
  ...propTypes,
  enableReinitialize: PropTypes.bool,
}

MyAccountForm.defaultProps = {
  enableReinitialize: true
}

export default compose(
  reduxForm({
    form: 'myAccountForm'
  })
)(MyAccountForm)
