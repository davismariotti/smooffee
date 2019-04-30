import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import FeedbackForms from "./forms/FeedbackForms";

export class ShareFeedback extends React.Component {
    static navigationOptions = {
       title: 'Share Feedback'
    }

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
    })

    render() {
        return (
            <View>
                <FeedbackForms/>
                <Text> add Share Feedback form here</Text>
            </View>
        )
    }
}