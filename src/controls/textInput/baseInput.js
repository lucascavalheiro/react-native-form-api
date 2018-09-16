import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import BaseControl from '../baseControl/baseControl';
import InputButton from './inputButton';
import { scale } from '../../styles/common';

class BaseInput extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    buttonImage: PropTypes.string,
    keyboardType: PropTypes.string,
    disabled: PropTypes.bool,
    showClearButton: PropTypes.bool,
    onButtonPress: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.any,
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

  render() {
    const {
      value,
      disabled,
      keyboardType,
      onBlur,
      onFocus,
      buttonImage,
      style,
    } = this.props;

    return (
      <View>
        <TextInput
          {...this.props}
          value={value}
          disabled={disabled}
          keyboardType={keyboardType}
          underlineColorAndroid={'transparent'}
          autoCorrect={false}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={this.onChange}
          onChange={() => {}}
          style={[styles.input, style]}
        />
        <InputButton image={buttonImage} onPress={this.onButtonPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: scale(48),
    paddingHorizontal: scale(24),
  },
});

export default BaseControl(BaseInput);
