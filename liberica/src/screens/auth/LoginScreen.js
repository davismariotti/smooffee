import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'

//Login Screen is what users first see when App starts. Navigation from here is as follows:
//
//Login
//  ->Home(if correct login)
//  ->Forgot Password
//    ->Back to login
//  ->New User
//    ->Back to login
//    ->user confimation(email sent to confirm)
//      ->back to login

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'LoginScreen',
    header: null,
  }

  render() {

    const { authError } = this.props

    return (
      <View>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Login</Text>
        </View>
        <LoginForm/>

        {authError && <Text>{authError}</Text>}
        <Button title="New User"
                onPress={() => {
                  this.props.navigation.navigate('NewUserScreen')
                }}/>
        <Button title="Forgot Password"
                onPress={() => {
                  this.props.navigation.navigate('ForgotPasswordScreen')
                }}/>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 50,
    textAlign: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = ({ auth }) => {
  return {
    authError: auth.authError
  }
}

export default connect(mapStateToProps)(LoginScreen)

