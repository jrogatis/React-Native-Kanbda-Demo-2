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

import  PropertyView  from './PropertyView';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: '',
      searchDescString: '',
      priceOrder: 'low'
    };
    
  }

  componentWillMount() { 
    this._recriateDataSource();
  }

  rowPressed(listerURL) {
    var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

    this.props.navigator.push({
      title: "Property",
      component: PropertyView,
      passProps: {property: property}
    });
  }

  _orderByPrice(newListings, order) { 
    console.log('no order by price', newListings.length)
    newListings.sort((a, b) => {
      if(order === 'low') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    })
    return newListings
  }

  _StringMatch(string) { 
    string = string.toLowerCase().replace(/\s/g,'');
    const content = this.state.searchDescString.toLowerCase().replace(/\s/g,'');

    return (string.indexOf(content) > -1)? true:false

  }

  _recriateDataSource(string, origin) { 
    console.log('price order', this.state.priceOrder, string);
    let newListings = []
    const dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url }); 
    if (this.state.searchDescString.length > 0) {
      newListings = this._filterListing(this.props.listings.slice(0));
    } else {
      newListings = this.props.listings.slice(0);
    }
    if (origin === 'picker') {
       newListings = this._orderByPrice(newListings, string)
    } else {
        newListings = this._orderByPrice(newListings, this.state.priceOrder)
    }
  
    this.setState({ dataSource: dataSource.cloneWithRows(newListings)});
  }

  _filterListing(listings) {
    let listingsFiltered = []
    listings.forEach(item => {
      if (this._StringMatch(item.title) || this._StringMatch(item.summary)) {
        listingsFiltered.push(item);
      }   
    })
    return listingsFiltered;  
  }    
  
  
  render() {
  
    return (
      <View
        style={{flex: 1}}> 
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          value={this.state.searchDescString}  
          onChangeText={text => this.setState({searchDescString: text}, this._recriateDataSource(text))}  
          placeholder='Search Desc or Names' />   
      </View>      
      <View style={pickerStyle.pickerContainer}>
          <View style={pickerStyle.pickerContainerTitle}>
            <Text
              style={pickerStyle.pickerContainerText}>
            order by Price:
            </Text>
          </View>  
          <View
            style={pickerStyle.pickerContainerSolo}> 
            <Picker
              style={pickerStyle.piker}   
              selectedValue={this.state.priceOrder}
              onValueChange={value => this.setState({priceOrder: value}, this._recriateDataSource(value, 'picker'))}>
              <Picker.Item label='highest' value='hight' />
              <Picker.Item label='Lowest' value='low' />
            </Picker>
          </View>    
        </View>
        <View
          style={listViewStyle.ListViewContainer}  >  
          <ListView
            style={styles.ListView}  
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}>
          </ListView>
        </View>  
      </View>  
     );
  }

  renderRow(rowData, sectionID, rowID) {
    var price = rowData.price_formatted.split(' ')[0];
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.lister_url)}
          underlayColor='#dddddd'>
        <View>
          <View style={rowStyle.rowContainer}>
            <Image style={rowStyle.thumb} source={{ uri: rowData.img_url }} />
            <View  style={rowStyle.textContainer}>
              <Text style={rowStyle.price}>{price}</Text>
              <Text style={rowStyle.title}
                    numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={rowStyle.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

}

const listViewStyle = StyleSheet.create({
  ListViewContainer: {
    flex: 4
  },
  ListView: {
    paddingTop: 0
  }
})

const rowStyle = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 10
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
})

const pickerStyle = StyleSheet.create({
  pickerContainer: {
    flex: 1,
     flexDirection: "row", 
     backgroundColor: "#f4eeee",
     justifyContent: "center",  
  },
  pickerContainerTitle: {
    flex: 1,
    justifyContent: "center",
  }, 
  pickerContainerText: {
    paddingLeft: 10,
    fontSize: 18,
  },
  pickerContainerSolo: {
    flex: 1,
    justifyContent: "center",
  },
  piker: {
    flex: 1,
     justifyContent: "center", 
  }
});

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginTop: 75,
    alignItems: 'center',
    height: 60,
    flexDirection: 'row',
    alignSelf: 'stretch'
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
  }
});

module.exports = SearchResults;

