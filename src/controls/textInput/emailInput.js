import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseInput from './baseInput';

class EmailInput extends PureComponent {
  static propTypes = {};

  state = {
    isPasswordVisible: false,
  };

  togglePassword = () => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };

  validator = value => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)) {
      return { error: 'E-mail inválido!' };
    }
    return { success: true };
  };

  render() {
    return (
      <BaseInput {...this.props} validator={this.validator} maxLength={60} />
    );
  }
}

const Style = StyleSheet.create({});

export default EmailInput;
