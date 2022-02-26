import React from 'react';

import { NativeBaseProvider } from 'native-base';

import { LogBox } from 'react-native';
import { Navigation } from './src/infrastructure/navigation/index';

import { theme } from './src/infrastructure/theme/nativebase-custom-theme';
import { DeliveriesContextProvider } from './src/services/deliveries/Deliveries.context';
import { AuthenticationContextProvider } from './src/services/authentication/Authentication.context';

LogBox.ignoreLogs(['NativeBase:']);

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthenticationContextProvider>
        <DeliveriesContextProvider>
          <Navigation />
        </DeliveriesContextProvider>
      </AuthenticationContextProvider>
    </NativeBaseProvider>
  );
}
