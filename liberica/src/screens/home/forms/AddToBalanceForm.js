import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Picker, View } from 'react-native'
import { Input } from 'react-native-elements'
import { currencyMask, validateIsRequired } from '../../../utils/formUtils'


// leftIcon={{ type: 'font-awesome', name: 'envelope' }}

const renderAmountField = ({ input: { onChange, value } }) => {
  return <Input
    placeholder='Amount'
    onChangeText={onChange}
    input={value}/>
}

class AddToBalanceForm extends Component {
  constructor(props) {
    super(props)
    this.renderPickerField = this.renderPickerField.bind(this)
  }

  renderPickerField({ input: { onChange, value } }) {
    const { cards } = this.props
    return (
      <Picker selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
        {cards.map(card => (
          <Picker.Item key={card.stripeCardId} label={`${card.brand} **** **** **** ${card.last4}`} value={card.stripeCardId}/>
        ))}
      </Picker>
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <View>
        <Field name="amount" {...currencyMask} validate={validateIsRequired} component={renderAmountField}/>
        <Field name="stripeCardId" validate={validateIsRequired} component={this.renderPickerField}/>
        <Button title="Add Funds" onPress={handleSubmit}/>
      </View>
    )
  }
}

export default reduxForm({
  form: 'addToBalanceForm'
})(AddToBalanceForm)
