import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { COLOR, FONT, scale } from '../../../styles/common';
import CHECK_ICON from '../../../assets/images/check.png';

export const ITEM_HEIGHT = scale(48);

class ListItem extends PureComponent {
  static propTypes = {
    item: PropTypes.string.isRequired,
    isLastItem: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
    style: PropTypes.any,
  };

  onPress = () => {
    const { item, onSelect } = this.props;
    if (typeof onSelect === 'function') {
      onSelect(item);
    }
  };

  render() {
    const { item, isLastItem, isSelected, style } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[Style.container, !isLastItem && Style.separator]}
      >
        <Text style={[Style.text, style]}>{item}</Text>
        {isSelected && <Image style={Style.selectedIcon} source={CHECK_ICON} />}
      </TouchableOpacity>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    backgroundColor: COLOR.GRAY_BACKGROUND,
  },
  separator: {
    borderBottomColor: COLOR.GRAY_5,
    borderBottomWidth: scale(1),
  },
  selectedIcon: {
    width: scale(32),
    height: scale(32),
  },
  text: {
    // weight: medium
    fontSize: FONT.SIZE_14,
    color: COLOR.TEXT,
  },
});

export default ListItem;
