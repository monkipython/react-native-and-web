import React from 'react';
import { View, Dimensions, Animated, Platform } from 'react-native';
import { Route, historyAddListen, historyRemoveListen } from './routerHistory';

const AnimatedView = Animated.createAnimatedComponent(View);

const iw = Dimensions.get('window').width;
const isWeb = Platform.OS === 'web';

const IProps = {
  exact: false,
  path: '',
  component: undefined,
  render: undefined,
  children: [],
  backgroundColor: '#fff',
  animed: true,
  moveOutFix: 1,
  moveInFix: 1,
  root: false,
};

let NaviRoute = (v = IProps) => <View />;

NaviRoute = class extends React.PureComponent {
  static defaultProps = { ...IProps };
  listen = 0;
  state = {
    nowRoute: false,
    index: this.props.root ? 1 : 0,
    staticAnime: this.props.root ? 0 : iw,
    isAnime: false,
    moveAnime: new Animated.Value(this.props.root ? 0 : iw),
  };
  componentDidMount() {
    const path = this.props.path.replace('*', '');
    this.listen = historyAddListen(h => {
      let index = 0;
      for (let i = 0; i < h.entries.length; i++) {
        const r = h.entries[i];
        if (r.pathname === path) {
          index = i;
        }
      }
      if (index === h.index && !this.state.nowRoute) {
        this.setState(
          {
            nowRoute: true,
            index: 1,
          },
          () => {
            this.moveNowPage(0);
          },
        );
      } else if (index > h.index && this.state.nowRoute) {
        this.setState(
          {
            nowRoute: false,
            index: 0,
            staticAnime: 0,
            moveAnime: new Animated.Value(0),
          },
          () => {
            this.moveNowPage(iw * this.props.moveInFix);
          },
        );
      } else if (index < h.index && this.state.nowRoute) {
        this.setState(
          {
            nowRoute: false,
            index: 0,
            staticAnime: 0,
            moveAnime: new Animated.Value(0),
          },
          () => {
            this.moveNowPage(-iw * this.props.moveOutFix);
          },
        );
      }
    });
  }
  componentWillUnmount() {
    historyRemoveListen(this.listen);
  }
  moveNowPage = x => {
    if (this.props.animed) {
      this.setState({ isAnime: true });
      Animated.spring(this.state.moveAnime, {
        useNativeDriver: !isWeb,
        toValue: x,
        damping: 33,
        stiffness: 320,
      }).start();
    } else {
      this.setState({
        staticAnime: x,
        isAnime: false,
      });
    }
  };

  render() {
    const moveX = this.props.animed
      ? this.state.moveAnime
      : this.state.staticAnime;
    return (
      <AnimatedView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: this.props.backgroundColor,
          zIndex: this.state.index * 10,
          transform: [{ translateX: moveX }],
        }}
      >
        <Route
          exact={this.props.exact}
          path={this.state.isAnime ? '*' : this.props.path}
          component={this.props.component}
          render={this.props.render}
          children={this.props.children}
        />
      </AnimatedView>
    );
  }
};

export default NaviRoute;
