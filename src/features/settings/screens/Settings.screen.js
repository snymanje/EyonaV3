import React from 'react';

import styled from 'styled-components/native';
import { Text } from 'react-native';

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// import { Text } from "../../../components/typography/text.component";

export const SettingsScreen = () => {
	return (
		<Screen>
			<Text variant="body">Feature 3</Text>
		</Screen>
	);
};
