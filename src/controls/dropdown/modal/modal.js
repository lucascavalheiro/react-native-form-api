import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Header from './header';
import SearchInput from './searchInput';
import List from './list';
import { FONT, COLOR, scale } from '../../../styles/common';

class ModalDropdown extends PureComponent {
  static propTypes = {
    selectedItem: PropTypes.string,
    list: PropTypes.array.isRequired,
    title: PropTypes.string,
    hideFilter: PropTypes.bool,
    placehelderSearch: PropTypes.string,
    cancelStyle: PropTypes.any,
    headerStyle: PropTypes.any,
    listItemStyle: PropTypes.any,
    onChage: PropTypes.func,
    onClose: PropTypes.func,
  };

  state = {
    filteredItems: [],
    height: 0,
  };

  flatList = null;

  componentDidMount() {
    this.setState({ filteredItems: this.props.list || [] });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.filteredItems !== nextProps.list) {
      this.setState({ filteredItems: this.props.list || [] });
    }
  }

  onContainerLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    // this windows only increases it's size.
    if (height > this.state.height) {
      this.setState({ height });
    }
  };

  filterList = filter => {
    let list = this.props.list;
    if (filter !== '' && filter) {
      list = this.props.list.filter(item =>
        item.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    this.setState({ filteredItems: list });
  };

  getContainerHeightStyle = () => {
    let containerHeightStyle = {};
    if (this.state.height) {
      containerHeightStyle.height = this.state.height;
    }
    return containerHeightStyle;
  };

  render() {
    const {
      visible,
      title,
      onClose,
      onChange,
      selectedItem,
      hideFilter,
      placehelderSearch,
      headerStyle,
      cancelStyle,
      listItemStyle,
    } = this.props;
    const containerHeightStyle = this.getContainerHeightStyle();

    return (
      <Modal
        transparent
        animationType={'fade'}
        onRequestClose={this.onClose}
        visible={visible}
        backdropOpacity={1}
        style={{ margin: 0 }}
      >
        <View style={Style.backdrop}>
          <View
            onLayout={this.onContainerLayout}
            style={[Style.container, containerHeightStyle]}
          >
            <Header title={title} style={headerStyle} />
            {!hideFilter && (
              <SearchInput
                onChange={this.filterList}
                placeholder={placehelderSearch}
              />
            )}
            <List
              list={this.state.filteredItems}
              selectedItem={selectedItem}
              ref={el => (this.flatList = el)}
              onSelect={onChange}
              listItemStyle={listItemStyle}
            />
            <View style={Style.footer}>
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{
                  top: scale(16),
                  bottom: scale(16),
                  left: scale(16),
                  right: scale(16),
                }}
              >
                <Text style={[Style.cancel, cancelStyle]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const Style = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    paddingHorizontal: scale(24),
    paddingVertical: scale(32),
    justifyContent: 'center',
  },
  container: {
    maxHeight: '100%',
    backgroundColor: COLOR.GRAY_BACKGROUND,
    borderRadius: scale(15),
    overflow: 'hidden',
  },
  header: {
    height: scale(56),
  },
  footer: {
    height: scale(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {
    color: COLOR.BLUE,
    fontSize: FONT.SIZE_12,
    fontWeight: 'bold',
  },
});

export default ModalDropdown;
