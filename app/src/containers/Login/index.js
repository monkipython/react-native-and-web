import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { history } from '../../navigation';
import { LoginForm, PrimaryButton } from '../../components';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../../actions/ActionTypes';
import { connect } from 'react-redux';
import styles from './style';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }
  goBack = () => {
    history.goBack();
  }
  goUser = () => {
    history.push('/user/');
  }
  loginHandler = () => {
    this.props.login(this.state.username, this.state.password);
  }
  uTextInputHandler = (username) => {
    if(this.state.username !== username){
      this.setState({username});
    }
  }
  pTextInputHandler = (password) => {
    if(this.state.password !== password){
      this.setState({password});
    }
  }
  componentDidMount(){
    console.log(this.props.userInfo);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text
          style={styles.label}>Username
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(value) => this.uTextInputHandler(value)}>
        </TextInput>
        <Text
          style={styles.label}>Password
        </Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(value) => this.pTextInputHandler(value)}>
        </TextInput>
        <PrimaryButton
          type='touch'
          title="Login"
          onPress={this.loginHandler} />
        <PrimaryButton
          type='touch'
          title="Go Back"
          onPress={this.goBack} />
      </View>
    );
  }

  componentWillMount = () => {
    const { loginData } = this.props;
    if (loginData) {
      this.setState({
        username: loginData.username,
        password: loginData.password,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type === ActionTypes.USER_LOGIN_FAIL) {
      Alert.alert('Notice', nextProps.message);
    }
    if (nextProps.type === ActionTypes.USER_LOGIN_SUCCESS) {
      const { username, password } = this.state;
      let loginData = {
        email:  username,
        password: password,
      };
      this.props.storeLogin(loginData);
      history.push('/user/');
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
