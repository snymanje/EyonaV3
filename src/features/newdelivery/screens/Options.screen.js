import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'native-base';

export const OptionsScreen = ({ navigation }) => (
  <View>
    <Text>Untitled-1</Text>
    <Button
      onPress={navigation.navigate('NewDeliveryTab', {
        screen: 'BasicInfoScreen',
        params: { delivery: null, formMode: 'New' },
      })}
    >
      New Delivery
    </Button>
  </View>
);
