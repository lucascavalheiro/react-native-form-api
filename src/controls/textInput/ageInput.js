import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseInput from './baseInput';

class AgeInput extends PureComponent {
  static propTypes = {
    ageLabel: PropTypes.string,
  };

  static defaultProps = {
    ageLabel: 'anos',
  };

  state = {
    lastValidValue: '',
  };

  ref = {};

  validator = value => {
    if (this.ref && typeof this.ref.isValid === 'function') {
      console.log(value);
      const onlyNumbers = this.ref.getRawValue();
      if (!this.ref.isValid() || onlyNumbers <= 0) {
        return { error: 'Idade inválida!' };
      }
    }
    return { success: true };
  };

  render() {
    const { ageLabel } = this.props;

    return (
      <BaseInput
        {...this.props}
        maxLength={4 + ageLabel.length}
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
