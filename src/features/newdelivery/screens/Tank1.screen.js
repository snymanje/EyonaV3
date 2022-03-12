import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  VStack,
  FormControl,
  Input,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  CheckIcon,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Platform } from 'react-native';
import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

const schema = yup
  .object({
    tank1product: yup.string().required('Field is required'),
    tank1size: yup.string().required('Field is required'),
    tank1_reading_before: yup.string().required('Field is required'),
    tank1_reading_after: yup.string().required('Field is required'),
  })
  .required();

export const Tank1Screen = ({ navigation }) => {
  const { delivery, tanks, UPDATE_FORM_TANKS } = useContext(NewDeliveryContext);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (formData) => {
    UPDATE_FORM_TANKS({ 1: formData });
    navigation.navigate('SummaryScreen');
  };

  return (
    <Box pt={4} flex={1} bg="white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        style={{ flex: 1 }}
      >
        <Box flex={1}>
          <Heading size="xl" textAlign="center">
            Tank 1 Information
          </Heading>
          <ScrollView flex={1} _contentContainerStyle={{ px: '20px' }}>
            <Box mt={8} flex={1} justifyContent="space-between">
              <VStack width="100%" px={5} space={6}>
                <FormControl isRequired isInvalid={'tank1product' in errors}>
                  <FormControl.Label>Product:</FormControl.Label>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        size="md"
                        placeholder="Select Product"
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                        }}
                        _selectedItem={{
                          bg: 'gray.300',
                          endIcon: <CheckIcon size="5" />,
                        }}
                      >
                        <Select.Item label="D50" value="D50" />
                        <Select.Item label="ULP" value="ULP" />
                        <Select.Item label="Paraffin" value="Paraffin" />
                        <Select.Item label="N/A" value="N/A" />
                      </Select>
                    )}
                    name="tank1product"
                    defaultValue={delivery.tank1product}
                  />
                  <FormControl.ErrorMessage>{errors.tank1product?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'tank1size' in errors}>
                  <FormControl.Label>Tank Size:</FormControl.Label>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        size="md"
                        placeholder="Select Size"
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                        }}
                        _selectedItem={{
                          bg: 'gray.300',
                          endIcon: <CheckIcon size="5" />,
                        }}
                      >
                        <Select.Item label="9000" value="9000" />
                        <Select.Item label="23000" value="23000" />
                        <Select.Item label="N/A" value="N/A" />
                      </Select>
                    )}
                    name="tank1size"
                    defaultValue={delivery.tank1size}
                  />
                  <FormControl.ErrorMessage>{errors.tank1size?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'tank1_reading_before' in errors}>
                  <FormControl.Label>Reading Before</FormControl.Label>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        keyboardType="numeric"
                        size="md"
                        autoCapitalize="characters"
                        onBlur={onBlur}
                        placeholder="123456"
                        onChangeText={(val) => {
                          onChange(val);
                          const readAfter = +getValues('tank1_reading_after') - +val;
                          setValue('tank1_total_delivered', readAfter.toString());
                        }}
                        value={value}
                      />
                    )}
                    name="tank1_reading_before"
                    defaultValue={delivery.tank1_reading_before}
                  />
                  <FormControl.ErrorMessage>{errors.tank1_reading_before?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'tank1_reading_after' in errors}>
                  <FormControl.Label>Reading After</FormControl.Label>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        keyboardType="numeric"
                        size="md"
                        autoCapitalize="characters"
                        onBlur={onBlur}
                        placeholder="123456"
                        onChangeText={(val) => {
                          onChange(val);
                          const readBefore = +val - +getValues('tank1_reading_before');
                          setValue('tank1_total_delivered', readBefore.toString());
                        }}
                        value={value}
                      />
                    )}
                    name="tank1_reading_after"
                    defaultValue={delivery.tank1_reading_after}
                  />
                  <FormControl.ErrorMessage>{errors.tank1_reading_after?.message}</FormControl.ErrorMessage>
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
                <VStack width="100%" px={5}>
                  <FormControl>
                    <FormControl.Label alignSelf="center" _text={{ fontSize: 'xl' }} my={0}>
                      Total Delivered
                    </FormControl.Label>
                    <Controller
                      control={control}
                      render={({ field: { value } }) => (
                        <Input
                          size="md"
                          value={value}
                          isDisabled
                          _disabled={{
                            bg: 'white',
                            borderStyle: 'dashed',
                            borderColor: 'white',
                            fontSize: '35',
                            fontWeight: 'bold',
                          }}
                          alignSelf="center"
                          py={0}
                        />
                      )}
                      name="tank1_total_delivered"
                      defaultValue={delivery.tank1_total_delivered}
                    />
                  </FormControl>
                </VStack>
              </VStack>
              <VStack width="100%" px={5} mb={2}>
                <Button isDisabled={!isValid} size="lg" onPress={handleSubmit(onSubmit)} mt="5" colorScheme="primary">
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
