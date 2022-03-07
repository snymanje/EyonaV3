import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { BasicInfo } from '../../features/newdelivery/screens/BasicInfo.screen';
import { Tank1Screen } from '../../features/newdelivery/screens/Tank1.screen';
import { SummaryScreen } from '../../features/newdelivery/screens/Summary.screen';
import { CaptureAGTScreen } from '../../features/newdelivery/screens/CaptureImage.screen';
import { NewDeliveryContextProvider } from '../../services/newDeliveries/NewDelivery.context';

const NewDeliveryStack = createStackNavigator();

export const NewDeliveriesNavigator = () => (
  <NewDeliveryContextProvider>
    <NewDeliveryStack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerShown: true,
      }}
    >
      <NewDeliveryStack.Screen
        name="BasicInfoScreen"
        component={BasicInfo}
        options={{ title: 'Capture New Delivery' }}
      />
      <NewDeliveryStack.Screen name="Tank1Screen" component={Tank1Screen} options={{ title: 'Capture New Delivery' }} />
      <NewDeliveryStack.Screen name="SummaryScreen" component={SummaryScreen} options={{ title: 'Summary' }} />
      <NewDeliveryStack.Screen
        name="CaptureAGTScreen"
        component={CaptureAGTScreen}
        options={{ title: 'CaptureAGTScreen' }}
      />
    </NewDeliveryStack.Navigator>
  </NewDeliveryContextProvider>
);
