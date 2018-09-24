import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { COLOR, FONT, scale } from '../../../styles/common';

class Header extends Component {
  static propTypes = {
    style: PropTypes.any,
  };

  render() {
    const { title, style } = this.props;
    return (
      <View>
        <View style={Style.container}>
          <View style={Style.textContainer}>
            <Text style={[Style.text, style]}>{title}</Text>
          </View>
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

const Style = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    height: scale(56),
    paddingTop: 0,
    flexDirection: 'row',
    paddingBottom: 0,
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: FONT.SIZE_14,
    fontWeight: 'bold',
  },
});
