import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Label from '../label/label';
import { scale } from '../../styles/common';
import * as Controller from './baseControl.controller';
import { isNullOrEmpty } from '../../utils/string';
import ErrorMessage from './errorMessage';

const BaseControl = ComposedComponent =>
  class extends PureComponent {
    static displayName =
      ComposedComponent.displayName || ComposedComponent.name;

    static propTypes = {
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
      required: PropTypes.bool,
      /* VALIDATION */
      errorMessage: PropTypes.string,
      emptyMessage: PropTypes.string,
      /* END VALIDATION */
      onChange: PropTypes.func,
    };

    controlRef = {};

    state = {
      isLabelFloating: false,
      isFocused: false,
      value: '',
      hasError: false,
      errorMessage: '',
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
      // update value and reset any error
      this.setState({ value: value, hasError: false, errorMessage: '' }, () => {
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

    /**
     * Validate if the value is valid, not empty and the validation rule is valid.
     * @return true if it's all valid, false if there's something wrong.
     */
    validate = () => {
      const { required } = this.props;
      const { value } = this.state;
      let hasError = false;
      let errorMessage = '';

      if (required && Controller.isEmpty(value)) {
        hasError = true;
        errorMessage = 'O campo não pode estar vazio';
      }

      if (typeof this.controlRef.validator === 'function') {
        const validator = this.controlRef.validator(value);
        if (validator && validator.error) {
          hasError = true;
          errorMessage = validator.error;
        }
      }

      this.setState({
        hasError,
        errorMessage,
      });
      return hasError;
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
      const { hasError, errorMessage, value, isLabelFloating } = this.state;

      return (
        <View style={Style.container}>
          <ComposedComponent
            {...this.props}
            value={value}
            hasError={hasError}
            onChange={this.handleOnChange}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onValidate={this.validate}
            ref={this.forwardRef}
          />
          <Label
            text={label}
            isFloating={isLabelFloating}
            onPress={this.onLabelPress}
            hasError={hasError}
          />
          <ErrorMessage message={errorMessage} />
        </View>
      );
    }
  };

const Style = StyleSheet.create({
  container: {
    minHeight: scale(72),
    paddingTop: scale(24),
  },
});

export default BaseControl;