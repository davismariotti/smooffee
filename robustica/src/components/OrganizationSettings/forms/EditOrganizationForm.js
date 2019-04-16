import React, { Component } from 'react'
import { Button, Typography } from '@material-ui/core'
import { Field, propTypes, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'
import { validateIsRequired } from '../../../utils/formUtils'

class EditOrganizationForm extends Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Typography variant="headline">
            Edit Organization
          </Typography>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field fullWidth name="name" component={TextField} validate={validateIsRequired} label="Name"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Button fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow/>
        </form>
      </div>
    )
  }
}

EditOrganizationForm.propTypes = {
  ...propTypes
}

export default compose(
  reduxForm({
    form: 'editOrganizationForm'
  }),
  connect(state => ({
    enableReinitialize: true,
    initialValues: {
      name: state.organizationSettings.editOrganization && state.organizationSettings.editOrganization.name || null
    }
  }))
)
(EditOrganizationForm)
