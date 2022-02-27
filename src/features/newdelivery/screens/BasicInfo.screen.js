import React, { useState, useContext } from 'react';
import { Box, Button, VStack, FormControl, Input, CheckIcon, Heading, Select, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';

export const BasicInfo = ({ navigation }) => {
  const [formData, setData] = useState({});

  const { sites } = useContext(DeliveriesContext);

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
            <Input variant="underlined" placeholder="1234567" onChangeText={(value) => setData({ ...formData, order_number: value })} size="xl" />
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
              selectedValue={formData.site_name}
              minWidth="200"
              accessibilityLabel="Choose Site"
              placeholder="Choose Site"
              _selectedItem={{
                bg: 'gray.300',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(value) => {
                setData({ ...formData, site_name: value });
                console.log(formData);
              }}
              size="xl"
            >
              {sites.map((site) => (
                <Select.Item label={site.SiteName} value={site.SiteName} />
              ))}
            </Select>
          </FormControl>
        </VStack>
        <VStack width="100%" px={5} mb={8}>
          <Button
            onPress={() => {
              navigation.navigate('Tank1Screen');
            }}
            mt="5"
            colorScheme="primary"
          >
            Next
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
