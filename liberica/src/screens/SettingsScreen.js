import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import Touchable from 'react-native-platform-touchable';
import {load as loadAccount} from './account';
import {Input} from 'react-native-elements'
import {compose} from "redux";
import {connect} from "react-redux";

const renderTextFeild = ({input: onChange, value}) => {
    return <Input
        placeholder={placeholder}
        onChangeText={onChange}
        input={value}/>
}

const data = {
    // "account information"
    firstName: 'sam',
    lastName: 'mas',
    // change password here?

};
// button type="button" onClick={() => load(data)}>Load Account</button>  we want it to already load without having the user press the button
const SettingsScreenForm = props => {
    const {handleSubmit, load} = props;
    return (
        <form onSubmit={handleSubmit}>

            <View>
                <Button type="button" onClick={() => load(data)} title="Load Account"/>
            </View>
            <View>
                <label>First Name</label>
                <View>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                    />
                </View>
            </View>
            <View>
                <label> Last Name</label>
                <View>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                    />
                </View>
            </View>
            <Button type="button" title ="Submit"/>


        </form>
    );
};

export default compose(
    reduxForm({
        form: 'initialFormState',
    }),
    connect(() => {
        return {initialValues: data}
    })
)(SettingsScreenForm)

export class AccountInfo extends React.Component {
    static navigationOptions = {
        title: 'Account Information',
    };

    render() {
        return (
            <View>
                <Text> This is account information page</Text>
            </View>
        )
    }
}

export class ChangePassword extends React.Component {
    static navigationOptions = {
        title: 'Change Password',
    };

    render() {
        return (
            <View>
                <Text> This is where you can change your password</Text>
            </View>
        )
    }
}

export class ShareFeedback extends React.Component {
    static navigationOptions = {
        title: 'Share Feedback',
    };

    render() {
        return (
            <View>
                <Text> This where users can share their feedback </Text>
            </View>
        )
    }
}

export class DeleteAccount extends React.Component {
    static navigationOptions = {
        title: 'Delete Account',
    };

    render() {
        return (
            <View>
                <Text> This where user can delete their account </Text>
            </View>
        )
    }
}

export class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    static styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 15,
        },
        optionsTitleText: {
            fontSize: 16,
            marginLeft: 15,
            marginTop: 9,
            marginBottom: 12,
        },
        optionIconContainer: {
            marginRight: 9,
        },
        option: {
            backgroundColor: '#fdfdfd',
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: '#EDEDED',
        },
        optionText: {
            fontSize: 15,
            marginTop: 1,
        },
    });

    render() {
        return (
            <View>
                <Button
                    title="Account Information"
                    onPress={() => {
                        this.props.navigation.navigate('AccountInfo')
                    }
                    }/>

                <Button
                    title="Change Password"
                    onPress={() => {
                        this.props.navigation.navigate('ChangePassword')
                    }
                    }/>
                <Button
                    title="Share Feedback"
                    onPress={() => {
                        this.props.navigation.navigate('Share Feedback')
                    }
                    }/>
                <Button
                    title="Delete Account"
                    onPress={() => {
                        this.props.navigation.navigate('DeleteAccount')
                    }
                    }/>
                <SettingsScreenForm/>
            </View>
        );
    }
}
