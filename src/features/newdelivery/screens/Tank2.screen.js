import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, FormControl, Input, Heading, Text, KeyboardAvoidingView, ScrollView, Select, CheckIcon } from 'native-base';

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const Tank2Screen = ({ navigation }) => {
  const { delivery, UPDATE_FORM } = useContext(NewDeliveryContext);

  const [fuelType, setFuelType] = useState(null);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0} style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        _contentContainerStyle={{
          px: '20px',
          mb: '2',
          minW: '72',
        }}
      >
        <Box safeAreaTop="16">
          <Heading size="xl" textAlign="center" pt={4}>
            Tank 2 Information
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
                  Product
                </FormControl.Label>
                <Select
                  variant="underlined"
                  selectedValue={delivery.tank2_Product}
                  minWidth="200"
                  accessibilityLabel="Choose Product"
                  placeholder="Choose Product"
                  _selectedItem={{
                    bg: 'gray.300',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(value) => {
                    UPDATE_FORM({ tank2_Product: value });
                  }}
                  size="xl"
                >
                  <Select.Item label="D50" value="D50" />
                  <Select.Item label="ULP" value="ULP" />
                  <Select.Item label="Paraffin" value="Paraffin" />
                  <Select.Item label="N/A" value="N/A" />
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                  pl={2}
                >
                  Tank Size
                </FormControl.Label>
                <Select
                  variant="underlined"
                  selectedValue={delivery.tank2_size}
                  minWidth="200"
                  accessibilityLabel="Choose Tank Size"
                  placeholder="Choose Tank Size"
                  _selectedItem={{
                    bg: 'gray.300',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(value) => {
                    UPDATE_FORM({ tank2_size: value });
                  }}
                  size="xl"
                >
                  <Select.Item label="9000" value="9000" />
                  <Select.Item label="23000" value="23000" />
                  <Select.Item label="N/A" value="N/A" />
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                  pl={2}
                >
                  Reading Before
                </FormControl.Label>
                <Input
                  variant="underlined"
                  placeholder="120399"
                  value={delivery.tank2_reading_before}
                  size="xl"
                  onChangeText={(value) => UPDATE_FORM({ tank2_reading_before: value })}
                  keyboardType="numeric"
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                  pl={2}
                >
                  Reading After
                </FormControl.Label>
                <Input
                  variant="underlined"
                  placeholder="120399"
                  value={delivery.tank2_reading_after}
                  size="xl"
                  onChangeText={(value) => UPDATE_FORM({ tank2_reading_after: value })}
                  keyboardType="numeric"
                />
              </FormControl>
              <Text>Total Delivered</Text>
              <Text>0</Text>
            </VStack>
            <VStack width="100%" px={5} mb={2}>
              <Button
                onPress={() => {
                  console.log(delivery);
                }}
                mt="5"
                colorScheme="primary"
              >
                Save & Continue
              </Button>
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
                mt="2"
                colorScheme="coolGray"
              >
                Back
              </Button>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Tank2Screen.propTypes = {
  navigation: PropTypes.element.isRequired,
};
