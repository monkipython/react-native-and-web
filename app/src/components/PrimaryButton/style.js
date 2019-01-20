import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Constants } from '../../common';
let { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  textStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 10,
  },
  defaultBtn: {
    width: width - 20,
    marginVertical: 5,
    height: 45,
    color: '#FFFFFF',
    backgroundColor: '#0280FF',
    borderRadius: 5,
  },
});
