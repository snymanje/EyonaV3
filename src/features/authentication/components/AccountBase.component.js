import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { Box, Heading } from 'native-base';

const backgroundImage = require('../../../../assets/splash.png');

const AccountBackground = styled.ImageBackground.attrs({
  source: backgroundImage,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const AccountBackgroundOverlay = styled(Box).attrs({
  width: '100%',
  height: '100%',
})`
  background-color: rgba(255, 255, 255, 0.6);
  justify-content: center;
  align-items: center;
`;

export const AccountBase = ({ children }) => (
  <AccountBackground>
    <AccountBackgroundOverlay>
      <Box safeArea p="6" py="1" w="95%" maxW="320" bg="white" opacity={0.9} borderRadius={10}>
        <Heading size="xl" mb="6" fontWeight="600" alignSelf="center" color="coolGray.800">
          Eyona
        </Heading>
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome
        </Heading>

        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>
        {children}
      </Box>
    </AccountBackgroundOverlay>
  </AccountBackground>
);

AccountBase.propTypes = {
  children: PropTypes.element.isRequired,
};
