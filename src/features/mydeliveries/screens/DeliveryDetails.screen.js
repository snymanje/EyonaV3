import React, { useContext } from 'react';
import { Button, Image, Row } from 'native-base';
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
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: delivery.Tank1ImageUrl }} alt="image" width={100} height={100} />
        <Image source={{ uri: delivery.Tank2ImageUrl }} alt="image" width={100} height={100} />
      </View>
      <Button
        onPress={async () => {
          await setFormData(delivery);
          navigation.goBack();
          navigation.reset({
            index: 0,
            routes: [{ name: 'NewDeliveryTab' }],
          });
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
