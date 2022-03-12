import React, { useContext } from 'react';
import {
  Text,
  AspectRatio,
  Box,
  Center,
  Stack,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  VStack,
  FlatList,
  Spinner,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native';
import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';

export const MyDeliveriesScreen = ({ navigation }) => {
  const { deliveries, isLoading } = useContext(DeliveriesContext);

  return (
    <Box flex={1} safeArea px={2}>
      <VStack w="100%" alignSelf="center" py={3}>
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="3"
          px="4"
          borderWidth="0"
          size="2xl"
          InputLeftElement={<Icon ml="2" size="5" color="gray.400" as={<Ionicons name="ios-search" />} />}
        />
      </VStack>
      {isLoading ? (
        <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </HStack>
      ) : (
        <VStack w="100%" space={5} alignSelf="center">
          <FlatList
            data={deliveries}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DeliveryDetail', {
                    delivery: item,
                  })
                }
              >
                <Box alignItems="center" mb={5}>
                  <Box
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    _dark={{
                      borderColor: 'coolGray.600',
                      backgroundColor: 'gray.700',
                    }}
                    _web={{
                      shadow: 2,
                      borderWidth: 0,
                    }}
                    _light={{
                      backgroundColor: 'gray.50',
                    }}
                  >
                    <Box>
                      <AspectRatio w="100%" ratio={16 / 9}>
                        <Image
                          source={{
                            uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                          }}
                          alt="image"
                        />
                      </AspectRatio>
                      <Center
                        bg="violet.500"
                        _dark={{
                          bg: 'violet.400',
                        }}
                        _text={{
                          color: 'warmGray.50',
                          fontWeight: '700',
                          fontSize: 'xs',
                        }}
                        position="absolute"
                        bottom="0"
                        px="3"
                        py="1.5"
                      >
                        PHOTOS
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading size="md" ml="-1">
                          The Garden City
                        </Heading>
                        <Text
                          fontSize="xs"
                          _light={{
                            color: 'violet.500',
                          }}
                          _dark={{
                            color: 'violet.400',
                          }}
                          fontWeight="500"
                          ml="-0.5"
                          mt="-1"
                        >
                          The Silicon Valley of India.
                        </Text>
                      </Stack>
                      <Text fontWeight="400">
                        Bengaluru (also called Bangalore) is the center of India's high-tech industry. The city is also
                        known for its parks and nightlife.
                      </Text>
                      <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                          <Text
                            color="coolGray.900"
                            _dark={{
                              color: 'warmGray.900',
                            }}
                            fontWeight="400"
                          >
                            6 mins ago
                          </Text>
                        </HStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.Id}
          />
        </VStack>
      )}
    </Box>
  );
};
