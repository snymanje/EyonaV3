import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app.navigator';
import { AuthenticationNavigator } from './auth.navigator';

import { AuthenticationContext } from '../../services/authentication/Authentication.context';

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return <NavigationContainer>{isAuthenticated ? <AppNavigator /> : <AuthenticationNavigator />}</NavigationContainer>;
};
