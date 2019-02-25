import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseInput from './baseInput';

class AgeInput extends PureComponent {
  static propTypes = {
    ageLabel: PropTypes.string,
    maxDigits: PropTypes.number,
  };

  static defaultProps = {
    ageLabel: 'anos',
    maxDigits: 3,
  };

  state = {
    lastValidValue: '',
  };

  ref = {};

  validator = value => {
    let onlyNumbers;
    if (this.ref && typeof this.ref.getRawValue === 'function') {
      onlyNumbers = this.ref.getRawValue();
    } else {
      const matches = (value || '').toString().match(/^\d+/g);
      if (matches && matches.length) {
        onlyNumbers = +matches[0];
      } else {
        onlyNumber = 0;
      }
    }

    // use custom validator (external, from props)
    const { validator } = this.props;
    if (typeof validator === 'function') {
      // check if has an error from custom validations
      const customValidation = validator(onlyNumbers);
      // if there's an error, return it to display on UI.
      if (customValidation && customValidation.error) {
        return customValidation;
      }
      // if there'snt an error, follow the code to use the
      // native control's validation.
    }

    // own control's validator
    if (this.ref && typeof this.ref.isValid === 'function') {
      if (!this.ref.isValid() || onlyNumbers <= 0) {
        return { error: 'Idade inválida!' };
      }
    }

    return { success: true };
  };

  render() {
    const { ageLabel, maxDigits } = this.props;

    return (
      <BaseInput
        {...this.props}
        maxLength={
          maxDigits +
          1 + // space char between number and label
          ageLabel.length
        }
        type={'money'}
        validator={this.validator}
        options={{
          suffixUnit: ageLabel,
          unit: '',
          precision: 0,
          separator: ' ',
          delimiter: ' ',
          spaceBeforeSuffix: false,
        }}
        keyboardType={'numeric'}
        inputRef={c => (this.ref = c)}
      />
    );
  }
}

const Style = StyleSheet.create({});

export default AgeInput;
