import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, ScrollView, StyleSheet, Text } from 'react-native'
import { Input, Item, Picker } from 'react-native-elements'


const renderTextField = ({ input: { onChange,  value } }) => {
    return <Input
      placeholder={defaultName}
      onChangeText={onChange}
      input={value}/>
  }


const renderPicker = ({defaultName, input: {onChange,value,...inputProps},children,...pickerProps}) => (
  <Picker style = {{height: 50, width: 1000}} 
    selectedValue={value}
    onValueChange= {value =>onChange(value)}
    {...inputProps}
    {...pickerProps}
  >
    {children}
  </Picker>
  )
class DeliveryForm extends Component {
    constructor(props){
        super(props)
    }
  render() {
    const { handleSubmit } = this.props
    return (
      <ScrollView>
        <Text style={styles.title}>Enter Delivery Info</Text>
        <Text style={styles.smallerText}>Name</Text>
        <Field name="name" defaultName={this.props.firstName} component={renderTextField}/>
        <Text style={styles.smallerText}>Delivery Location</Text>
        <Field name="room" defaultName="e.g. 'Rob 221'" component={renderTextField}/>
        <Text style={styles.smallerText}>Extra Notes</Text>
        <Text style={styles.smallerText}>Delivery Period</Text>
        <Field
          name="deliveryPeriod"
          mode="dropdown"
          component={renderPicker}
        >
          <Item label="1st Period" value="1"/>>
          <Item label="2nd Period" value="2"/>>
        </Field>

        <Field name="notes" defaultName='N/A' component={renderTextField}/>
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
        marginLeft:10
      },
    title: {
      fontSize:25,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 40,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 20
    }
  })
