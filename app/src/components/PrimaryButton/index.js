import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { history } from '../../navigation';
import styles from './style';

class PrimaryButton extends React.Component {
  render() {
    let { onPress, title, type, style } = this.props;
    if(type === 'button'){
      return <View style={[styles.defaultBtn, style]}><Button onPress={onPress} title={title} color='#FFFFFF'/></View>;
    }
    return <TouchableOpacity style={[styles.defaultBtn, style]} onPress={onPress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>;
  }
}
export default PrimaryButton;
