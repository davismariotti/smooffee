import React from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import LoginForm from '../components/LoginForm'

export default class NewUserScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        header: null,
    }

    render() {
        return (
            <View>

                <Text style={styles.title}>Create Account</Text>
                <Text>TODO: Add form to create new user account</Text>

                <Button title="Already Have an Account?"
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

