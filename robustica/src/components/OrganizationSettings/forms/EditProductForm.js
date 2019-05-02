import React from 'react'
import { connect } from 'react-redux'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Button, Chip, MenuItem, Select, Typography } from '@material-ui/core'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { currencyMask, validateIsRequired } from '../../../utils/formUtils'
import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const renderOrderModifiers = props => {
  const { availableOrderModifiers, input: { onChange, value }, label } = props
  return (
    <div>
      <FormControl style={{width: 300}}>
        <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
        <Select
          multiple
          value={value || []}
          onChange={event => onChange(event.target.value)}
          input={<Input id="select-multiple-chip"/>}
          renderValue={selected => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map(val => (
                <Chip key={val} label={availableOrderModifiers.filter(orderModifier => orderModifier.id === val)[0].name}/>
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {availableOrderModifiers.map(orderModifier => (
            <MenuItem key={orderModifier.id} value={orderModifier.id}>
              {orderModifier.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}


class EditProductForm extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }

  render() {
    const { editProduct, handleSubmit, invalid, pristine, availableOrderModifiers } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Typography variant="headline">
            {editProduct ? 'Edit' : 'Create'} Product
          </Typography>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{ width: '300px' }} fullWidth name="name" component={TextField} validate={validateIsRequired} label="Name"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{ width: '300px' }} fullWidth name="description" component={TextField} validate={validateIsRequired} label="Description"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{ width: '300px' }} fullWidth name="price" component={TextField} {...currencyMask} validate={validateIsRequired} label="Price"/>
            </StyledFormRowItem>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormRowItem>
              <Field style={{ width: '300px' }} fullWidth name="orderModifiers" component={renderOrderModifiers} label="Choose order modifiers" availableOrderModifiers={availableOrderModifiers} />
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

EditProductForm.propTypes = {
  ...propTypes,
  editProduct: PropTypes.bool.isRequired,
  availableOrderModifiers: PropTypes.array
}

EditProductForm.defaultProps = {
  availableOrderModifiers: []
}

export default compose(
  withStyles(styles, { withTheme: true }),
  reduxForm({
    form: 'editProductForm'
  }),
  connect(state => {
    let returnObj = null
    const obj = state.organizationSettings.editProductObject && state.organizationSettings.editProductObject.product ? state.organizationSettings.editProductObject.product : null
    if (obj) {
      returnObj = obj
      returnObj.orderModifiers = state.organizationSettings.editProductObject.orderModifiers.map(orderModifier => orderModifier.id)
    }
    return {
      enableReinitialize: true,
      initialValues: returnObj
    }
  })
)(EditProductForm)
