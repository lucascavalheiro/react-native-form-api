import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import BaseControl from '../baseControl/baseControl';
import InputButton from './inputButton';
import { COLOR, scale } from '../../styles/common';

class BaseInput extends PureComponent {
  static propTypes = {
    buttonImage: PropTypes.any,
    keyboardType: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    options: PropTypes.object,
    useMask: PropTypes.bool,
    showClearButton: PropTypes.bool,
    onButtonPress: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.any,
  };

  static defaultProps = {
    useMask: false,
  };

  onButtonPress = () => {
    const { onButtonPress } = this.props;
    if (typeof onButtonPress === 'function') {
      onButtonPress();
    }
  };

  onChange = text => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(text);
    }
  };

  validate = () => {
    return this.props.onValidate();
  };

  validator = value => {
    const { validator } = this.props;
    if (typeof validator === 'function') {
      return validator(value);
    }
    return { success: true };
  };

  render() {
    const {
      disabled,
      keyboardType,
      onBlur,
      onFocus,
      buttonImage,
      style,
      type,
      options,
      useMask,
      hasError,
    } = this.props;

    const Input = useMask ? TextInputMask : TextInput;

    return (
      <View>
        <Input
          {...this.props}
          disabled={disabled}
          keyboardType={keyboardType}
          type={type}
          options={options}
          underlineColorAndroid={'transparent'}
          autoCorrect={false}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={this.onChange}
          onChange={() => {}}
          style={[Style.input, style, hasError && Style.error]}
        />
        <InputButton image={buttonImage} onPress={this.onButtonPress} />
      </View>
    );
  }
}

const Style = StyleSheet.create({
  input: {
    height: scale(48),
    paddingHorizontal: scale(24),
  },
  error: {
    borderColor: COLOR.RED,
  },
});

export default BaseControl(BaseInput);
