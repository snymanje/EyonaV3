import React, { useContext, useEffect } from 'react';
import { Box, Button, VStack, FormControl, Input, CheckIcon, Heading, Select, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';
import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const BasicInfo = ({ navigation }) => {
  const { sites } = useContext(DeliveriesContext);
  const { delivery, UPDATE_FORM } = useContext(NewDeliveryContext);
  /* 
  useEffect(() => {
    console.log(delivery);
  }, [delivery]); */

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
              Order Number
            </FormControl.Label>
            <Input variant="underlined" placeholder="1234567" onChangeText={(value) => UPDATE_FORM({ order_number: value })} size="xl" />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
              pl={2}
            >
              Site Name
            </FormControl.Label>
            <Select
              variant="underlined"
              selectedValue={delivery.site_name}
              minWidth="200"
              accessibilityLabel="Choose Site"
              placeholder="Choose Site"
              _selectedItem={{
                bg: 'gray.300',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(value) => {
                UPDATE_FORM({ site_name: value });
                console.log(delivery);
              }}
              size="xl"
            >
              {sites.map((site) => (
                <Select.Item label={site.SiteName} value={site.SiteName} />
              ))}
            </Select>
          </FormControl>
          <Text>{delivery.site_name}</Text>
        </VStack>
        <VStack width="100%" px={5} mb={8}>
          <Button
            onPress={() => {
              navigation.navigate('Tank1Screen');
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
