import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { COLOR, FONT, scale } from '../../styles/common';

const ICON_DROPDOWN = require('../../assets/images/arrow-down.png');

class DropdownInput extends PureComponent {
  static propTypes = {
    hasError: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.any,
    onPress: PropTypes.func,
  };

  render() {
    const { hasError, onPress, style, value } = this.props;

    return (
      <View>
        <TouchableOpacity
          style={[Style.selectList, hasError && Style.error]}
          activeOpacity={1}
          onPress={onPress}
        >
          <Text style={[Style.value, style]}>{value}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={Style.dropdown}
          onPress={this.showPopover}
        >
          <Image
            style={Style.dropdownIcon}
            resizeMode={'contain'}
            source={ICON_DROPDOWN}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const Style = StyleSheet.create({
  selectList: {
    height: scale(48),
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.WHITE,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 15,
    borderRadius: scale(50),
    justifyContent: 'center',
    zIndex: 1,
  },
  value: {
    fontSize: FONT.SIZE_14,
    color: COLOR.TEXT,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    height: scale(48),
    width: 45,
    paddingRight: scale(16),
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  dropdownIcon: {
    width: scale(32),
    height: scale(32),
  },
  error: {
    borderWidth: scale(1),
    borderColor: COLOR.RED,
  },
});

export default DropdownInput;
