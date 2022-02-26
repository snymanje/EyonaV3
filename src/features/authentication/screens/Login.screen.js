import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, FormControl, HStack, Input, VStack, Text } from 'native-base';

import { AccountBase } from '../components/AccountBase.component';

import { AuthenticationContext } from '../../../services/authentication/Authentication.context';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, authError } = useContext(AuthenticationContext);

  return (
    <AccountBase>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input value={email} onChangeText={(u) => setEmail(u)} />
        </FormControl>

        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" value={password} onChangeText={(p) => setPassword(p)} />

          <Text underline alignSelf="flex-end" mt="1" color="indigo.500">
            Forget Password?
          </Text>
        </FormControl>

        <Button mt="2" colorScheme="primary" onPress={() => onLogin(email, password)}>
          Login
        </Button>

        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="coolGray.600">
            <Text>I&apos;m a new user.</Text>
          </Text>
          <Text underline color="indigo.500" onPress={() => navigation.navigate('Register')}>
            Sign up
          </Text>
        </HStack>
        {authError && (
          <Text fontSize="sm" mt={3} color="red.600" textAlign="center" fontWeight={700}>
            {authError.message}
          </Text>
        )}
      </VStack>
    </AccountBase>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.element.isRequired,
};
