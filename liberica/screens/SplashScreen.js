import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';


export default class SplashScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };
  
    render() {
      return (
        <View >
              <Image style={styles.logoImage}
                source={require('../assets/images/Logo.png')}
              />
        </View>
      );
    }
}
  
const styles = StyleSheet.create({
    
    logoImage: {
      width: 200,
      height: 160,
      resizeMode: 'contain',
      marginTop: 300,
      marginLeft: 90,
    }})