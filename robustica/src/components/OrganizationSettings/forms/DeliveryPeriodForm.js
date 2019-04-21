import React from 'react'
import { connect } from 'react-redux'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Button, Typography } from '@material-ui/core'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'
import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'
import { AlignCenter } from '../../styles/core'
import { validateIsRequired, validateMustBeInteger } from '../../../utils/formUtils'

const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

class DeliveryPeriodForm extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }

  render() {
    const {editProduct, handleSubmit, invalid, pristine} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <AlignCenter>
            <Typography variant="headline">
              {editProduct ? 'Edit' : 'Create'} Delivery Period
            </Typography>
          </AlignCenter>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{width: '300px'}} fullWidth name="classPeriod" helperText="e.g. The period number" validate={[validateIsRequired, validateMustBeInteger]} component={TextField} label="Class Period"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <AlignCenter>
            <Typography variant="headline">
              Times
            </Typography>
            <Typography variant="subheading">
              Leave a time blank if there is no class.
            </Typography>
          </AlignCenter>
          {daysOfTheWeek.map(day => {
            return (
              <StyledFormRow>
                <StyledFormRowItem>
                  <Field style={{width: '300px'}} fullWidth name={day.toLowerCase()} helperText="e.g. 8:00a-8:55a" component={TextField} label={day}/>
                </StyledFormRowItem>
              </StyledFormRow>
            )
          })}
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{width: '300px'}} fullWidth name="maxQueueSize" helperText="Set to 0 for unlimited" validate={validateIsRequired} component={TextField} label="Max Queue Size" />
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

DeliveryPeriodForm.propTypes = {
  ...propTypes,
  editDeliveryPeriod: PropTypes.bool.isRequired
}

export default compose(
  reduxForm({
    form: 'editdeliveryPeriodForm'
  }),
  connect(state => ({
    enableReinitialize: true,
    initialValues: (state.organizationSettings.editDeliveryPeriodObject && state.organizationSettings.editDeliveryPeriodObject.deliveryPeriod) || null
  }))
)(DeliveryPeriodForm)
