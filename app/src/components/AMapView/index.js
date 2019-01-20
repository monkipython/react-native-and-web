import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { PrimaryButton } from '../../components';
import styles from './style';
// import MapView from 'react-native-maps';

class AMapView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let { style, trackRegion, region } = this.props;
    return (
      <View style={styles.container}>
        {/*<MapView
          style={styles.map}
          region={region}
          onRegionChange={trackRegion} />*/}
      </View>
    );
  }
}

export default AMapView;
