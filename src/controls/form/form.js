import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { isNullOrEmpty } from '../../utils/string';
import FormContext from './form.context';

class FormProvider extends PureComponent {
  static propTypes = {};

  state = {
    inputRefs: {},
  };

  subscribeReference = (inputName, ref) => {
    console.log(`
What I got:
{
  inputName: ${inputName},
  ref: ${ref},
}`);
    console.log(ref);
    if (!isNullOrEmpty(inputName)) {
      const newRefs = { ...this.state.inputRefs };
      newRefs[inputName] = ref;
      this.setState({ inputRefs: newRefs });
    }
  };

  render() {
    const { children } = this.props;

    return (
      <FormContext.Provider
        value={{
          subscribeToForm: this.subscribeReference,
          unsubscribeFromForm: () => {},
        }}
      >
        {children}
      </FormContext.Provider>
    );
  }
}

const styles = StyleSheet.create({});

export default FormProvider;
