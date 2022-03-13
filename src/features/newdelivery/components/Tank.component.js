import React, { useContext, useState, useEffect } from 'react';
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
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

import { supabase } from '../../../lib/supabase';

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const TankCore = ({ navigation, schema, formFields, title, nextScreen, delivery }) => {
  const [image, setImage] = useState(null);

  const { UPDATE_FORM } = useContext(NewDeliveryContext);

  console.log(delivery);

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

  const onSubmit = async (payload) => {
    UPDATE_FORM(payload);
    navigation.navigate(nextScreen, { delivery });
  };

  const UploadImage = async (imageResult) => {
    const { data, error } = await supabase.storage.from('agtslips').upload(`ABC123.png`, decode(imageResult.base64), {
      contentType: 'image/png',
    });
    console.log(data, error);
  };

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.5,
    });
    setImage(pickerResult);
    await UploadImage(pickerResult);
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
            {title}
          </Heading>
          <ScrollView flex={1} _contentContainerStyle={{ px: '20px' }}>
            <Box mt={8} flex={1} justifyContent="space-between">
              <VStack width="100%" px={5} space={6}>
                <FormControl isRequired isInvalid={formFields.Product in errors}>
                  <FormControl.Label>Product:</FormControl.Label>
                  <Controller
                    key={formFields.Product}
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
                    name={formFields.Product}
                    defaultValue={
                      delivery && delivery[formFields?.Product] ? delivery[formFields?.Product].toString() : ''
                    }
                  />
                  <FormControl.ErrorMessage>{errors[formFields.Product]?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formFields.Size in errors}>
                  <FormControl.Label>Tank Size:</FormControl.Label>
                  <Controller
                    key={formFields.Size}
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
                    name={formFields.Size}
                    defaultValue={delivery && delivery[formFields?.Size] ? delivery[formFields?.Size].toString() : ''}
                  />
                  <FormControl.ErrorMessage>{errors[formFields.Size]?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formFields.ReadingBefore in errors}>
                  <FormControl.Label>Reading Before</FormControl.Label>
                  <Controller
                    key={formFields.ReadingBefore}
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
                          const readAfter = +getValues(formFields.ReadingAfter) - +val;
                          setValue(formFields.TotalDelivered, readAfter.toString());
                        }}
                        value={value}
                      />
                    )}
                    name={formFields.ReadingBefore}
                    defaultValue={
                      delivery && delivery[formFields?.ReadingBefore]
                        ? delivery[formFields?.ReadingBefore].toString()
                        : ''
                    }
                  />
                  <FormControl.ErrorMessage>{errors[formFields.ReadingBefore]?.message}</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formFields.ReadingAfter in errors}>
                  <FormControl.Label>Reading After</FormControl.Label>
                  <Controller
                    key={formFields.ReadingAfter}
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
                          const readBefore = +val - +getValues(formFields.ReadingBefore);
                          setValue(formFields.TotalDelivered, readBefore.toString());
                        }}
                        value={value}
                      />
                    )}
                    name={formFields.ReadingAfter}
                    defaultValue={
                      delivery && delivery[formFields?.ReadingAfter]
                        ? delivery[formFields?.ReadingAfter].toString()
                        : ''
                    }
                  />
                  <FormControl.ErrorMessage>{errors[formFields.ReadingAfter]?.message}</FormControl.ErrorMessage>
                </FormControl>

                {image ? (
                  <Button size="sm" onPress={openImagePickerAsync} colorScheme="success">
                    Retake ATG Slip
                  </Button>
                ) : (
                  <Button size="sm" onPress={openImagePickerAsync} colorScheme="success">
                    Add ATG Slip
                  </Button>
                )}

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
                      name={formFields.TotalDelivered}
                      defaultValue={
                        delivery && delivery[formFields?.TotalDelivered]
                          ? delivery[formFields?.TotalDelivered].toString()
                          : '0'
                      }
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

TankCore.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  nextScreen: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  formFields: PropTypes.shape({
    Product: PropTypes.string,
    Size: PropTypes.string,
    ReadingBefore: PropTypes.string,
    ReadingAfter: PropTypes.string,
    TotalDelivered: PropTypes.string,
  }).isRequired,
  schema: PropTypes.shape({
    Product: PropTypes.string,
    Size: PropTypes.string,
    ReadingBefore: PropTypes.string,
    ReadingAfter: PropTypes.string,
    TotalDelivered: PropTypes.string,
  }).isRequired,
};
