import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AuthMiddleware from './middleware/AuthMiddleware'
import { connect } from 'react-redux'
import SignupForm from './components/SignupForm'

class NewUserScreen extends React.Component {
  static navigationOptions = {
    title: 'New User Screen',
    header: null
  }

  render() {
    const { createUserWithEmailAndPassword } = this.props
    const submit = ({ email, password, firstName, lastName }) => {
      createUserWithEmailAndPassword(email, password, firstName, lastName)
    }
    return (
      <View>
        <Text style={styles.title}>Create Account</Text>
        <SignupForm onSubmit={submit}/>
        <Button
          title="Already Have an Account?"
          onPress={() => {
            this.props.navigation.navigate('LoginScreen')
          }}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUserWithEmailAndPassword: (email, password, firstName, lastName) =>
      AuthMiddleware.createUserWithEmailAndPassword(email, password, firstName, lastName)(dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewUserScreen)
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 30,
    marginLeft: 110
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 50,
    textAlign: 'center'
  }
})
