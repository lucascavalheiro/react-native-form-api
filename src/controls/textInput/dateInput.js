import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseInput from './baseInput';

class DateInput extends PureComponent {
  static propTypes = {};

  state = {
    isPasswordVisible: false,
  };

  ref = {};

  validator = value => {
    if (this.ref && typeof this.ref.isValid === 'function') {
      if (!this.ref.isValid() || value.toString().length < 10) {
        return { error: 'Data inválida!' };
      }
    }
    return { success: true };
  };

  render() {
    return (
      <BaseInput
        {...this.props}
        validator={this.validator}
        maxLength={10}
        type={'datetime'}
        options={{ format: 'DD/MM/YYYY' }}
        keyboardType={'numeric'}
        inputRef={c => (this.ref = c)}
      />
    );
  }
}

const Style = StyleSheet.create({});

export default DateInput;
