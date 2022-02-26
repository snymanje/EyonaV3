import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, FormControl, HStack, Input, VStack, Text } from 'native-base';

import { AccountBase } from '../components/AccountBase.component';

import { AuthenticationContext } from '../../../services/authentication/Authentication.context';

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onRegister, authError } = useContext(AuthenticationContext);

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

        <Button mt="2" colorScheme="primary" onPress={() => onRegister(email, password)}>
          Sign up
        </Button>

        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="coolGray.600">
            <Text>I already have an account. </Text>
          </Text>
          <Text underline color="indigo.500" onPress={() => navigation.navigate('Login')}>
            Login
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

RegisterScreen.propTypes = {
  navigation: PropTypes.element.isRequired,
};
