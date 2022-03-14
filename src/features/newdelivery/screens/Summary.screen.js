import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { VStack, Text, Button, Box, Divider, ScrollView } from 'native-base';
import Collapsible from 'react-native-collapsible';

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const SummaryScreen = ({ navigation }) => {
  const [isCollapsedBasicInfo, setIsCollapsedBasicInfo] = useState(false);
  const [isCollapsedTank1, setIsCollapsedTank1] = useState(true);

  const { deliveryState } = useContext(NewDeliveryContext);

  useEffect(() => {
    console.log(deliveryState);
  }, [deliveryState]);

  return (
    <ScrollView flex={1}>
      <Box flex={1} alignItems="center" bg="white">
        <View space="4" divider={<Divider />} mt={4}>
          <View>
            <Text
              width="100%"
              fontSize="xl"
              onPress={() => setIsCollapsedBasicInfo(!isCollapsedBasicInfo)}
              textAlign="center"
              alignItems="center"
              justifyContent="center"
            >
              General Information
            </Text>
          </View>
          <Collapsible collapsed={isCollapsedBasicInfo}>
            <Box px="4">{JSON.stringify(deliveryState, null, 2)}</Box>
          </Collapsible>
        </View>

        <VStack space="4" divider={<Divider />}>
          <Box px="4" pt="4">
            <Text width="100%" fontSize="xl" onPress={() => setIsCollapsedTank1(!isCollapsedTank1)} textAlign="center">
              Tank 1 Information
            </Text>
          </Box>
          <Collapsible collapsed={isCollapsedTank1}>
            <Box px="4">{JSON.stringify(deliveryState, null, 2)}</Box>
          </Collapsible>
        </VStack>
      </Box>
    </ScrollView>
  );
};

SummaryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
