import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import { history } from '../../navigation';
import { PrimaryButton } from '../../components';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../../actions/ActionTypes';
import { connect } from 'react-redux';

class Home extends React.Component {
  goLogin = () => {
    history.push('/login/');
  }
  goRegister = () => {
    history.push('/register/');
  }
  goUser = () => {
    history.push('/user/');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Web!</Text>
        {this.props.userToken && <PrimaryButton type='touch' onPress={this.goUser} title='Go To User Page'/>}
        {!this.props.userToken && <PrimaryButton type='touch' onPress={this.goLogin} title='Sign In'/>}
        {!this.props.userToken && <PrimaryButton type='touch' onPress={this.goRegister} title='Sign Up'/>}
      </View>
    );
  }
}

function mapStateToProps({ userReducers }) {
  return {
    type: userReducers.type,
    message: userReducers.message,
    loginData: userReducers.loginData,
    userToken: userReducers.userToken,
    user: userReducers.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
