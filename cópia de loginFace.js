'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

var SearchPage = require('./SearchPage');

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;
      
class loginFace extends Component {
    constructor(props) {
    super(props);
  } 

  onLocationPressed() { 
      this.props.navigator.replace({
      title: 'Search Page',
      component: SearchPage
    });
  }

  render() {
    
    return (
      <View
        style={styles.container}>
        <View
          style={styles.buttonArea}>
           <View>
              <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                    this.onLocationPressed.bind(this)
                    }/>
          </View>
        </View>  
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(28, 28, 222)",
    justifyContent: 'center',
     flexDirection: 'row', 

  },
  button: {
    justifyContent: 'center',
    backgroundColor: "rgb(28, 28, 222)",
    width: 300,
  },
  buttonText: {
    margin: 5, 
  },
 
  buttonArea: {
     flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = loginFace;
