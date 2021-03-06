import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseInput from './baseInput';

class CpfInput extends PureComponent {
  static propTypes = {};

  state = {
    isPasswordVisible: false,
  };

  ref = {};

  validator = value => {
    if (this.ref && typeof this.ref.isValid === 'function') {
      if (!this.ref.isValid()) {
        return { error: 'CPF inválido!' };
      }
    }
    return { success: true };
  };

  render() {
    return (
      <BaseInput
        {...this.props}
        type={'cpf'}
        maxLength={14}
        keyboardType={'numeric'}
        validator={this.validator}
        inputRef={c => (this.ref = c)}
      />
    );
  }
}

const Style = StyleSheet.create({});

export default CpfInput;
