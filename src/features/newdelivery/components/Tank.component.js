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

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

export const TankCore = ({ navigation, schema, formFields, title, nextScreen }) => {
  const [image, setImage] = useState(null);

  const { delivery, UPDATE_FORM, onSubmitTankInfo } = useContext(NewDeliveryContext);

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

  const onSubmit = async (data) => {
    /* UPDATE_FORM({ ...delivery, tanks: { ...data } }); */
    /*  navigation.navigate(nextScreen); */
    await onSubmitTankInfo(data);
  };

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      quality: 0.5,
    });
    setImage(pickerResult);
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
                    defaultValue={delivery[formFields.Product]}
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
                    defaultValue={delivery[formFields.Size]}
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
                    defaultValue={delivery[formFields.ReadingBefore]}
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
                    defaultValue={delivery[formFields.ReadingAfter]}
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
                      defaultValue={delivery[formFields.TotalDelivered] ? delivery[formFields.TotalDelivered] : '0'}
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
