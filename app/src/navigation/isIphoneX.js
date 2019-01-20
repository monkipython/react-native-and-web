import { Dimensions, Platform } from 'react-native';

function isIphoneXNative() {
  if (Platform.OS === 'web') {
    return false;
  }
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

function isIphoneXWeb() {
  return (
    /iphone/gi.test(navigator.userAgent) &&
    (window.screen.height === 812 && window.screen.width === 375)
  );
}

let isIphoneX;

if (Platform.OS === 'web') {
  isIphoneX = isIphoneXWeb;
} else {
  isIphoneX = isIphoneXNative;
}

export default isIphoneX();
