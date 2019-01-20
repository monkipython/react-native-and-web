import React from 'react';
import { Switch, View } from 'react-native';
import { history } from '../../navigation';
import styles from './style';

class PrimaryButton extends React.Component {
  render() {
    let { sexOnChangeHandler, sex } = this.props;
    return (
      <View style={styles.container}>
          <Switch
            style={styles.switch}
            onValueChange={sexOnChangeHandler}
            value={sex} />
      </View>
    );
  }
}
export default PrimaryButton;
