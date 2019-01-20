import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from '../../common';
let { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    paddingVertical: 5,
    fontSize: 15,
    width: width - Constants.Padding.sm,
    textAlign: 'left',
  },
  input: {
    color: '#555',
    marginBottom: 15,
    width: width - Constants.Padding.sm,
    backgroundColor: '#FFFFFF',
    padding: 5,
    height: 45,
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    width: width - Constants.Padding.sm,
    textAlign: 'center',
  },
});
