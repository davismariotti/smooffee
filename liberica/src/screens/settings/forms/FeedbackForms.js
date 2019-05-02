import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { FormInput, FormLabel, FormValidationMessage } from 'react-native-elements'


export default class FeedbackForms extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: 'Placeholder' }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>"What are your thoughts about this app? What improvements do we need to implement?
          Let us know below"</Text>
        <TextInput
          style={{ height: 70, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
})