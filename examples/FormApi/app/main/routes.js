import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from '../home';

export const Routes = {
  Home: {
    screen: Home,
  },
};

const AppNavigator = createStackNavigator(
  Routes,
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default AppNavigator;