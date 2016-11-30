'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  TextInput,
  Picker
} from 'react-native';

var PropertyView = require('./PropertyView');



class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: '',
      searchDescString: '',
      priceOrder: 'low'
    };
    console.log(this.props.listings)
  }

  componentWillMount() { 
       var dataSource = new ListView.DataSource(
         { rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url });
         
   this.setState({ dataSource: dataSource.cloneWithRows(this._orderByPrice(this.props.listings))});
  }
  
  renderRow(rowData, sectionID, rowID) {
    var price = rowData.price_formatted.split(' ')[0];

    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.lister_url)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(listerURL) {
    var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

    this.props.navigator.push({
      title: "Property",
      component: PropertyView,
      passProps: {property: property}
    });
  }

  _orderByPrice(newListings) { 
    newListings.sort((a, b) => {
      if(this.state.priceOrder === 'low') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    })
    return newListings
  }

  _onSearchDescPressed() {
    let newListings = []
    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url});
    this.props.listings.forEach(item => {

      if (item.title.indexOf(this.state.searchDescString) > -1 || item.summary.indexOf(this.state.searchDescString) > -1 ) {
        newListings.push(item);
      }
    });

    newListings = this._orderByPrice(newListings)
    this.setState({ dataSource: dataSource.cloneWithRows(newListings) });
  }

  _handleOrderValueChange(order) {
   
    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url});
    this.state.priceOrder = order;
    console.log(this.state.dataSource._dataBlob.s1)
    const newListings = this._orderByPrice(this.state.dataSource._dataBlob.s1)
    this.setState({ dataSource: dataSource.cloneWithRows(newListings)});
   
  }

  render() {
    return (
     <View style={{flex: 1}}> 
      <View style={styles.container}>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchDescString}  
            onChangeText={(text) => this.setState({searchDescString: text})}  
            placeholder='Search desc or Names' />   
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'>
            <Text
              style={styles.buttonText}
               onPress={this._onSearchDescPressed.bind(this)}>  
            Go
            </Text>
          </TouchableHighlight>
        </View>    
        <View style={styles.pickerContainer}>
          <Text>
            order by Price:
          </Text>  
          <Picker
            style={styles.piker}   
            selectedValue={this.state.priceOrder}
            onValueChange={value => this._handleOrderValueChange(value)}>
            <Picker.Item label='highest' value='hight' />
            <Picker.Item label='Lowest' value='low' />
          </Picker> 
        </View>   
       </View>    
      <ListView
        style={styles.ListView}  
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}>
        </ListView>
      </View>  
     );
  }

}

var styles = StyleSheet.create({
  container: {
    padding: 0,
    marginTop: 65,
    alignItems: 'center',
    height: 200
  },
  pickerContainer: {
    padding: 0,
    marginTop: 0,
    alignItems: 'center',
    flexDirection: 'row',
     alignSelf: 'stretch'
  },
  piker: {
    flex: 1
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  flowRightPicker: {
    flexDirection: 'row', 
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  ListView: {
    paddingTop: 0
  }
});


module.exports = SearchResults;
