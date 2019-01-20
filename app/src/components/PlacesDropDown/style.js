import { StyleSheet, Dimensions, Platform } from 'react-native';
let { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: width - 20,
    marginVertical: 10,
  },
  picker: {
    borderWidth: 0,
    width: width - 20,
    backgroundColor: '#FFFFFF',
  },
});
