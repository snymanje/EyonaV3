import React from 'react';
import PropTypes from 'prop-types';
import { VStack, Text, Button, CheckCircleIcon } from 'native-base';

export const SummaryScreen = ({ navigation }) => (
  <VStack space={2} flex={1} bg="white" alignItems="center" justifyContent="center">
    <Text fontSize="lg">Order Placed Successfully</Text>
    <CheckCircleIcon size="10" mt="0.5" color="emerald.500" />
    <Button size="md" variant="link" onPress={() => navigation.navigate('MyDeliveriesTab')}>
      Go To My Deliveries
    </Button>
  </VStack>
);

SummaryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
