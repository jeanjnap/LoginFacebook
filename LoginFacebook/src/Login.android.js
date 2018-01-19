import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage
} from 'react-native';

import Home from './Home';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
} = FBSDK;

export default class App extends Component {
    constructor(){
        super();

        this.state = {
            logado: 'não'
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('logado', (err, result) => {
          if(result=='sim')
            logar();
        });
    }

  render() {
      logar = () =>{
          this.setState({logado: 'sim'});
          AsyncStorage.setItem('logado', 'sim');
      }
      
      function login() {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
            if (result.isCancelled) {
                //ToastAndroid.show('Login cancelled',ToastAndroid.SHORT);
            } else {
                /*ToastAndroid.show('Login success with permissions: '
                +result.grantedPermissions.toString(),ToastAndroid.SHORT);*/
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      logar();
                    }
                  )

            }
            },
            function(error) {
            //ToastAndroid.show('Login fail with error: ' + error),ToastAndroid.SHORT;
            }
        );
      }

      let Login =
      <View style={styles.container}>

        <TouchableOpacity style={styles.bt} onPress={() => login()}>
            <Text style={styles.text}>Entrar com Facebook</Text>
        </TouchableOpacity>

      </View> 

      if(this.state.logado == 'não')
        Screen = Login;
      else
        Screen = <Home/>;
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
    borderRadius: 10,
    margin: 10
  },

  text:{
    color: '#fff',
    fontWeight: 'bold',
  },

});
