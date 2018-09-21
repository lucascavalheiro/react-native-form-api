import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseInput from './baseInput';
import ICON_HIDE_PASSWORD from '../../assets/images/hide-password.png';
import ICON_SHOW_PASSWORD from '../../assets/images/show-password.png';

class PasswordInput extends PureComponent {
  static propTypes = {};

  state = {
    isPasswordVisible: false,
  };

  togglePassword = () => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };

  validator = value => {
    return { success: true };
  };

  render() {
    const { isPasswordVisible } = this.state;
    const icon = isPasswordVisible ? ICON_HIDE_PASSWORD : ICON_SHOW_PASSWORD;

    return (
      <BaseInput
        {...this.props}
        secureTextEntry={!isPasswordVisible}
        buttonImage={icon}
        onButtonPress={this.togglePassword}
        validator={this.validator}
      />
    );
  }
}

const Style = StyleSheet.create({});

export default PasswordInput;
