import React from 'react'
import {connect} from 'react-redux'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Button, Typography} from '@material-ui/core'
import {compose} from 'redux'
import * as PropTypes from 'prop-types'
import {TextField} from 'redux-form-material-ui'

class EditProductForm extends React.Component {
  render() {
    const {editProduct, handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Typography variant="headline">
            {editProduct ? 'Edit' : 'Create'} Product
          </Typography>
          <Field fullWidth name="name" component={TextField} label="Name"/>
          <Field fullWidth name="description" component={TextField} label="Description"/>
          <Field fullWidth name="price" component={TextField} label="Price"/>
          <Field fullWidth name="status" component={TextField} label="Status"/>
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

EditProductForm.propTypes = {
  ...propTypes,
  editProduct: PropTypes.bool.isRequired
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    initialValues: organizationSettings.editProductObject,
    enableReinitialize: true,
  }
}

export default compose(
  reduxForm({
    form: 'editProductForm'
  }),
  connect(
    mapStateToProps,
  ))(EditProductForm)
