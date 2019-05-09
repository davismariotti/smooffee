import React from 'react'
import { connect } from 'react-redux'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Button, Typography } from '@material-ui/core'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'
import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'
import { AlignCenter } from '../../styles/core'
import { currencyMask, validateIsRequired } from '../../../utils/formUtils'

class OrderModifierForm extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }

  render() {
    const { editProduct, handleSubmit, invalid, pristine } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <AlignCenter>
            <Typography variant="headline">
              {editProduct ? 'Edit' : 'Create'} Order Modifier
            </Typography>
          </AlignCenter>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{ width: '300px' }} fullWidth name="name" helperText="e.g. Caramel Sauce" validate={validateIsRequired} component={TextField}
                     label="Name"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field fullWidth name="additionalCost" component={TextField} {...currencyMask} validate={validateIsRequired} abel="Additional Cost" helperText="e.g. $1.50"/>
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

OrderModifierForm.propTypes = {
  ...propTypes,
  editOrderModifier: PropTypes.bool.isRequired
}

export default compose(
  reduxForm({
    form: 'editorderModifierForm'
  }),
  connect(state => ({
    enableReinitialize: true,
    initialValues: (state.organizationSettings.editOrderModifierObject && state.organizationSettings.editOrderModifierObject.orderModifier) || null
  }))
)(OrderModifierForm)
