import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Image,
  AsyncStorage
} from 'react-native';

import Login from './Login';

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
  LoginManager
} = FBSDK;

console.disableYellowBox = true;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
          name : '',
          pic : '',
          logado: '',
        }
      }


    //Create response callback.
    _responseInfoCallback = (error, result) => {
        if (error) {
        alert('Error fetching data: ' + error.toString());
        } else {
        this.setState({name: result.name, pic: result.picture.data.url});
        }
    }
  
  componentWillMount() {
    AsyncStorage.getItem('logado', (err, result) => {
        if(result=='não')
          logout();
      });

    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me?fields=picture.type(large),name',
      null,
      this._responseInfoCallback
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  
  render() {
    sair = () => {
        AsyncStorage.setItem('logado', 'não');
        this.setState({logado: 'não'})
      }

      function logout(){
        LoginManager.logOut();
        sair();
      }

    let Home = 
    <View style={styles.container}>
        <Text style={styles.text}>{this.state.name}</Text>
        <Image source={{uri:this.state.pic}} style={styles.image} />
        <TouchableOpacity style={styles.bt} onPress={() => logout()}>
            <Text style={styles.text}>Sair</Text>
        </TouchableOpacity>
    </View>;

    let Screen;
    
    if(this.state.logado == 'não')
        Screen = <Login/>;
    else
        Screen = Home;

    return (
      Screen
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
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

  image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      margin: 10
  }

});
