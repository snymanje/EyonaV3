import { Button } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DeliveryDetailsScreen = ({ route, navigation }) => {
  const { delivery } = route.params;

  useEffect(() => {
    console.log(route);
  });

  return (
    <View style={styles.screen}>
      <Text>My Deliveries Details</Text>
      <Text>{delivery.ordernumber}</Text>
      <Button onPress={() => navigation.navigate('NewDelivery', { screen: 'BasicInfoScreen', params: { delivery } })}>
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
