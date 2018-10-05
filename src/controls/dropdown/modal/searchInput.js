import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { FONT, COLOR, scale } from '../../../styles/common';
import SEACH_ICON from '../../../assets/images/search-gray.png';

class SearchInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.any,
    onChange: PropTypes.func,
  };

  render() {
    const { onChange, placeholder, style } = this.props;
    return (
      <View style={Style.container}>
        <Image source={SEACH_ICON} style={Style.searchIcon} />
        <TextInput
          onChangeText={onChange}
          placeholder={placeholder || 'Buscar'}
          containerStyle={Style.inputContainer}
          style={[Style.input, style]}
        />
      </View>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(60),
    backgroundColor: COLOR.GRAY_5,
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  searchIcon: {
    width: scale(32),
    height: scale(32),
  },
  inputContainer: {
    flex: 1,
    margin: 0,
    marginTop: scale(25),
  },
  input: {
    flex: 1,
    height: scale(50),
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    marginTop: scale(6),
    paddingLeft: scale(8),
    backgroundColor: COLOR.GRAY_5,
    fontSize: FONT.SIZE_14,
  },
});

export default SearchInput;
