import React from 'react'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Button, Typography } from '@material-ui/core'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'

import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'
import { currencyMask } from '../../../utils/formUtils'

class UserAddFundsForm extends React.Component {
  render() {
    const {name, handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Typography variant="headline">
            {`Adding funds to ${name}`}
          </Typography>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field fullWidth name="amount" component={TextField} {...currencyMask} label="Amount"/>
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

UserAddFundsForm.propTypes = {
  ...propTypes,
  name: PropTypes.string
}

UserAddFundsForm.defaultProps = {
  name: ''
}

export default compose(
  reduxForm({
    form: 'userAddFundsForm'
  })
)(UserAddFundsForm)