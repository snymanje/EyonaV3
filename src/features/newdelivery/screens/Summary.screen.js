import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const SummaryScreen = () => {
  const { delivery } = useContext(NewDeliveryContext);

  return (
    <View>
      <Text>{JSON.stringify(delivery, null, 2)}</Text>
    </View>
  );
};
