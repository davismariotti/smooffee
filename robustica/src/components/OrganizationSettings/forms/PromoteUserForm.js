import React from 'react'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Button, MenuItem, Typography } from '@material-ui/core'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { Select } from 'redux-form-material-ui'

import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'
import { validateIsRequired } from '../../../utils/formUtils'
import { ADMIN, CUSTOMER, EMPLOYEE, roles, SUPERVISOR } from '../../../utils/role'

const rolesMap = [
  {
    value: ADMIN,
    name: roles.admin
  },
  {
    value: SUPERVISOR,
    name: roles.supervisor
  },
  {
    value: EMPLOYEE,
    name: roles.employee
  },
  {
    value: CUSTOMER,
    name: roles.customer
  }
]

class PromoteUserForm extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }

  render() {

    const { name, handleSubmit, invalid, pristine } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Typography variant="headline">
            {`Change role for ${name}`}
          </Typography>
          <StyledFormRow>
            <Field fullWidth name="role" component={Select} validate={validateIsRequired} label="Choose a role">
              {
                rolesMap.map(role => {
                  return <MenuItem key={role.value} value={role.value}>{role.name}</MenuItem>
                })
              }
            </Field>
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

PromoteUserForm.propTypes = {
  ...propTypes,
  name: PropTypes.string
}

PromoteUserForm.defaultProps = {
  name: ''
}

export default compose(
  reduxForm({
    form: 'promoteUserForm'
  })
)(PromoteUserForm)
