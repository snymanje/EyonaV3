import React, { useContext } from 'react';
import { Box, Button, VStack, FormControl, Input, CheckIcon, Heading, Select, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';
import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const Tank1Screen = ({ navigation }) => {
  const { delivery, UPDATE_FORM } = useContext(NewDeliveryContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Heading size="xl" textAlign="center" pt={4}>
        Site Information
      </Heading>
      <Box mt={8} flex={1} justifyContent="space-between">
        <VStack width="100%" px={5} space={8}>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
              pl={2}
            >
              Acc Number
            </FormControl.Label>
            <Input variant="underlined" placeholder="1234567" onChangeText={(value) => UPDATE_FORM({ acc_number: value })} size="xl" />
          </FormControl>

          <Text>{delivery.site_name}</Text>
        </VStack>
        <VStack width="100%" px={5} mb={8}>
          <Button
            onPress={() => {
              console.log(delivery);
            }}
            mt="5"
            colorScheme="primary"
          >
            Save & Continue
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
