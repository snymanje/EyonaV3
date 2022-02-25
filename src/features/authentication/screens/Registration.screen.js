import React, { useContext, useState } from 'react';
import { Box, Button, Center, FormControl, Heading, Input, VStack, Link, Text, HStack } from 'native-base';

import { AuthenticationContext } from '../../../services/authentication/Authentication.context';

export const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { onRegister, error  } = useContext(AuthenticationContext);

	return <Center w="100%">
		<Box safeArea p="2" w="90%" maxW="290" py="8">
			<Heading size="lg" color="coolGray.800" _dark={{
				color: 'warmGray.50'
			}} fontWeight="semibold">
          Welcome
			</Heading>
			<Heading mt="1" color="coolGray.600" _dark={{
				color: 'warmGray.200'
			}} fontWeight="medium" size="xs">
          Sign up to continue!
			</Heading>
			<VStack space={3} mt="5">
				<FormControl>
					<FormControl.Label>Email ID</FormControl.Label>
					<Input value={email} onChangeText={(u) => setEmail(u)}/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Password</FormControl.Label>
					<Input type="password" value={password} onChangeText={(p) => setPassword(p)}/>
					<Link _text={{
						fontSize: 'xs',
						fontWeight: '500',
						color: 'indigo.500'
					}} alignSelf="flex-end" mt="1">
              Forget Password?
					</Link>
				</FormControl>
				<Button mt="2" colorScheme="indigo" onPress={() => onRegister(email, password)}>
            Sign up
				</Button>
				<HStack mt="6" justifyContent="center">
					<Text fontSize="sm" color="coolGray.600" _dark={{
						color: 'warmGray.200'
					}}>
              Already signed up? {' '}
					</Text>
					<Link _text={{
						color: 'indigo.500',
						fontWeight: 'medium',
						fontSize: 'sm'
					}} onPress={() => navigation.navigate('Login')}>
              Login
					</Link>
				</HStack>
			</VStack>
		</Box>
	</Center>;
};