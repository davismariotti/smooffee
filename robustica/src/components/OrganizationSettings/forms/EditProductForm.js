import React from 'react'
import { connect } from 'react-redux'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Button, Typography } from '@material-ui/core'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'
import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'
import { currencyMask } from '../../../utils/formUtils'

class EditProductForm extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }

  render() {
    const {editProduct, handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Typography variant="headline">
            {editProduct ? 'Edit' : 'Create'} Product
          </Typography>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field fullWidth name="name" component={TextField} label="Name"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field fullWidth name="description" component={TextField} label="Description"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field fullWidth name="price" component={TextField} {...currencyMask} label="Price"/>
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

EditProductForm.propTypes = {
  ...propTypes,
  editProduct: PropTypes.bool.isRequired
}

export default compose(
  reduxForm({
    form: 'editProductForm'
  }),
  connect(state => ({
    enableReinitialize: true,
    initialValues: state.organizationSettings.editProductObject && state.organizationSettings.editProductObject.product || null
  }))
)(EditProductForm)
