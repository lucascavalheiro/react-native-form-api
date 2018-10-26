import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import BaseInput from './baseInput';

class ZipCodeInput extends PureComponent {
  static propTypes = {};

  ref = {};

  validator = value => {
    if (this.ref && typeof this.ref.isValid === 'function') {
      if (!this.ref.isValid()) {
        return { error: 'CEP inválido!' };
      }
    }
    return { success: true };
  };

  render() {
    return (
      <BaseInput
        {...this.props}
        type={'zip-code'}
        maxLength={9}
        keyboardType={'numeric'}
        validator={this.validator}
        inputRef={c => (this.ref = c)}
      />
    );
  }
}

const Style = StyleSheet.create({});

export default ZipCodeInput;
