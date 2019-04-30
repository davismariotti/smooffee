import React from 'react'
import { Button, StyleSheet, View, FlatList, Text} from 'react-native'
import {List, ListItem, SearchBar} from 'react-native-elements'
import { AccountInfo } from './AccountInfo'
import { ChangePassword } from './ChangePassword'
import {ShareFeedback} from "./ShareFeedback";
import {ManagePayment} from "./ManagePayment";
import {DeleteAccount} from "./DeleteAccount";
import {LogOut} from "./LogOut";

export class SettingsScreen extends React.Component {
    static navigationOptions = {
    title: 'Settings'
  };

    render() {
    return (

        <View style={styles.container}>
            <FlatList

                data={[
                    {key: 'Account Information', nav: 'AccountInfo'},
                    {key: 'Change Password', nav: 'ChangePassword'},
                    {key: 'Manage Payment', nav: 'ManagePayment'},
                    {key: 'Share Feedback', nav: 'ShareFeedback'},
                    {key: 'Delete Account', nav:'DeleteAccount'},
                    {key: 'Log Out', nav: 'LogOut'}

                ]}

                renderItem={({item}) => (
                    <ListItem
                        title = {`${item.key}`}
                        containerStyle={{ borderBottomWidth: 0 }}
                        onPress={() => { this.props.navigation.navigate(item.nav)}}
                    />
                )}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
            />

          </View>
    );
  }
  /*
  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };
*/
  renderSeparator = () => {
    return (
        <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
              marginLeft: "5%",
              marginRight: "5%"
            }}
        />
    );
  };


}


const styles = StyleSheet.create({
  item: {
    padding: 10,
    height:44,
  },
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


