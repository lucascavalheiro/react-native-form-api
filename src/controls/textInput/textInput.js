import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import BaseInput from './baseInput';

class FormTextInput extends Component {
  static propTypes = {};

  render() {
    return <BaseInput {...this.props} />;
  }
}

const styles = StyleSheet.create({});

export default FormTextInput;
