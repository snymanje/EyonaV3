import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DeliveryDetailsScreen = ({ route, navigation }) => {
  const { delivery } = route.params;

  return (
    <View style={styles.screen}>
      <Text>My Deliveries Details</Text>
      <Text>{delivery.ordernumber}</Text>
      <Text>{JSON.stringify(delivery, null, 2)}</Text>
      <Button
        onPress={() =>
          navigation.navigate('NewDelivery', { screen: 'BasicInfoScreen', params: { delivery, formMode: 'Edit' } })
        }
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
