import React from 'react';

import { NativeBaseProvider} from 'native-base';

import { Navigation } from './src/infrastructure/navigation/index';

import { theme } from './src/infrastructure/theme/nativebase-custom-theme';
import { DeliveriesContextProvider } from './src/services/deliveries/Deliveries.context';
import { AuthenticationContextProvider } from './src/services/authentication/Authentication.context';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['NativeBase:']);

export const App = () => {
	return (
		<NativeBaseProvider theme={theme}>
			<AuthenticationContextProvider>
				<DeliveriesContextProvider>
					<Navigation />
				</DeliveriesContextProvider>
			</AuthenticationContextProvider>
		</NativeBaseProvider>
	);
};
