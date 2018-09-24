import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseInput from './baseInput';

class PhoneInput extends PureComponent {
  static propTypes = {};

  state = {
    isPasswordVisible: false,
  };

  ref = {};

  togglePassword = () => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };

  validator = value => {
    if (this.ref && typeof this.ref.isValid === 'function') {
      if (!this.ref.isValid() || value.toString().length < 14) {
        return { error: 'Telefone inválido!' };
      }
    }
    return { success: true };
  };

  render() {
    return (
      <BaseInput
        {...this.props}
        validator={this.validator}
        maxLength={15}
        type={'cel-phone'}
        keyboardType={'numeric'}
        inputRef={c => (this.ref = c)}
      />
    );
  }
}

const Style = StyleSheet.create({});

export default PhoneInput;
