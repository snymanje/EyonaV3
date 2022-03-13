import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Button } from 'native-base';
import { DeliveriesNavigator } from './deliveries.navigator';
import { NewDeliveriesNavigator } from './newDelivery.navigator';
import { SettingsScreen } from '../../features/settings/screens/Settings.screen';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  MyDeliveriesTab: 'md-list',
  /*   NewDeliveryTab: 'md-add', */
  SettingsTab: 'md-settings',
};

const ScreenOptions = ({ route, navigation }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
    headerShown: route.name !== 'NewDeliveryTab',
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: [
      {
        display: 'flex',
      },
      null,
    ],
    headerRight: () => (
      <Button
        onPress={() =>
          navigation.navigate('NewDeliveryTab', {
            screen: 'BasicInfoScreen',
            params: { delivery: null, formMode: 'New' },
          })
        }
      >
        New
      </Button>
    ),
    /* unmountOnBlur: true, */
  };
};

export const AppNavigator = () => (
  <Tab.Navigator screenOptions={ScreenOptions}>
    <Tab.Screen name="MyDeliveriesTab" component={DeliveriesNavigator} options={{ title: 'My Deliveries' }} />
    <Tab.Screen name="NewDeliveryTab" component={NewDeliveriesNavigator} options={{ title: 'New Delivery' }} />
    <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Settings' }} />
  </Tab.Navigator>
);
