import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, FormControl, Input, Heading, Text, KeyboardAvoidingView, ScrollView, Select, CheckIcon } from 'native-base';

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const Tank1Screen = ({ navigation }) => {
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
            Tank 1 Information
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
                  Fuel Type
                </FormControl.Label>
                <Select
                  variant="underlined"
                  selectedValue={delivery.tank1_fuel_type}
                  minWidth="200"
                  accessibilityLabel="Choose Site"
                  placeholder="Choose Site"
                  _selectedItem={{
                    bg: 'gray.300',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(value) => {
                    UPDATE_FORM({ tank1_fuel_type: value });
                  }}
                  size="xl"
                >
                  <Select.Item label="D50" value="D50" />
                  <Select.Item label="ULP" value="ULP" />
                  <Select.Item label="Paraffin" value="Paraffin" />
                </Select>
              </FormControl>
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

Tank1Screen.propTypes = {
  navigation: PropTypes.element.isRequired,
};
