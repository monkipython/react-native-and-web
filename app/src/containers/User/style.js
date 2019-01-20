import { StyleSheet, Dimensions } from 'react-native';
let { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    paddingVertical: 5,
  },
  welcome: {
    textAlign: 'center',
    paddingVertical: 5,
    height: 35,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginLeft: 10,
  },
  coordinate: {
    textAlign: 'center',
    paddingVertical: 5,
    height: 35,
    fontSize: 14,
  },
  address: {
    textAlign: 'center',
    paddingVertical: 5,
    height: 35,
    fontSize: 12,
    flexWrap: 'wrap',
  },
});
