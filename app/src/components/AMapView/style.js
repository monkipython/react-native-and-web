import { StyleSheet, Dimensions } from 'react-native';
let { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: width,
    height: height,
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
