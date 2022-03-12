import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { BasicInfo } from '../../features/newdelivery/screens/BasicInfo.screen';
import { Tank1Screen } from '../../features/newdelivery/screens/Tank1.screen';
import { Tank2Screen } from '../../features/newdelivery/screens/Tank2.screen';
import { SummaryScreen } from '../../features/newdelivery/screens/Summary.screen';
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
        initialParams={{ delivery: null, formMode: 'New' }}
      />
      <NewDeliveryStack.Screen name="Tank1Screen" component={Tank1Screen} options={{ title: 'Capture New Delivery' }} />
      <NewDeliveryStack.Screen name="Tank2Screen" component={Tank2Screen} options={{ title: 'Capture New Delivery' }} />
      <NewDeliveryStack.Screen name="SummaryScreen" component={SummaryScreen} options={{ title: 'Summary' }} />
    </NewDeliveryStack.Navigator>
  </NewDeliveryContextProvider>
);
