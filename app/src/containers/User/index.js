import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { history } from '../../navigation';
import { PrimaryButton, /*AMapView*/ } from '../../components';
import { Constants } from '../../common';
// import Geocoder from 'react-native-geocoder';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../../actions/ActionTypes';
import { connect } from 'react-redux';
import styles from './style';

class User extends React.Component {
  state = {
    region:{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    formattedAddress: Constants.Searching,
  };
  constructor(props){
    super(props);
  }
  goLogout = () => {
    let { user } = this.props;
    this.props.logout(user);
    history.goBack();
  }
  // trackRegion = (region) => {
  //   this.setState({formattedAddress: Constants.Searching});
  //   this.setState({region});
  //   this.getGeocode(region);
  // }
  // getGeocode = (region) => {
  //   Geocoder.geocodePosition({
  //     lat: region.latitude,
  //     lng: region.longitude
  //   }).then(res => {
  //     if( res.length > 0 ){
  //       this.setState({ formattedAddress: res[0].formattedAddress});
  //     }
  //   })
  //   .catch(err => {
  //     this.setState({formattedAddress: err.code});
  //   });
  // }
  render() {
    let { user } = this.props;
    let fullname = user ? user.fullname : 'Guest';
    //let { latitude, longitude } = this.state.region;
    return (
      <View style={styles.container}>
        {/*<AMapView region={this.state.region} trackRegion={this.trackRegion} />*/}
        <View style={styles.fixedFooter}>
          <Text style={styles.welcome}>Hello, {fullname}</Text>
          {/*<Text style={styles.coordinate}>Latitude: {latitude.toFixed(4)}, longitude: {longitude.toFixed(4)}</Text>*/}
          {/*<Text style={styles.address}>{this.state.formattedAddress}</Text>*/}
          <PrimaryButton
            style={styles.logoutBtn}
            type='button'
            title='Logout'
            onPress={this.goLogout}/>
        </View>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
