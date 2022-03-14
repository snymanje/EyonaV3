import React, { useContext } from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const DeliveryDetailsScreen = ({ route, navigation }) => {
  const { delivery } = route.params;

  const { setFormData } = useContext(NewDeliveryContext);

  return (
    <View style={styles.screen}>
      <Text>My Deliveries Details</Text>
      <Text>{delivery.ordernumber}</Text>
      <Text>{JSON.stringify(delivery, null, 2)}</Text>
      <Button
        onPress={async () => {
          await setFormData(delivery);
          navigation.navigate('NewDeliveryTab');
        }}
      >
        Edit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
