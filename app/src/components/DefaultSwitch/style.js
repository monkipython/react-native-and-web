import { StyleSheet, Dimensions } from 'react-native';
let { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: '10%',
  },
  switch: {
    justifyContent: 'flex-end',
  },
});
