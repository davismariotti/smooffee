import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Badge, Icon, Picker } from 'native-base'
import { compose } from 'redux'
import { Field, getFormValues, reduxForm } from 'redux-form'
import MultiSelect from 'react-native-multiple-select'
import { validateIsRequired } from '../../utils/formUtils'
import { connect } from 'react-redux'

const renderPicker = ({label,  input: { onChange, value } }) => {
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
      <Picker.Item label="Small" value="Small"/>
      <Picker.Item label="Medium" value="Medium"/>
      <Picker.Item label="Large" value="Large"/>
    </Picker>
  )
}

const renderMultiselect = ({ product, input: { onChange, value } }) => {
  return (
    <View>
      <MultiSelect
        hideTags
        items={product.orderModifiers.map(orderModifier => { return { id: orderModifier.id.toString(), name: orderModifier.name } })}
        uniqueKey="id"
        onSelectedItemsChange={values => {
          const mappedValues = values.map(value => parseInt(value, 10))
          onChange(mappedValues)
        }}
        selectedItems={value || []}
        selectText="Select order modifiers (optional)"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Close"
      />
      {value && product.orderModifiers.filter(orderModifier => value.includes(orderModifier.id)).map(orderModifier => (
        <Badge key={orderModifier.id} style={{ backgroundColor: 'grey', margin: 3 }}>
          <Text style={{ color: 'black' }}>{orderModifier.name}</Text>
        </Badge>
      )) || null}
    </View>
  )
}

class ProductOptions extends React.Component {
  static navigationOptions = {
    title: 'Options'
  }

  render() {
    const { navigation, orderForm } = this.props
    const product = navigation.getParam('product', {})

    // const disabled = orderForm && orderForm.size

    return (
      <View style={styles.container}>
        <Text style={styles.drinkText}>{product.name}</Text>
        <Text>Choose Size</Text>
        <Field name="size" label="Choose a size" component={renderPicker} validate={validateIsRequired}/>
        <Field name="orderModifiers" component={renderMultiselect} product={product}/>
        <Button
          title="Next"
          disabled={!(orderForm && orderForm.size)}
          onPress={() => {
            this.props.navigation.navigate('ProductInformation', { product })
          }}
        />
      </View>
    )
  }
}

export default compose(
  reduxForm({
    form: 'orderForm'
  }),
  connect(state => ({
    orderForm: getFormValues('orderForm')(state),
  }))
)(ProductOptions)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})