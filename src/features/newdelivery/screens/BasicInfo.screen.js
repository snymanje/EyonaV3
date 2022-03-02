import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, FormControl, Input, CheckIcon, Heading, Select, ScrollView, KeyboardAvoidingView } from 'native-base';
import { Formik } from 'formik';

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
              <VStack width="100%" px={5} space={8}>
                <Formik
                  initialValues={{
                    title: '',
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                    UPDATE_FORM({ ...delivery, ...values });
                  }}
                >
                  {(formProps) => (
                    <Box>
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
                          onChangeText={formProps.handleChange('title')}
                          value={formProps.values.title}
                          size="xl"
                          autoCapitalize="characters"
                        />
                      </FormControl>
                      <Button
                        size="lg"
                        onPress={() => {
                          formProps.handleSubmit();
                          /*  navigation.navigate('Tank1Screen'); */
                        }}
                        mt="5"
                        colorScheme="primary"
                      >
                        Save & Continue
                      </Button>
                    </Box>
                  )}
                </Formik>
              </VStack>
            </Box>
          </ScrollView>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

BasicInfo.propTypes = {
  navigation: PropTypes.element.isRequired,
};
