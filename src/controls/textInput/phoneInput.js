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

  validator = value => {
    if (this.ref && typeof this.ref.isValid === 'function') {
      const hasMask = value.indexOf('(') > -1 && value.indexOf(')') > -1;
      const minValidLength = hasMask ? 14 : 10;
      if (!this.ref.isValid() || value.toString().length < minValidLength) {
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
        keyboardType={'phone-pad'}
        inputRef={c => (this.ref = c)}
      />
    );
  }
}

const Style = StyleSheet.create({});

export default PhoneInput;
