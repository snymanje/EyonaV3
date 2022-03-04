import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { BasicInfo } from '../../features/newdelivery/screens/BasicInfo.screen';
import { Tank1Screen } from '../../features/newdelivery/screens/Tank1.screen';
import { Tank2Screen } from '../../features/newdelivery/screens/Tank2.screen';
import { SummaryScreen } from '../../features/newdelivery/screens/Summary.screen';
/* import { CaptureATGSlipScreen } from "../../features/newdelivery/screens/CaptureImage.screen"; */

import { NewDeliveryContextProvider } from '../../services/newDeliveries/NewDelivery.context';

const NewDeliveryStack = createStackNavigator();

export const NewDeliveriesNavigator = () => (
  <NewDeliveryContextProvider>
    <NewDeliveryStack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        /*  ...TransitionPresets.ModalSlideFromBottomIOS, */
        headerShown: true,
      }}
    >
      <NewDeliveryStack.Screen name="BasicInfoScreen" component={BasicInfo} options={{ title: 'Capture New Delivery' }} />
      <NewDeliveryStack.Screen
        name="Tank1Screen"
        component={Tank1Screen}
        options={{ title: 'Capture New Delivery' }} /* initialParams={{ capturedImage: null }} */
      />
      <NewDeliveryStack.Screen name="Tank2Screen" component={Tank2Screen} options={{ title: 'Capture New Delivery' }} />
      {/*
      <NewDeliveryStack.Screen
        name="CaptureATGSlipScreen"
        component={CaptureATGSlipScreen}
        options={{ title: "Upload ATG Slip" }}
      /> */}
      <NewDeliveryStack.Screen name="SummaryScreen" component={SummaryScreen} options={{ title: 'Summary' }} />
    </NewDeliveryStack.Navigator>
  </NewDeliveryContextProvider>
);
