import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  VStack,
  FormControl,
  Input,
  Center,
  Select,
  CheckIcon,
} from "native-base";
import { StyleSheet } from "react-native";

import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://hvyovmyxynoswtgnqybk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NDA1OTQ3MCwiZXhwIjoxOTU5NjM1NDcwfQ.9nIUCHneZYmVhobiS0KAbX2I_lxr4jGuGg9QYus6DHs"; /* process.env.SUPABASE_KEY */
const supabase = createClient(supabaseUrl, supabaseKey);

export const BasicInfo = ({ navigation }) => {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});

  const [service, setService] = useState("");

  const getdata = async () => {
    try {
      const { data, error } = await supabase.from("Deliveries").select();
      if (error) {
        console.log(error);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box pt={8} flex={1} justifyContent="space-between" bg="white">
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
            onChangeText={(value) => setData({ ...formData, name: value })}
            size="xl"
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
            selectedValue={service}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: "gray.300",
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
            navigation.navigate("Tank1Screen");
          }}
          mt="5"
          colorScheme="primary"
        >
          Next
        </Button>
        <Button
          onPress={() => {
            getdata();
          }}
          mt="5"
          colorScheme="primary"
        >
          Get Data
        </Button>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    /* justifyContent: "center",
    alignItems: "center", */
  },
});
