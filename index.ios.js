'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, AppRegistry, StyleSheet} from 'react-native'

const SearchPage = require('./SearchPage');
import loginFace  from './loginFace'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class PropertyFinderApp extends Component {
  render() {
    return (
      <NavigatorIOS     
        style={styles.container}
        initialRoute={{
          title: 'Property Finder 2',
          component: loginFace,
        }}/>
    );
  }
}

AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });
