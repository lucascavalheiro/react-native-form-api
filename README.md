# react-native-form-api

A form lib that uses [React Context API](https://reactjs.org/docs/context.html) to access children's values and generate an object with key and values.

Using this approach you don't need to keep field's value on you component's state or tracking then on redux store. Each form component has it's own state and validation.

# Table of Contents

- [Instaling](#section-instaling)
- [Usage](#section-usage)
- [Docs](#section-docs)
  - [Form](#section-form)
  - [BaseControl](#section-base-control)
  - [Label](#section-label)
  - [Dropdown](#section-dropdown)
  - [BaseInput](#section-base-input)
  - [AgeInput](#section-age-input)
  - [CpfInput](#section-cpf-input)
  - [DateInput](#section-date-input)
  - [EmailInput](#section-email-input)
  - [InputButton](#section-input-button)
  - [PasswordInput](#section-password-input)
  - [PhoneInput](#section-phone-input)
  - [TextInput](#section-text-input)
  - [ZipcodeInput](#section-zipcode-input)

# <a name="section-instaling"> Installing </a>

# <a name="section-usage"> Usage </a>

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

# <a name="section-docs"> Docs </a>

## <a name="section-form"> Form </a>

### Description

A container component that handles submit event and (soon) field's validation.

### Props

| Name     | Type   | Required | Default value | Description                                                                                                                  |
| -------- | ------ | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| onSubmit | `func` | `false`  | -             | Event triggered after `submit` is called. <br/> Form will call `onSubmit` method passing an object with values as parameter. |

### Methods

| Name   | Params | Return                                                                               | Description                      |
| ------ | ------ | ------------------------------------------------------------------------------------ | -------------------------------- |
| submit | -      | A object with control's values.<br/>Example: `{ inputName: 'current fields value' }` | Get values from form's controls. |

### Usage example

```js
  ...
  handleSubmit = () => {
    this.form.submit();
  }

  ...

  <Form
    onSubmit={values => { console.log(values) }}
    ref={component => { this.form = component }}
  />
  ...
```

## <a name="section-base-control"> BaseControl </a>

### Description

A ([HOC](https://reactjs.org/docs/higher-order-components.html)) base component for every field. Its render a Label, Field and Error Message and it's reposable for handling value changes and trigger field's validation.

### Props

| Name             | Type                | Required | Default value | Description                                                                                                  |
| ---------------- | ------------------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| emptyMessage     | `string`            | `false`  | -             | Custom empty message. This message is displayed when field is validating and it's required and has no value. |
| errorMessage     | `string`            | `false`  | -             | Custom error message. If it's have a value, a error will be displayed.                                       |
| errorStyle       | `style`             | `false`  | -             | A custom style to Error's text.                                                                              |
| label            | `string`            | `false`  | -             | Label text.                                                                                                  |
| labelStyle       | `style`             | `false`  | -             | A custom style to Label's text.                                                                              |
| onChange         | `func`              | `false`  | -             | Event triggered for every value's change. The new value is passed as parameter.                              |
| reference        | `object`            | `false`  | -             | Should be used as `ref` prop. But, the `ref` is reserved for internal usage.                                 |
| required         | `boolean`           | `false`  | `false`       | Indicates if this control must have a value.                                                                 |
| showEmptyMessage | boolean             | `false`  | `false`       | Indicates if a message should be displayed when this field is required and empty.                            |
| value            | `string` / `number` | `true`   | ""            | Field's value.                                                                                               |

### Methods

| Name     | Params | Return                                                    | Description                                                                 |
| -------- | ------ | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| validate | -      | true if it's all valid, false if there's something wrong. | Validate if the value is valid, not empty and the validation rule is valid. |

### Usage example

```js
```

## <a name="section-label"> Label </a>

### Description

A component to render the control's label. This component is currently used only for internal components.

### Props

| Name       | Type      | Required | Default value | Description                                                           |
| ---------- | --------- | -------- | ------------- | --------------------------------------------------------------------- |
| isFloating | `boolean` | `false`  | -             | Indicates if the label is inside or outside (floating) the component. |
| hasError   | `boolean` | `false`  | -             | If `true`, changes the color of the text to red.                      |
| onPress    | `func`    | `false`  | -             | Event triggered whener the label is pressed.                          |
| style      | `style`   | -        | -             | Custom style to label's text.                                         |
| text       | `string`  | `true`   | -             | Text that is displayed as label.                                      |

### Methods

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
  This component is for internal use. BaseControl renders the label.
```

## <a name="section-dropdown"> Dropdown </a>

### Description

A dropdown list component.

### Props

Dropdown inherits [Base Control props](#section-base-control).

| Name              | Type      | Required | Default value | Description                                                   |
| ----------------- | --------- | -------- | ------------- | ------------------------------------------------------------- |
| items             | `array`   | `false`  | -             | List of string that will be displayed as options.             |
| editable          | `boolean` | `false`  | -             | Indicates if the value could be changed.                      |
| hideFilter        | `boolean` | `false`  | `false`       | Show or hide the filter field to search items on dropdown.    |
| listItemStyle     | `style`   | `false`  | -             | Custom style that changes the text of each list's item.       |
| modalCancelStyle  | `style`   | `false`  | -             | Custom style that changes de cancel button inside the modal.  |
| modalHeaderStyle  | `style`   | `false`  | -             | Custom style that changes the header inside the modal .       |
| modalSearchStyle  | `style`   | `false`  | -             | Custom style that changes the search input inside the modal . |
| placeholderSearch | `string`  | `false`  | -             | Custom text for filter input placeholder                      |
| style             | `style`   | `false`  | -             | Custom style for dropdown container.                          |
| valueStyle        | `style`   | `false`  | -             | Custom style that changes the string with selected value.     |

### Methods

Dropdown inherits [Base Control methods](#section-base-control).

| Name  | Params | Return | Description                  |
| ----- | ------ | ------ | ---------------------------- |
| focus | -      | -      | Opens dropdown modal window. |

### Usage example

```js
...
render() {
  return (
    <FormDropdown
      label={'Dropdown label'}
      items={[
        'ITEM 1',
        'ITEM 2',
        'ITEM 3',
        'ITEM 4',
        'ITEM 5',
        'ITEM 6',
        'ITEM 7',
        'ITEM 8',
        'ITEM 9',
        'ITEM 10',
      ]}
      reference={c => (this.ddlItemsRef = c)}
      required
    />
  );
}
```

## <a name="section-base-input"> BaseInput </a>

### Description

A wrapper for all text inputs. This component is for internal use.

### Props

BaseInput inherits [Base Control props](#section-base-control) and [React Native TextInput props](https://facebook.github.io/react-native/docs/textinput).


| Name             | Type               | Required | Default value | Description                                                                                                                                     |
| ---------------- | ------------------ | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| buttonImage      | `string` / `image` | `false`  | -             | The image source for the button that renders in the right inside the input (either a remote URL or a local file resource).                      |
| buttonImageStyle | `style`            | `false`  | -             | Custom style for buttonImage component.                                                                                                         |
| isButtonVisible  | `func`             | `false`  | -             | A function that should return `true` or `false` indicating if the button inside the input is visible or not.                                    |
| inputRef         | `func`             | `false`  | -             | Used to foward the input's ref.                                                                                                                 |
| onButtonPress    | `func`             | `false`  | -             | Event triggered when user press the buttonImage                                                                                                 |
| options          | `object`           | `false`  | -             | Options applied when using custom mask. Reference for options docs could be found [here](https://github.com/benhurott/react-native-masked-text) |
| showClearButton  | `boolean`          | `false`  | -             | Indicates if should show the x button that clears the input's value                                                                             |
| style            | `style`            | `false`  | -             | Custom style for input.                                                                                                                         |
| type             | `string`           | `false`  | -             | Custom mask type. (See more [here](https://github.com/benhurott/react-native-masked-text))                                                      |

### Methods

BaseInput inherits [Base Control methods](#section-base-control) and [React Native TextInput methods](https://facebook.github.io/react-native/docs/textinput).

| Name  | Params | Return | Description                   |
| ----- | ------ | ------ | ----------------------------- |
| focus | -      | -      | Set focus on input's control. |

### Usage example

```js
  This component is for internal use.
```

## <a name="section-age-input"> AgeInput </a>

### Description

A text input with a defined mask for age input.
The default result will be something like this: '10 anos';

### Props

Age input inherits [Base Input props](#section-base-input).

| Name     | Type     | Required | Default value | Description                                  |
| -------- | -------- | -------- | ------------- | -------------------------------------------- |
| ageLabel | `string` | `false`  | 'anos'        | Text that is displayed after the age number. |

### Methods

Age input inherits [Base Input methods](#section-base-input).

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
...
render() {
  return (
    <FormAgeInput
      style={styles.textInput}
      label={'Custom Mask Input'}
      name={'ageInput'}
      reference={c => (this.txtMaskInput = c)}
      required
    />
  );
}
```

## <a name="section-cpf-input"> CpfInput </a>

### Description

A CPF input with a default mask '000.000.000-00'.
This component already have a default validation for cpfs.

### Props

CPF input inherits [Base Input props](#section-base-input).

| Name | Type | Required | Default value | Description |
| ---- | ---- | -------- | ------------- | ----------- |
| -    | -    | -        | -             | -           |

### Methods

CPF input inherits [Base Input methods](#section-base-input).

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
...
render() {
  return (
    <FormCpfInput
      label={'CPF Input'}
      reference={c => (this.txtCpfRef = c)}
      required
    />
  );
}
```

![](https://imgur.com/a/g7lnLY8)

## <a name="section-date-input"> DateInput </a>

### Description

A date input with a default mask 'DD/MM/YYYY'.
This component already have a default validation for dates.

### Props

Date input inherits [Base Input props](#section-base-input).

| Name | Type | Required | Default value | Description |
| ---- | ---- | -------- | ------------- | ----------- |
| -    | -    | -        | -             | -           |

### Methods

Date input inherits [Base Input methods](#section-base-input).

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
...
render() {
  return (
    <FormDateInput
      label={'Date Input'}
      reference={c => (this.txtDateRef = c)}
      required
    />
  );
}
```

## <a name="section-email-input"> EmailInput </a>

### Description

An email input with a default mask 'something@domain.com'.
This component already have a default validation for emails.

### Props

Email input inherits [Base Input props](#section-base-input).

| Name | Type | Required | Default value | Description |
| ---- | ---- | -------- | ------------- | ----------- |
| -    | -    | -        | -             | -           |

### Methods

Email input inherits [Base Input methods](#section-base-input).

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
...
render() {
  return (
    <FormEmailInput
      label={'Email Input'}
      reference={c => (this.txtEmailRef = c)}
      required
    />
  );
}
```

## <a name="section-input-button"> InputButton </a>

### Description

### Props

| Name | Type | Required | Default value | Description |
| ---- | ---- | -------- | ------------- | ----------- |
| -    | -    | -        | -             | -           |

### Methods

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
```

## <a name="section-password-input"> PasswordInput </a>

### Description

A password input that uses secury entry by default.
If password is not null, a button will displayed to show or hide password value.

### Props

Password input inherits [Base Input props](#section-base-input).

| Name | Type | Required | Default value | Description |
| ---- | ---- | -------- | ------------- | ----------- |
| -    | -    | -        | -             | -           |

### Methods

Password input inherits [Base Input props](#section-base-input).

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
...
render() {
  return (
    <FormPasswordInput
      label={'Password Input'}
      reference={c => (this.txtPasswordRef = c)}
      required
    />
  );
}
```

## <a name="section-phone-input"> PhoneInput </a>

### Description

A phone input with a default mask '(00) 00000-0000'.

### Props

Phone input inherits [Base Input props](#section-base-input).

| Name | Type | Required | Default value | Description |
| ---- | ---- | -------- | ------------- | ----------- |
| -    | -    | -        | -             | -           |

### Methods

Phone input inherits [Base Input props](#section-base-input).

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
...
render() {
  return (
    <FormPhoneInput
      label={'Phone Input'}
      reference={c => (this.txtPhoneRef = c)}
      required
    />
  );
}
```

## <a name="section-text-input"> TextInput </a>

### Description

A text input component.

### Props

Text input inherits [Base Input props](#section-base-input).

| Name | Type | Required | Default value | Description |
| ---- | ---- | -------- | ------------- | ----------- |
| -    | -    | -        | -             | -           |

### Methods

Text input inherits [Base Input props](#section-base-input).

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
...
render() {
  return (
    <FormTextInput
      label={'Text Input'}
      reference={c => (this.txtTextRef = c)}
      required
    />
  );
}
```

## <a name="section-zipcode-input"> ZipcodeInput </a>

### Description

An zip code input with a default mask '00000-000'.

### Props

ZipCode input inherits [Base Input props](#section-base-input).

| Name | Type | Required | Default value | Description |
| ---- | ---- | -------- | ------------- | ----------- |
| -    | -    | -        | -             | -           |

### Methods

ZipCode input inherits [Base Input props](#section-base-input).

| Name | Params | Return | Description |
| ---- | ------ | ------ | ----------- |
| -    | -      | -      | -           |

### Usage example

```js
...
render() {
  return (
    <FormZipCodeInput
      label={'ZipCode Input'}
      reference={c => (this.txtZipCodeRef = c)}
      required
    />
  );
}
```
