import React, { PureComponent } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import BaseControl from '../baseControl/baseControl';
import ModalDropdown from './modal/modal';
import { COLOR, scale } from '../../styles/common';
import DropdownInput from './dropdownInput';

class Dropdown extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    items: PropTypes.array,
    editable: PropTypes.bool,
    hideFilter: PropTypes.bool,
    placeholderSearch: PropTypes.string,
    valueStyle: PropTypes.any, // style that changes the string inside dropdown
    listItemStyle: PropTypes.any, // style that changes the text of each list's item
    modalCancelStyle: PropTypes.any, // style that changes de cancel button inside the modal
    modalHeaderStyle: PropTypes.any, // style that changes the header inside the modal
    modalSearchStyle: PropTypes.any, // style that changes the search input inside the modal
  };

  static defaultProps = {
    hideFilter: false,
  };

  state = {
    isVisible: false,
  };

  onSelectItem = item => {
    if (
      typeof this.props.onChange === 'function' &&
      this.props.editable !== false
    ) {
      this.props.onChange(item);
    }
  };

  validate = () => {
    return this.props.onValidate();
  };

  hidePopover = () => {
    this.setState({
      isVisible: false,
    });
  };

  focus = () => {
    this.showPopover();
  };

  showPopover = () => {
    this.props.clearValidation();
    Keyboard.dismiss();
    this.setState({
      isVisible: true,
    });
  };

  render() {
    const {
      items,
      hasError,
      hideFilter,
      label,
      listItemStyle,
      modalCancelStyle,
      modalHeaderStyle,
      modalSearchStyle,
      style,
      placeholderSearch,
      value,
      valueStyle,
    } = this.props;

    return (
      <View style={[Style.container, style]}>
        <DropdownInput
          hasError={hasError}
          value={value}
          style={valueStyle}
          onPress={this.showPopover}
        />
        <ModalDropdown
          selectedItem={value}
          title={label}
          list={items || []}
          onChange={item => {
            this.onSelectItem(item);
            this.hidePopover();
          }}
          onClose={this.hidePopover}
          visible={this.state.isVisible}
          hideFilter={hideFilter}
          placeholderSearch={placeholderSearch}
          cancelStyle={modalCancelStyle}
          headerStyle={modalHeaderStyle}
          listItemStyle={listItemStyle}
          searchStyle={modalSearchStyle}
        />
      </View>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    height: scale(48),
  },
  itemName: {
    color: COLOR.GRAY_42,
    marginLeft: 21,
    marginBottom: 5,
  },
});

export default BaseControl(Dropdown);
