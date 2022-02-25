import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Center, FormControl, Heading, HStack, Input, VStack, Link, Text } from 'native-base';

import { ImageBackground } from 'react-native';
import { AuthenticationContext } from '../../../services/authentication/Authentication.context';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, authError } = useContext(AuthenticationContext);

  return (
    <ImageBackground source={require('../../../../assets/splash.png')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
      <Center w="100%" height="100%">
        <Center w="100%" height="100%" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
          <Box safeArea p="6" py="1" w="95%" maxW="320" bg="white" opacity={0.9} borderRadius={10}>
            <Heading
              size="xl"
              mb="6"
              fontWeight="600"
              alignSelf="center"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
            >
              Eyona
            </Heading>
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
            >
              Welcome
            </Heading>

            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>

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

              <Button mt="2" colorScheme="indigo" onPress={() => onLogin(email, password)}>
                Sign in
              </Button>

              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  <Text>I&apos;m a new user. </Text>
                </Text>
                <Text underline color="indigo.500" onPress={() => navigation.navigate('Register')}>
                  Sign Up
                </Text>
              </HStack>
              {authError && (
                <Text fontSize="sm" mt={3} color="red.600" style={{ textAlign: 'center' }}>
                  {authError.message}
                </Text>
              )}
            </VStack>
          </Box>
        </Center>
      </Center>
    </ImageBackground>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.element.isRequired,
};
