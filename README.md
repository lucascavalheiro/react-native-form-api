# react-native-form-api

A form lib that uses [React Context API](https://reactjs.org/docs/context.html) to access children's values and generate an object with key and values.

Using this approach you don't need to keep field's value on you component's state or tracking then on redux store. Each form components has it's own state and validation.

# Installing

# Usage

```js
import React, { Component } from 'react';
import { Button, View } from 'react-native';
// Importing form component.
import { Form, FormTextInput } from 'react-native-form-api';

class Page extends Component {
  /**
   * Handle the submit form event.
   * It'll create an object with field's values.
   */
  onSubmitForm = () => {
    // Call the 'submit' event from form, it'll create a object { [key]: value } with form's values.
    const values = this.form.submit();
    /**
     * In this example, the values object will be:
     * {
     *  'nameInput': '',
     * }
     */
    console.log(value);
  };

  render() {
    return (
      <View>
        <Form ref={c => (this.form = c)}>
          <FormTextInput label={'Enter your name'} name={'nameInput'} />
        </Form>
        <Button title="Submit" color="#841584" onPress={this.onSubmitForm} />
      </View>
    );
  }
}

export default Page;
```
