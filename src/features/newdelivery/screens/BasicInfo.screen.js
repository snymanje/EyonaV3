import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  VStack,
  FormControl,
  Input,
  Heading,
  Select,
  ScrollView,
  KeyboardAvoidingView,
  CheckIcon,
  Text,
  Hidden,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Location from 'expo-location';

import { Platform } from 'react-native';
import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';
import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

const schema = yup
  .object({
    ordernumber: yup.string().required('Field is required'),
    sitename: yup.string().required('Field is required'),
  })
  .required();

export const BasicInfo = ({ navigation }) => {
  const { sites } = useContext(DeliveriesContext);
  const { deliveryState, onSubmit } = useContext(NewDeliveryContext);

  const [formData, setFormData] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      reset(deliveryState);
      setFormData(deliveryState);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      setValue('longitude', locationData.coords.longitude.toString());
      setValue('latitude', locationData.coords.latitude.toString());
    })();
  }, [deliveryState, reset, setValue]);

  const onSaveContinue = async (payload) => {
    onSubmit({ ...deliveryState, ...payload });
    navigation.navigate('Tank1Screen');
  };

  return (
    <Box pt={4} flex={1} bg="white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        style={{ flex: 1 }}
      >
        <Box flex={1} pt={5}>
          <Heading size="xl" textAlign="center">
            Site Information
          </Heading>
          <ScrollView flex={1} _contentContainerStyle={{ px: '20px' }}>
            <Box mt={8} flex={1} justifyContent="space-between">
              <VStack width="100%" px={5} space={6}>
                {deliveryState.Id && (
                  <FormControl>
                    <Controller
                      key="Id"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Hidden>
                          <Input size="md" onChangeText={(val) => onChange(val)} value={value} />
                        </Hidden>
                      )}
                      name="Id"
                      defaultValue={deliveryState.Id ? formData?.Id : ''}
                    />
                  </FormControl>
                )}

                <FormControl isRequired isInvalid={'ordernumber' in errors}>
                  <FormControl.Label>Order Number</FormControl.Label>
                  <Controller
                    key="ordernumber"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        size="md"
                        autoCapitalize="characters"
                        onBlur={onBlur}
                        placeholder="O123456"
                        onChangeText={(val) => onChange(val)}
                        value={value}
                      />
                    )}
                    name="ordernumber"
                    defaultValue={deliveryState.Id ? formData?.ordernumber : ''}
                  />
                  <FormControl.ErrorMessage>{errors.ordernumber?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'sitename' in errors}>
                  <FormControl.Label>Select Site:</FormControl.Label>
                  <Controller
                    key="sitename"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        size="md"
                        placeholder="Select Site"
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                          setValue('accnumber', sites.filter((site) => site.SiteName === itemValue)[0].AccountNumber);
                        }}
                        _selectedItem={{
                          bg: 'gray.300',
                          endIcon: <CheckIcon size="5" />,
                        }}
                      >
                        {sites.map((site) => (
                          <Select.Item key={site.Id} label={site.SiteName} value={site.SiteName} />
                        ))}
                      </Select>
                    )}
                    name="sitename"
                    defaultValue={deliveryState.Id ? formData?.sitename : ''}
                  />
                  <FormControl.ErrorMessage>{errors.sitename?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'accnumber' in errors}>
                  <FormControl.Label>Account Number</FormControl.Label>
                  <Controller
                    key="accnumber"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        size="md"
                        isDisabled
                        autoCapitalize="characters"
                        onBlur={onBlur}
                        onChangeText={(val) => onChange(val)}
                        value={value}
                      />
                    )}
                    name="accnumber"
                    defaultValue={deliveryState.Id ? formData?.accnumber : ''}
                  />
                  <FormControl.ErrorMessage>{errors.accnumber?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl>
                  <FormControl.Label>Longitude</FormControl.Label>
                  <Controller
                    key="longitude"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input size="md" onChangeText={(val) => onChange(val)} value={value} isDisabled />
                    )}
                    name="longitude"
                    defaultValue={deliveryState.Id ? formData?.longitude?.toString() : ''}
                  />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Latitude</FormControl.Label>
                  <Controller
                    key="latitude"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input size="md" onChangeText={(val) => onChange(val)} value={value} isDisabled />
                    )}
                    name="latitude"
                    defaultValue={deliveryState.Id ? formData?.latitude?.toString() : ''}
                  />
                </FormControl>

                <Button
                  isDisabled={!isValid}
                  size="lg"
                  onPress={handleSubmit(onSaveContinue)}
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

BasicInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
