import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import InputButton from './inputButton';
import ICON_CLEAR from '../../assets/images/x-gray.png';
import { scale } from '../../styles/common';

const ClearButton = class ClearButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
  };

  render() {
    const { onPress } = this.props;
    return <InputButton image={ICON_CLEAR} onPress={onPress} />;
  }
};

const Style = StyleSheet.create({});

export default ClearButton;
