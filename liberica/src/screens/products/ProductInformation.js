import React from 'react'
import { Button, ScrollView, Text } from 'react-native'


export default class ProductInformation extends React.Component {
  static navigationOptions = {
    title: 'Information'
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Finalize Order with notes, location, and delivery time</Text>
        <Button
          title="Submit"
          onPress={() => {
            this.props.navigation.navigate('Products')
          }}
        />
      </ScrollView>
    )
  }
}
  