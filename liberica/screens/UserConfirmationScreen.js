import React from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import LoginForm from '../components/LoginForm'

export default class UserConfirmationScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        header: null,
    }

    render() {
        return (
            <View>
                <Text>Email has been sent. Please follow instructions from there.</Text>
                <Button title="Back to Login"
                    onPress={() => {
                        this.props.navigation.navigate('LoginScreen')
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

