import '@babel/polyfill';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { history, NaviBar, Router, NaviRoute, hashChange } from './navigation';
import { Home, Register, Login, User } from './containers';
import store from './actions/store';

let persistor = persistStore(store);

export default class App extends React.Component {
  componentDidMount() {
    history.push('/home/');
    hashChange();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <View style={styles.container}>
              <NaviRoute root exact path="/home/*" component={Home} />
              <NaviRoute exact path="/register/*" component={Register} />
              <NaviRoute exact path="/user/*" component={User} />
              <NaviRoute exact path="/login/*" component={Login} />
            </View>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
