import React from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import LoginForm from '../components/LoginForm'

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

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'LoginScreen',
    header: null,
  }

  render() {
    return (
      <View>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.image}
        />
        <Text style={styles.title}> Login</Text>
        <LoginForm />

        <Button title="New User"
          onPress={() => {
            this.props.navigation.navigate('NewUserScreen')
          }} />
        <Button title="Forgot Password"
          onPress={() => {
            this.props.navigation.navigate('ForgotPasswordScreen')
          }} />
      </View>
    )
  }


};

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

