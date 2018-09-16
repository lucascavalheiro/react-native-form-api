import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Label from '../label/label';
import { scale } from '../../styles/common';
import * as Controller from './baseControl.controller';

const BaseControl = ComposedComponent =>
  class extends PureComponent {
    static displayName =
      ComposedComponent.displayName || ComposedComponent.name;

    static propTypes = {
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
      onChange: PropTypes.func,
    };

    controlRef = {};

    state = {
      isLabelFloating: false,
      isFocused: false,
      value: '',
    };

    componentDidMount() {
      this.setState({
        isLabelFloating: Controller.isLabelFloating(this.state.value, false),
        // set initial value
        value: this.props.value,
      });
    }

    componentDidUpdate(prevProps) {
      const { value } = this.props;
      this.setState({
        isLabelFloating: Controller.isLabelFloating(
          this.state.value,
          this.state.isFocused,
        ),
      });

      // check if the value was updated outside this component
      if (prevProps.value !== value && value !== this.state.value) {
        // update control's value with outside modified value
        this.setState({ value });
      }
    }

    handleOnChange = value => {
      const { onChange } = this.props;
      this.setState({ value: value }, () => {
        if (typeof onChange === 'function') {
          onChange(value);
        }
      });
    };

    handleOnFocus = () => {
      this.setState({
        isFocused: true,
        isLabelFloating: Controller.isLabelFloating(this.state.value, true),
      });
    };

    handleOnBlur = () => {
      this.setState({
        isFocused: false,
        isLabelFloating: Controller.isLabelFloating(this.state.value, false),
      });
    };

    handleOnPress = () => {
      typeof this.controlRef.onPress === 'function' &&
        this.controlRef.onPress();
    };

    onLabelPress = () => {
      this.handleOnPress();
    };

    validate = () => {
      console.log('validate');
    };

    /* FORM METHODS */
    /**
     * Get contorl's value.
     * @returns current control's value.
     */
    getValue = () => {
      return this.state.value;
    };
    /* END FORM METHODS */

    /**
     * Forward the control ref to parent as 'reference'.
     * @param {Component} ref composed component reference.
     */
    forwardRef = ref => {
      this.controlRef = ref;
      const { reference } = this.props;
      if (typeof reference === 'function') {
        reference(ref);
      }
    };

    render() {
      const { label } = this.props;

      return (
        <View style={Style.container}>
          <ComposedComponent
            {...this.props}
            value={this.state.value}
            validate={this.validate}
            onChange={this.handleOnChange}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            ref={this.forwardRef}
          />
          <Label
            text={label}
            isFloating={this.state.isLabelFloating}
            onPress={this.onLabelPress}
          />
        </View>
      );
    }
  };

const Style = StyleSheet.create({
  container: {
    height: scale(72),
    paddingTop: scale(24),
  },
});

export default BaseControl;
