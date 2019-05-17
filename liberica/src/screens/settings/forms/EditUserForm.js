import { Input } from 'react-native-elements'
import { Button, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import React, { Component } from 'react'
import { validateIsRequired } from '../../../utils/formUtils'
import { connect } from 'react-redux'

const renderTextField = ({ placeholder, label, input: { onChange, value }, meta: { error } }) => {
  return <Input
    label={label}
    placeholder={placeholder}
    onChangeText={onChange}
    value={value}
    errorMessage={error}
  />
}

class EditUserForm extends Component {
  render() {
    const { handleSubmit, invalid, pristine } = this.props
    return (
      <View>
        <Field name="firstName" placeholder='John' component={renderTextField} validate={validateIsRequired} label="First Name"/>
        <Field name="lastName" placeholder='Smith' component={renderTextField} validate={validateIsRequired} label="Last Name"/>
        <Button type="button" title="Submit" disabled={invalid || pristine} onPress={handleSubmit}/>
      </View>
    )
  }
}

export default compose(
  connect((state, ownProps) => {
    return {
      initialValues: { firstName: ownProps.currentUser.firstName, lastName: ownProps.currentUser.lastName }
    }
  }),
  reduxForm({
    form: 'editUserForm',
    enableReinitialize: true
  })
)(EditUserForm)