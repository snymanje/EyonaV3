import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { MyDeliveriesScreen } from "../../features/mydeliveries/screens/MyDeliveries.screen";
import { DeliveryDetailsScreen } from "../../features/mydeliveries/screens/DeliveryDetails.screen";

const RestaurantStack = createStackNavigator();

export const DeliveriesNavigator = () => (
  <RestaurantStack.Navigator
    screenOptions={{
      ...TransitionPresets.ModalSlideFromBottomIOS,
      headerShown: false,
    }}
  >
    <RestaurantStack.Screen
      name="MyDeliveriesTab"
      component={MyDeliveriesScreen}
    />
    <RestaurantStack.Screen
      name="DeliveryDetail"
      component={DeliveryDetailsScreen}
    />
  </RestaurantStack.Navigator>
);
