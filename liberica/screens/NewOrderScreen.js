import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class NewOrderScreen extends React.Component {
  static navigationOptions = {
    title: 'New Order',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>New order stuff here</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
