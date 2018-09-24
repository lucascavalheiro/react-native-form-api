import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';
import ListItem, { ITEM_HEIGHT } from './listItem';

class List extends PureComponent {
  static propTypes = {
    selectedItem: PropTypes.string,
    list: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
  };

  flatList = null;

  componentDidMount() {
    if (this.props.selectedItem) {
      this.scrollToItem();
    }
  }

  isItemSelected = item => {
    return (
      (item || '').toLowerCase() ===
      (this.props.selectedItem || '').toLowerCase()
    );
  };

  scrollToItem = () => {
    const { selectedItem, list } = this.props;
    setTimeout(() => {
      if (selectedItem && this.flatList) {
        // if list has less than 8 items, dont centralize the item, because it will create a unecessary scroll
        this.flatList.scrollToItem({
          item: selectedItem,
          animated: false,
          viewPosition: list.length > 9 ? 0.5 : 1,
        });
      }
    }, 100);
  };

  renderItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        item={item}
        isLastItem={index === (this.props.list || []).length - 1}
        isSelected={this.isItemSelected(item)}
        onSelect={this.props.onSelect}
      />
    );
  };

  render() {
    const { list } = this.props;
    return (
      <FlatList
        data={list}
        renderItem={this.renderItem}
        ref={el => (this.flatList = el)}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

const Style = StyleSheet.create({});

export default List;
