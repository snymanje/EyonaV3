import React, { useEffect, useState } from 'react';
import { Text, Box, Button, VStack, FormControl, Input, Center, Select, CheckIcon, Heading } from 'native-base';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const BasicInfo = ({ navigation }) => {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});

  const [service, setService] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Heading size="xl" textAlign="center" pt={4}>
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
            <Input variant="underlined" placeholder="1234567" onChangeText={(value) => setData({ ...formData, name: value })} size="xl" />
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
              selectedValue={service}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'gray.300',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setService(itemValue)}
              size="xl"
            >
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
          </FormControl>
        </VStack>
        <VStack width="100%" px={5} mb={8}>
          <Button
            onPress={() => {
              navigation.navigate('Tank1Screen');
            }}
            mt="5"
            colorScheme="primary"
          >
            Next
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
