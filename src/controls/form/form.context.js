import React from 'react';

const FormContext = React.createContext({});

export const FormContextProvider = FormContext.Provider;
export const FormContextConsumer = FormContext.Consumer;
