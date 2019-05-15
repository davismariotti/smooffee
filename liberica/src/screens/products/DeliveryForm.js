import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Picker, ScrollView, StyleSheet, Text } from 'react-native'
import { Input } from 'react-native-elements'


const renderTextField = ({ placeholder, input: { onChange, value } }) => {
  return <Input
    placeholder={placeholder}
    onChangeText={onChange}
    input={value}/>
}


// const renderPicker = ({ defaultName, input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
//   <Picker style={{ height: 50, width: 1000 }}
//           selectedValue={value}
//           onValueChange={value => onChange(value)}
//           {...inputProps}
//           {...pickerProps}
//   >
//     {children}
//   </Picker>
// )


class DeliveryForm extends Component {
  constructor(props) {
    super(props)
    this.renderPickerField = this.renderPickerField.bind(this)
  }

  renderPickerField({ input: { onChange, value } }) {
    return (
      <Picker selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
        <Picker.Item label="1" key={1} value={'1'}/>
      </Picker>
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <ScrollView>
        <Text style={styles.title}>Enter Delivery Info</Text>
        <Text style={styles.smallerText}>Name</Text>
        <Field name="name" placeholder={this.props.firstName} component={renderTextField}/>
        <Text style={styles.smallerText}>Delivery Location</Text>
        <Field name="room" placeholder="e.g. 'Rob 221'" component={renderTextField}/>
        <Text style={styles.smallerText}>Extra Notes</Text>
        <Text style={styles.smallerText}>Delivery Period</Text>
        <Field name="deliveryPeriod" component={this.renderPickerField}/>
        <Field name="notes" placeholder='N/A' component={renderTextField}/>
        <Button title="Submit" onPress={handleSubmit}/>
      </ScrollView>
    )
  }
}

export default reduxForm({
  form: 'deliveryForm'
})(DeliveryForm)


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
    marginBottom: 20
  }
})
