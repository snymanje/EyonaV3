import React, { useContext } from 'react';

import styled from 'styled-components/native';
import { Text } from 'react-native';
import { Button } from 'native-base';

import { AuthenticationContext } from '../../../services/authentication/Authentication.context';

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// import { Text } from "../../../components/typography/text.component";

export const SettingsScreen = () => {
  const { onLogout, error } = useContext(AuthenticationContext);

  return (
    <Screen>
      <Text variant="body">Feature 3</Text>
      <Button onPress={() => onLogout()}>Logout</Button>
    </Screen>
  );
};
