import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import BaseControl from '../baseControl/baseControl';
import InputButton from './inputButton';
import { COLOR, FONT, scale } from '../../styles/common';
import { isNullOrEmpty } from '../../utils/string';
import ClearButton from './clearButton';

class BaseInput extends PureComponent {
  static propTypes = {
    buttonImage: PropTypes.any,
    keyboardType: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    options: PropTypes.object,
    showClearButton: PropTypes.bool,
    onButtonPress: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.any,
    inputRef: PropTypes.func,
    isButtonVisible: PropTypes.func,
  };

  static defaultProps = {
    useMask: false,
    showClearButton: true,
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

  focus = () => {
    if (typeof this.inputRef.getElement === 'function') {
      this.inputRef.getElement().focus();
    } else {
      this.inputRef.focus();
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

  clearValue = () => {
    this.props.onChange('');
  };

  forwardRef = ref => {
    this.inputRef = ref;
    const { inputRef } = this.props;
    if (typeof inputRef === 'function') {
      inputRef(ref);
    }
  };

  renderButton = () => {
    const {
      buttonImage,
      showClearButton,
      value,
      buttonImageStyle,
      isButtonVisible,
    } = this.props;
    if (buttonImage) {
      if (typeof isButtonVisible === 'function') {
        const isVisible = isButtonVisible(value);
        if (isVisible === false) {
          return;
        }
      }
      return (
        <InputButton
          image={buttonImage}
          onPress={this.onButtonPress}
          imageStyle={buttonImageStyle}
        />
      );
    } else if (showClearButton && !isNullOrEmpty(value)) {
      return <ClearButton onPress={this.clearValue} />;
    }
  };

  render() {
    const {
      disabled,
      keyboardType,
      onBlur,
      onFocus,
      style,
      options,
      type,
      hasError,
    } = this.props;

    const Input = isNullOrEmpty(type) ? TextInput : TextInputMask;

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
          ref={this.forwardRef}
          onPress={this.focus}
        />
        {this.renderButton()}
      </View>
    );
  }
}

const Style = StyleSheet.create({
  input: {
    height: scale(48),
    paddingHorizontal: scale(24),
    backgroundColor: COLOR.WHITE,
    borderRadius: scale(30),
    color: COLOR.TEXT,
    fontSize: FONT.SIZE_14,
  },
  error: {
    borderWidth: scale(1),
    borderColor: COLOR.RED,
  },
});

export default BaseControl(BaseInput);
