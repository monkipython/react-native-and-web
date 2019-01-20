import { StyleSheet, Dimensions } from 'react-native';
import { Constants, ScreenUtil } from '../../common';
let { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  loginForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScreenUtil.isIphoneX() ? 60 : 30,
    marginBottom: 25,
  },
  label: {
    paddingVertical: 5,
    fontSize: 15,
    width: width - Constants.Padding.sm,
    textAlign: 'left'
  },
  textInput: {
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
    marginTop: 50,
    width: width - Constants.Padding.sm,
    textAlign: 'center',
  },
  textArea: {
    height: 100,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    textAlign: 'center'
  }
});
