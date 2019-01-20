import { Dimensions } from 'react-native';

const Constants = {
  Screen: {
    Home: 'Home',
    User: 'User',
    Search: 'Search',
  },
  ScreenSize: Dimensions.get('window'),
  Api: {
    Limit: 20
  },
  Padding: {
    xs: 10,
    sm: 20,
    md: 50,
    lg: 80,
    xl: 100,
  },
  Searching: 'Searching...',
};

export default Constants;
