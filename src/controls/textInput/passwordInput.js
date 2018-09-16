import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseInput from './baseInput';
import ICO_HIDE_PASSWORD from '../../assets/images/hide-password.png';
import ICO_SHOW_PASSWORD from '../../assets/images/show-password.png';

class PasswordInput extends PureComponent {
  static propTypes = {};

  state = {
    isPasswordVisible: false,
  };

  togglePassword = () => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };

  render() {
    const { isPasswordVisible } = this.state;
    return (
      <BaseInput
        {...this.props}
        secureTextEntry={!isPasswordVisible}
        buttonImage={isPasswordVisible ? ICO_HIDE_PASSWORD : ICO_SHOW_PASSWORD}
        onButtonPress={this.togglePassword}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default PasswordInput;
