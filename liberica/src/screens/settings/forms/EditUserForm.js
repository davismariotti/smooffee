import { Input } from 'react-native-elements'
import { Button, Text, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import React from 'react'

const renderTextField = ({placeholder, input: onChange, value}) => {
  return <Input
    placeholder={placeholder}
    onChangeText={onChange}
    input={value}/>
}

const EditUserForm = props => {
  const {handleSubmit} = props
  // <View>
  // <Button type="button" onPress={() => load(data)} title="Load Account"/>
  //   </View>
  return (
    <View>
      <View>
        <Text>First Name</Text>
        <View>
          <Field
            name="firstName"
            component={renderTextField}
            placeholder="First Name"
          />
        </View>
      </View>
      <View>
        <Text> Last Name</Text>
        <View>
          <Field
            name="lastName"
            component={renderTextField}
            placeholder="Last Name"
          />
        </View>
      </View>
      <Button type="button" title="Submit" onPress={handleSubmit}/>
    </View>
  )
}

export default compose(
  reduxForm({
    form: 'settings',
  }),
  // connect(() => {
  //   return {initialValues: data}
  // })
)(EditUserForm)