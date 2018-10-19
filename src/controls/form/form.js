import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNullOrEmpty } from '../../utils/string';
import { FormContextProvider } from './form.context';

class FormProvider extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  /**
   * Object that keep a list of subscribers of this form instance.
   */
  inputRefs = {};

  /**
   * Add a control refence on subscriptions list.
   * This method is for internal use.
   * @param {string} inputName used as key, a unique control's name for a form.
   * @param {object} ref control's ref that will be used to get control's value
   */
  subscribeReference = (inputName, ref) => {
    if (!isNullOrEmpty(inputName)) {
      this.inputRefs[inputName] = ref;
    }
  };

  /**
   * Remove a control refence from subscriptions list.
   * This method is for internal use.
   * @param {string} inputName used as key, unique control's name for a form.
   */
  unsubscribeReference = inputName => {
    if (this.inputRefs.hasOwnProperty(inputName)) {
      delete this.inputRefs[inputName];
    }
  };

  /**
   * Find the control's refence by it's name and return it's value.
   * @param {string} inputName used as key to find control's reference.
   * @return control's value.
   */
  getFieldValue = inputName => {
    const inputRef = this.inputRefs[inputName];
    if (!inputRef) {
      console.error(
        `There's no control refence for a input with name '${inputName}'`,
      );
      return null;
    }
    if (typeof inputRef.getValue === 'function') {
      return inputRef.getValue();
    } else {
      console.error(
        `Input '${inputName}' doesn't implement 'getValue' method.`,
      );
      return null;
    }
  };

  /**
   * Get values from form's controls.
   * @return a object with control's values. E.g:
   * { inputName: 'current fields value' }
   */
  submit = () => {
    const { onSubmit } = this.props;
    const formValues = {};

    // get all form values
    const controlNames = Object.keys(this.inputRefs);
    controlNames.forEach(name => {
      formValues[name] = this.getFieldValue(name);
    });

    if (typeof onSubmit === 'function') {
      onSubmit(formValues);
    }

    return formValues;
  };

  /**
   * Properties and methods that will be passed from Provider to Consumer via context API.
   */
  contextObject = {
    subscribe: this.subscribeReference,
    unsubscribe: this.unsubscribeReference,
  };

  render() {
    const { children } = this.props;

    return (
      <FormContextProvider value={this.contextObject}>
        {children}
      </FormContextProvider>
    );
  }
}

export default FormProvider;
