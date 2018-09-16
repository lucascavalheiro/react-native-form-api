import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

class FormTextInput extends Component {
  static propTypes = {

  };

  render() {
    const { text } = this.props;

    return (
      <View>
        <Text style={{ color: 'blue' }}>{this.props.text}Form text input</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default FormTextInput;