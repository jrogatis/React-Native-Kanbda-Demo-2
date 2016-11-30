'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';


var SearchPage = require('./SearchPage');

class loginFace extends Component {
    constructor(props) {
    super(props);
    
  }
  
  
    onLocationPressed() { 
       this.props.navigator.replace({
        title: 'SEARCH',
        component: SearchPage
      });
    }

  render() {
    
    return (
   
      <View
        style={styles.container}>
        <View
          style={styles.buttonArea}>
           <TouchableHighlight
            style={[styles.button]}
             onPress={this.onLocationPressed.bind(this)} 
              underlayColor="#a9d9d4">
            <Image
            style={[styles.image]}
            source={require('./Resources/login-with-facebook.png')}
           
              />
          </TouchableHighlight>
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
    alignItems: 'center',
  },
  image: {
    width: 300,
    resizeMode: 'contain' 
  }
});

module.exports = loginFace;

/*<View
        style={styles.container}>
        <View
          style={styles.buttonArea}>
           <TouchableHighlight
              onHideUnderlay={this._onUnhighlight}
              onPress={this._handleOnPress}
              onShowUnderlay={this._onHighlight}
              style={[styles.button]}
              underlayColor="#a9d9d4">
            <Image
            style={[styles.image]}
              source={require('./Resources/login-with-facebook.png')}
              />
          </TouchableHighlight>
        </View>  
      </View>*/