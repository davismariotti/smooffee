import React from 'react';
import { ScrollView,
   StyleSheet,
   Text,
   Button,
   CheckBox,
  View } from 'react-native';

import {createStackNavigator,createAppContainer} from 'react-navigation'





class Order extends React.Component{
  static navigationOptions = {
    title: 'Order'
  };
  render() {
    return(
      <ScrollView style={styles.container}>
        <Button
         title="Smoothee"
         onPress={() => {
           this.props.navigation.navigate('Options', {itemId:1,item:'Smoothee',
          });
         }}/>
        <Button
         title="Drip Coffee"
         onPress={() => {
           this.props.navigation.navigate('Options', {itemId:2,item:'Drip coffee',
          });
         }}/>
      </ScrollView>
    )
  }
}

class Options extends React.Component{
  static navigationOptions = {
    title: 'Options'
  };
  render() {
    const{navigation} = this.props
    const itemId = navigation.getParam('itemId', 'NO-ID')
    const drinkOrdered = navigation.getParam('item','error')
    return(
      <View style={styles.container}>
        <Text>{drinkOrdered}</Text>
        <View style={styles.sectionContainer}>
          <Text>Choose Size</Text>
          <CheckBox
            title='Small'
            size='medium'
            iconRight
            />
              <CheckBox
            title='Medium'
            />
              <CheckBox
            title='Large'
            />
        </View>
        <View style={styles.sectionContainer}>
          <Text>Choose Flavor</Text>
          <CheckBox
            title='Small'
            size='medium'
            iconRight
            />
              <CheckBox
            title='Medium'
            />
              <CheckBox
            title='Large'
            />
        </View>
        <Button
         title="Next"
         onPress={() => {
           this.props.navigation.navigate('Information', {itemId:1,item:'drip coffee',
          });
         }}/>
      </View>
    )
  }
}

class Information extends React.Component{
  static navigationOptions = {
    title: 'Information'
  };
  render() {
    return(
      <ScrollView style={styles.container}>
        <Text>Finalize Order with notes, location, and delivery time</Text>
        <Button
         title="Submit"
         onPress={() => {
           this.props.navigation.navigate('Order', {itemId:1,item:'drip coffee',
          });
         }}/>
      </ScrollView>
    )
  }
}


const OrderStack = createStackNavigator(
  {
    Order: Order,
    Options: Options,
    Information: Information
  }
)

const OrderContainer = createAppContainer(OrderStack)

export default class NewOrderScreen extends React.Component {
  static navigationOptions = { //dont show a header
    header: null,
  };
  render() {
    return (
      <OrderContainer style={styles.container}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    fontSize: 20,
    color:'green',
    textAlign:'left',
    lineHeight:30,
  }
});
