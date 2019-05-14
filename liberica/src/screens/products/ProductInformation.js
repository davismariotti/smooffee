import React from 'react'
import { Button, ScrollView, StyleSheet, Text } from 'react-native'
import { graphql } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Input } from 'react-native-elements'
import { readCurrentUserQuery } from '../../graphql/userQueries'
import { createOrderMutation } from '../../graphql/orderQueries'
import { StorageService } from '../../services/StorageService'

const renderTextField = ({defaultName , input: { onChange,  value } }) => {
  return <Input
    placeholder={defaultName}
    onChangeText={onChange}
    input={value}/>
}
class ProductInformation extends React.Component {
  static navigationOptions = {
    title: 'Information'
  }

  render() {
    const { navigation, readCurrentUserQueryResult, createOrderMutate } = this.props
    const product = navigation.getParam('product', {})
    const balance = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.balance)
    const firstName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.firstName) || ''
    const lastName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.lastName) || ''

    const submit = async () => {
      createOrderMutate({
        variables: {
          userId: await StorageService.getUserId(),
          orderInput: {
            location: 'EJ308', // TODO
            notes: 'Optional', // TODO
            productId: product.id,
            recipient: firstName + " " + lastName,
            deliveryPeriodId: 2, // TODO
            orderModifiers: this.props.selectedOrderModifiers
          }
        }
      }).then(() => {
        this.props.navigation.navigate('Home')
      })
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Enter Delivery Info</Text>
        <Text>Name</Text>
        <Field name="name" defaultName={firstName} component={renderTextField}/>
        <Text>Delivery Location</Text>
        <Field name="room" defaultName="e.g. 'Rob 221'" component={renderTextField}/>
        <Text>{product.name}</Text>
        <Text>{this.props.selectedSize}</Text>
        <Text>{this.props.selectedOrderModifiers}</Text>
        <Button
          title="Submit"
          onPress={submit}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ order }) => {
  return {
    selectedSize: order.size,
    selectedOrderModifiers: order.orderModifiers
  }
}


export default compose(
  reduxForm({
    form:'nameWithOrder'
  }),
  graphql(readCurrentUserQuery, {
    name: 'readCurrentUserQueryResult'
  }),
  graphql(createOrderMutation, {
    name: 'createOrderMutate'
  }),
  connect(mapStateToProps),
)(ProductInformation)


const styles = StyleSheet.create({
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
  title: {
    fontSize:20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 40,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20
  }
})