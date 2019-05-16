import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, ScrollView, StyleSheet, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { compose } from 'react-apollo'
import { validateIsRequired } from '../../utils/formUtils'
import { Icon, Picker } from 'native-base'


const renderTextField = ({ placeholder, label, input: { onChange, value }, meta: { error } }) => {
  return <Input
    label={label}
    placeholder={placeholder}
    onChangeText={onChange}
    input={value}
    errorMessage={error}
  />
}

const renderPicker = ({ label, deliveryPeriods, input: { onChange, value } }) => {
  return (
    <Picker
      note
      mode="dropdown"
      placeholder={label}
      iosIcon={<Icon name="arrow-down"/>}
      style={{ width: 120 }}
      selectedValue={value}
      onValueChange={onChange}
    >
      {deliveryPeriods.map(deliveryPeriod => (
        <Picker.Item key={deliveryPeriod.id} label={`${deliveryPeriod.classPeriod.toString()} - ${deliveryPeriod.monday}`} value={deliveryPeriod.id}/>
      ))}
    </Picker>
  )
}

class DeliveryForm extends Component {

  render() {
    const { handleSubmit, deliveryPeriods } = this.props
    return (
      <ScrollView>
        <Text style={styles.title}>Enter Delivery Info</Text>
        <Field name="name" placeholder={this.props.firstName} component={renderTextField} label="Name" validate={validateIsRequired}/>
        <Field name="room" placeholder="e.g. 'Rob 221'" component={renderTextField} label="Delivery Location" validate={validateIsRequired}/>
        <Field name="deliveryPeriod" label="Choose a delivery period" component={renderPicker} validate={validateIsRequired} deliveryPeriods={deliveryPeriods}/>
        <Field name="notes" placeholder='N/A' component={renderTextField} label="Notes"/>
        <Button title="Submit" onPress={handleSubmit}/>
      </ScrollView>
    )
  }
}

export default compose(
  reduxForm({
    form: 'orderForm'
  })
)(DeliveryForm)

const styles = StyleSheet.create({
  smallerText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'left',
    marginLeft: 10
  },
  title: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 40,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
})
