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
    // use custom validator (external, from props)
    const { validator } = this.props;
    if (typeof validator === 'function') {
      // check if has an error from custom validations
      const customValidation = validator(value);
      // if there's an error, return it to display on UI.
      if (customValidation && customValidation.error) {
        return customValidation;
      }
      // if there'snt an error, follow the code to use the
      // native control's validation.
    }

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
