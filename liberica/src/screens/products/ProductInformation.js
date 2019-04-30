import React from 'react'
import { Button, Picker, ScrollView, StyleSheet, Text, View } from 'react-native'



export class ProdcutInformation extends React.Component {
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
  