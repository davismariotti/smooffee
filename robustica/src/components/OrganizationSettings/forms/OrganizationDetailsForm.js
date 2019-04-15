import React from 'react'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Button, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'

import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'

class OrganizationDetailsForm extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">
            Stripe Settings
          </Typography>
          <Typography variant="body1" style={{paddingTop: '8px'}}>
            These must both be present for Credit/Debit card processing.
          </Typography>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{width: '300px'}} name="stripe_pk" component={TextField} label="Publishable API Key"/>
            </StyledFormRowItem>
            <StyledFormRowItem>
              <Field style={{width: '300px'}} fullWidth name="stripe_sk" component={TextField} label="Secret API Key"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <br />
          <Typography variant="subheading">
            Other settings
          </Typography>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{width: '300px'}} fullWidth name="max_orders" component={TextField} label="Maximum orders per delivery period"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Button fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </StyledFormRowItem>
          </StyledFormRow>
        </form>
      </div>
    )
  }
}

OrganizationDetailsForm.propTypes = {
  ...propTypes,
}

export default compose(
  reduxForm({
    form: 'organizationDetailsForm'
  }),
  connect(state => ({
    enableReinitialize: true,
    initialValues: {
      stripe_sk: 'sk_test_3tvt76xb73nkuczbtk5evxwk',
      stripe_pk: 'pk_test_fgskb3ibyfly83yvfbink37B'
    }
  }))
)(OrganizationDetailsForm)