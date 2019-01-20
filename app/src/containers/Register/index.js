import React from 'react';
import { Text, ScrollView, View, TouchableOpacity, TextInput, Dimensions, Alert, Platform, DatePickerAndroid, DatePickerIOS } from 'react-native';
import { history } from '../../navigation';
import { PrimaryButton, DefaultSwitch, PlacesDropDown } from '../../components';
import { Places } from '../../common';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../../actions/ActionTypes';
import { connect } from 'react-redux';
import styles from './style';

let { height, width } = Dimensions.get('window');

class Register extends React.Component {
  state = {
    fullname: '',
    username: '',
    password: '',
    sex: 0, //0=female, 1=male
    cityOptions: [],
    stateOptions: Places.states,
    selectedState: '',
    selectedCity: '',
  }
  goBack = () => {
    history.goBack();
  }
  goUser= () => {
    history.push('/user/');
  }
  registerHandler = () => {
    this.props.register(this.state);
  }
  fullnameHandler = (fullname) => {
    if(this.state.fullname !== fullname){
      this.setState({fullname});
    }
  }
  usernameInputHandler = (username) => {
    if(this.state.username !== username){
      this.setState({username});
    }
  }
  pwInputHandler = (password) => {
    if(this.state.password !== password){
      this.setState({password});
    }
  }
  sexOnChangeHandler = (sex) => {
    this.setState({sex});
  }
  selectCityHandler = (city) => {
    if(this.state.city !== city){
      this.setState({selectedCity: city});
    }
  }
  selectStateHandler = (state) => {
    if(this.state.state !== state){
      this.setState({selectedState: state});
    }
    this.state.stateOptions.map((item) => {
      if(item.name === state){
        this.setState({cityOptions: item.cities});
      }
    });
  }
  render() {
    let sex = this.state.sex ? 'Male' : 'Female';
    return (
      <ScrollView style={styles.container}>
        <View style={styles.loginForm}>
          <Text style={styles.title}>Register</Text>
          <Text
            style={styles.label}>Username
          </Text>
          <TextInput
            underlineColorAndroid='transparent'
            style={styles.textInput}
            value={this.state.username}
            onChangeText={(value) => this.usernameInputHandler(value)} />
          <Text
            style={styles.label}>Full Name
          </Text>
          <TextInput
            underlineColorAndroid='transparent'
            style={styles.textInput}
            value={this.state.fullname}
            onChangeText={(value) => this.fullnameHandler(value)} />
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', padding: 5, height: 50, width: width - 20 }}>
            <Text
              style={{fontSize: 15, width: '85%', textAlign: 'left'}}>Sex({sex})
            </Text>
            <DefaultSwitch
              sexOnChangeHandler={(value) => this.sexOnChangeHandler(value)}
              sex={this.state.sex} />
          </View>
          <Text
            style={styles.label}>Location
          </Text>
          <PlacesDropDown
            selectedCity={this.state.selectedCity}
            selectedState={this.state.selectedState}
            stateOptions={this.state.stateOptions}
            cityOptions={this.state.cityOptions}
            selectCityHandler={(value) => this.selectCityHandler(value)}
            selectStateHandler={(value) => this.selectStateHandler(value)}/>
          <Text
            style={styles.label}>Password
          </Text>
          <TextInput
            underlineColorAndroid='transparent'
            style={styles.textInput}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(value) => this.pwInputHandler(value)} />
          <PrimaryButton
            onPress={this.registerHandler}
            type='touch'
            title='Submit' />
          <PrimaryButton
            onPress={this.goBack}
            type='touch'
            title='Go Back' />
        </View>
      </ScrollView>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type === ActionTypes.USER_REGISTER_FAIL) {
      Alert.alert('Notice', nextProps.message);
    }
    if (nextProps.type === ActionTypes.USER_REGISTER_SUCCESS) {
      const { username, password } = this.state;
      let loginData = {
        email:  username,
        password: password,
      };
      this.props.login(loginData);
      this.goUser();
    }
  }
}

function mapStateToProps({ userReducers }) {
  return {
    type: userReducers.type,
    message: userReducers.message,
    user: userReducers.user,
    userToken: userReducers.userToken,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
