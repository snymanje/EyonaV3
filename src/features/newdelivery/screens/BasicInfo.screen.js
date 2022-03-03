import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, FormControl, Input, Text, Heading, Select, ScrollView, KeyboardAvoidingView, CheckIcon } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Platform } from 'react-native';
import Icon from 'react-native-ionicons';
import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';
import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

const schema = yup
  .object({
    ordernumber: yup.string().required('Field is required'),
    sitename: yup.string().required('Field is required'),
    accnumber: yup.string().required('Field is required'),
  })
  .required();

export const BasicInfo = () => {
  const { sites } = useContext(DeliveriesContext);
  const { delivery, UPDATE_FORM } = useContext(NewDeliveryContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { ...delivery },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => UPDATE_FORM({ ...delivery, ...data });

  useEffect(() => {
    console.log(delivery);
  }, [delivery]);

  return (
    <Box pt={4} flex={1} bg="white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} style={{ flex: 1 }}>
        <Box flex={1} pt={5}>
          <Heading size="xl" textAlign="center">
            Site Information
          </Heading>
          <ScrollView flex={1} _contentContainerStyle={{ px: '20px' }}>
            <Box mt={8} flex={1} justifyContent="space-between">
              <VStack width="100%" px={5} space={6}>
                <FormControl isRequired isInvalid={'ordernumber' in errors}>
                  <FormControl.Label>Order Number</FormControl.Label>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input autoCapitalize="characters" onBlur={onBlur} placeholder="O123456" onChangeText={(val) => onChange(val)} value={value} />
                    )}
                    name="ordernumber"
                    defaultValue={delivery.ordernumber}
                  />
                  <FormControl.ErrorMessage>{errors.ordernumber?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'sitename' in errors}>
                  <FormControl.Label>Select Site:</FormControl.Label>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder="Select Site"
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                          setValue('accnumber', sites.filter((site) => site.SiteName === value)[0].AccountNumber);
                        }}
                        selectedItemBg="teal.400"
                        dropdownOpenIcon={<Icon name="arrow-drop-up" type="MaterialIcons" size={6} />}
                        dropdownCloseIcon={<Icon name="arrow-drop-down" type="MaterialIcons" size={6} />}
                      >
                        {sites.map((site) => (
                          <Select.Item key={site.Id} label={site.SiteName} value={site.SiteName} />
                        ))}
                      </Select>
                    )}
                    name="sitename"
                    defaultValue={delivery.sitename}
                  />
                  <FormControl.ErrorMessage>{errors.language?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'accnumber' in errors}>
                  <FormControl.Label>Account Number</FormControl.Label>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input autoCapitalize="characters" onBlur={onBlur} placeholder="A123456" onChangeText={(val) => onChange(val)} value={value} />
                    )}
                    name="accnumber"
                    defaultValue={delivery.accnumber}
                  />
                  <FormControl.ErrorMessage>{errors.accnumber?.message}</FormControl.ErrorMessage>
                </FormControl>

                <Button
                  /*  isDisabled={!formProps.isValid || Object.keys(formProps.values).length === 0} */
                  size="lg"
                  onPress={handleSubmit(onSubmit)}
                  mt="5"
                  colorScheme="primary"
                >
                  Save & Continue
                </Button>
              </VStack>
            </Box>
          </ScrollView>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

/* BasicInfo.propTypes = {
  navigation: PropTypes.element.isRequired,
}; */
