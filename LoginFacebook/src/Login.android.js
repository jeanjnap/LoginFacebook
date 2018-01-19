import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.bt}>
            <Text style={styles.text}>Entre com o Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  bt:{
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10
  },

  text:{
    color: '#fff',
    fontWeight: 'bold',
  },

});
