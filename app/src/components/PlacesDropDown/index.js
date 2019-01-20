import React from 'react';
import { View, Dimensions, Picker, Platform } from 'react-native';
import { history } from '../../navigation';
import styles from './style';

let { height, width } = Dimensions.get('window');

class PlacesDropDown extends React.Component {
  render() {
    let { selectedState, selectedCity, stateOptions, cityOptions, selectCityHandler, selectStateHandler } = this.props;
    return (
      <View style={styles.container}>
        <Picker
          mode='dialog'
          selectedValue={selectedState}
          style={styles.picker}
          onValueChange={selectStateHandler}>
            <Picker.Item label='Select a state...' value='' />
            {stateOptions.map((item) => <Picker.Item label={item.name} value={item.name} />)}
        </Picker>

        <View style={{ height: 10 }}/>

        <Picker
          mode='dialog'
          selectedValue={selectedCity}
          style={styles.picker}
          onValueChange={selectCityHandler}>
            <Picker.Item label='Select a city...' value='' />
            {cityOptions.map((item) => <Picker.Item label={item.name} value={item.name} />)}
        </Picker>
      </View>
    );
  }
}
export default PlacesDropDown;
