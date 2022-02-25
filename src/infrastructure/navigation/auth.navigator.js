import React from 'react';

import {
	createStackNavigator
} from '@react-navigation/stack';

import { LoginScreen } from '../../features/authentication/screens/Login.screen';
import { RegisterScreen } from '../../features/authentication/screens/Registration.screen';

const AuthenticationStack = createStackNavigator();

export const AuthenticationNavigator = () => (
	<AuthenticationStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<AuthenticationStack.Screen
			name="Login"
			component={LoginScreen}
		/>
		<AuthenticationStack.Screen
			name="Register"
			component={RegisterScreen}
		/>
	</AuthenticationStack.Navigator>
);
