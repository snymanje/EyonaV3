import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, FormControl, Input, Heading, Text, KeyboardAvoidingView, ScrollView, Select, CheckIcon } from 'native-base';

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const Tank1Screen = ({ navigation }) => {
  const { delivery, UPDATE_FORM } = useContext(NewDeliveryContext);

  const [fuelType, setFuelType] = useState(null);

  return (
    <Box pt={4} flex={1} bg="white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} style={{ flex: 1 }}>
        <Box flex={1}>
          <Heading size="xl" textAlign="center">
            Tank 1 Information
          </Heading>
          <ScrollView
            flex={1}
            _contentContainerStyle={{
              px: '20px',
              mb: '2',
              minW: '72',
            }}
          >
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
                    selectedValue={delivery.tank1_Product}
                    minWidth="200"
                    accessibilityLabel="Choose Product"
                    placeholder="Choose Product"
                    _selectedItem={{
                      bg: 'gray.300',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(value) => {
                      UPDATE_FORM({ tank1_Product: value });
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
                    selectedValue={delivery.tank1_size}
                    minWidth="200"
                    accessibilityLabel="Choose Tank Size"
                    placeholder="Choose Tank Size"
                    _selectedItem={{
                      bg: 'gray.300',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(value) => {
                      UPDATE_FORM({ tank1_size: value });
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
                    value={delivery.tank1_reading_before}
                    size="xl"
                    onChangeText={(value) => UPDATE_FORM({ tank1_reading_before: value })}
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
                    value={delivery.tank1_reading_after}
                    size="xl"
                    onChangeText={(value) => UPDATE_FORM({ tank1_reading_after: value })}
                    keyboardType="numeric"
                  />
                </FormControl>
                <Button
                  size="sm"
                  onPress={() => {
                    navigation.navigate('Tank2Screen');
                  }}
                  colorScheme="success"
                >
                  Add ATG Slip
                </Button>
                <VStack width="100%" px={5} space={2}>
                  <Heading size="md" textAlign="center">
                    Total Delivered
                  </Heading>
                  <Heading size="lg" textAlign="center">
                    0
                  </Heading>
                </VStack>
              </VStack>
              <VStack width="100%" px={5} mb={2}>
                <Button
                  size="lg"
                  onPress={() => {
                    navigation.navigate('Tank2Screen');
                  }}
                  mt="5"
                  colorScheme="primary"
                >
                  Continue
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
          </ScrollView>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

Tank1Screen.propTypes = {
  navigation: PropTypes.element.isRequired,
};
