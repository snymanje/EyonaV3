import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, FormControl, Input, Text, Heading, Select, ScrollView, KeyboardAvoidingView, CheckIcon } from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Platform } from 'react-native';
import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';
import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';

const deliverySchema = yup.object({
  OrderNumber: yup.string().required(),
  SiteName: yup.string().required(),
  AccountNumber: yup.string().required(),
});

export const BasicInfo = () => {
  const { sites } = useContext(DeliveriesContext);
  const { delivery, UPDATE_FORM } = useContext(NewDeliveryContext);

  useEffect(() => {
    console.log(delivery);
  }, [delivery]);

  return (
    <Box pt={4} flex={1} bg="white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} style={{ flex: 1 }}>
        <Box flex={1}>
          <Heading size="xl" textAlign="center">
            Site Information
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
              <Formik
                validationSchema={deliverySchema}
                initialValues={{
                  ...delivery,
                }}
                onSubmit={(values) => {
                  console.log(values);
                  UPDATE_FORM({ ...delivery, ...values });
                }}
              >
                {(formProps) => (
                  <VStack width="100%" px={5} space={8}>
                    <FormControl isRequired isInvalid={'OrderNumber' in formProps.errors}>
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
                        onChangeText={formProps.handleChange('OrderNumber')}
                        value={formProps.values.OrderNumber}
                        onBlur={formProps.handleBlur('OrderNumber')}
                        size="xl"
                        autoCapitalize="characters"
                      />
                      <FormControl.ErrorMessage>{formProps.touched.OrderNumber && formProps.errors.OrderNumber}</FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'SiteName' in formProps.errors}>
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
                        selectedValue={formProps.values.SiteName}
                        onBlur={formProps.handleBlur('SiteName')}
                        minWidth="200"
                        accessibilityLabel="Choose Site"
                        placeholder="Choose Site"
                        _selectedItem={{
                          bg: 'gray.300',
                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(value) => {
                          formProps.handleChange('SiteName');
                          formProps.setFieldValue('AccountNumber', sites.filter((site) => site.SiteName === value)[0].AccountNumber);
                        }}
                        size="xl"
                      >
                        {sites.map((site) => (
                          <Select.Item key={site.Id} label={site.SiteName} value={site.SiteName} />
                        ))}
                      </Select>
                      <FormControl.ErrorMessage>{formProps.touched.SiteName && formProps.errors.SiteName}</FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'AccountNumber' in formProps.errors}>
                      <FormControl.Label
                        _text={{
                          bold: true,
                        }}
                        pl={2}
                      >
                        Account Number
                      </FormControl.Label>
                      <Input variant="underlined" value={formProps.values.AccountNumber} size="xl" isDisabled="true" />
                      <FormControl.ErrorMessage>{formProps.touched.AccountNumber && formProps.errors.AccountNumber}</FormControl.ErrorMessage>
                    </FormControl>
                    <Button
                      isDisabled={!formProps.isValid || Object.keys(formProps.values).length === 0}
                      size="lg"
                      onPress={() => {
                        console.log(formProps);
                        formProps.handleSubmit();
                        /*  navigation.navigate('Tank1Screen'); */
                      }}
                      mt="5"
                      colorScheme="primary"
                    >
                      Save & Continue
                    </Button>
                  </VStack>
                )}
              </Formik>
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
