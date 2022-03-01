import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, FormControl, Input, CheckIcon, Heading, Select, ScrollView, KeyboardAvoidingView } from 'native-base';

import { Platform } from 'react-native';
import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';
import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const BasicInfo = ({ navigation }) => {
  const { sites } = useContext(DeliveriesContext);
  const { delivery, UPDATE_FORM } = useContext(NewDeliveryContext);

  useEffect(() => {
    console.log(delivery);
  }, [delivery]);

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
          <Heading size="xl" textAlign="center">
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
                <Input
                  variant="underlined"
                  placeholder="1234567"
                  onChangeText={(value) => UPDATE_FORM({ order_number: value.toUpperCase() })}
                  size="xl"
                  autoCapitalize="characters"
                />
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
                    const accNumber = sites.filter((site) => site.SiteName === value)[0].AccountNumber;
                    UPDATE_FORM({ site_name: value, acc_number: accNumber });
                  }}
                  size="xl"
                >
                  {sites.map((site) => (
                    <Select.Item label={site.SiteName} value={site.SiteName} />
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                  pl={2}
                >
                  Acc Number
                </FormControl.Label>
                <Input variant="underlined" placeholder="1234567" value={delivery.acc_number} size="xl" isDisabled="true" />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                  pl={2}
                >
                  Odometer
                </FormControl.Label>
                <Input
                  variant="underlined"
                  placeholder="120399"
                  value={delivery.odometer}
                  size="xl"
                  onChangeText={(value) => UPDATE_FORM({ odometer: value })}
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
                  Vehicle Reg No
                </FormControl.Label>
                <Input
                  variant="underlined"
                  placeholder="120399"
                  value={delivery.vehRegNum}
                  size="xl"
                  onChangeText={(value) => UPDATE_FORM({ veh_reg_num: value })}
                  autoCapitalize="characters"
                />
              </FormControl>
            </VStack>
            <VStack width="100%" px={5} mb={1}>
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
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

BasicInfo.propTypes = {
  navigation: PropTypes.element.isRequired,
};
