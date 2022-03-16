import React, { useContext, useState, useEffect } from 'react';
import { Button, Image, Row, ScrollView } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import MapView from 'react-native-maps';

import { NewDeliveryContext } from '../../../services/newDeliveries/NewDelivery.context';
import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';

export const DeliveryDetailsScreen = ({ route, navigation }) => {
  const { delivery } = route.params;

  const [basicInfoExpanded, setBasicInfoExpanded] = useState(false);
  const [tank1InfoExpanded, setTank1InfoExpanded] = useState(false);
  const [tank2InfoExpanded, setTank2InfoExpanded] = useState(false);

  const [siteLatLocation, setSiteLatLocation] = useState(undefined);
  const [siteLonLocation, setSiteLonLocation] = useState(undefined);

  const { setFormData } = useContext(NewDeliveryContext);
  const { sites } = useContext(DeliveriesContext);

  /*   const siteLatLocation = sites.filter((site) => site.SiteName === delivery.sitename);
  const siteLonLocation = sites.filter((site) => site.SiteName === delivery.sitename); */

  useEffect(() => {
    setSiteLatLocation(sites.filter((site) => site.SiteName === delivery.sitename)[0].Latitude);
    setSiteLonLocation(sites.filter((site) => site.SiteName === delivery.sitename)[0].Longitude);
  }, [delivery, siteLatLocation, sites]);

  return (
    <ScrollView px={2}>
      <View style={{ flex: 1, marginTop: 8 }}>
        <MapView
          region={{
            latitude: siteLatLocation,
            longitude: siteLonLocation,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={{ width: '100%', height: 200 }}
        >
          <MapView.Marker
            key={delivery.Id}
            title={delivery.sitename}
            coordinate={{
              latitude: siteLatLocation,
              longitude: siteLonLocation,
            }}
          />
        </MapView>
      </View>
      <List.Accordion
        title="Basic Information"
        left={(props) => <List.Icon {...props} icon="alert-circle-outline" />}
        expanded={basicInfoExpanded}
        onPress={() => setBasicInfoExpanded(!basicInfoExpanded)}
      >
        <List.Item title={delivery.sitename} description="Site Name" />
        <List.Item title={delivery.ordernumber} description="Order Number" />
        <List.Item title={delivery.accnumber} description="Account Number" />
      </List.Accordion>
      <List.Accordion
        title="Tank 1 Information"
        left={(props) => <List.Icon {...props} icon="egg-outline" />}
        expanded={tank1InfoExpanded}
        onPress={() => setTank1InfoExpanded(!tank1InfoExpanded)}
      >
        <List.Item title={delivery.Tank1Product} description="Product" />
        <List.Item title={delivery.Tank1Size} description="Size" />
        <List.Item title={delivery.Tank1ReadingBefore} description="Reading Before" />
        <List.Item title={delivery.Tank1ReadingAfter} description="Reading After" />
        <List.Item title={delivery.Tank1TotalDelivered} description="Total Delivered" />
        <Image source={{ uri: delivery.Tank1ImageUrl }} alt="image" width="100%" height={300} />
      </List.Accordion>
      <List.Accordion
        title="Tank 2 Information"
        left={(props) => <List.Icon {...props} icon="egg-outline" />}
        expanded={tank2InfoExpanded}
        onPress={() => setTank2InfoExpanded(!tank2InfoExpanded)}
      >
        <List.Item title={delivery.Tank2Product} description="Product" />
        <List.Item title={delivery.Tank2Size} description="Size" />
        <List.Item title={delivery.Tank2ReadingBefore} description="Reading Before" />
        <List.Item title={delivery.Tank2ReadingAfter} description="Reading After" />
        <List.Item title={delivery.Tank2TotalDelivered} description="Total Delivered" />
        <Image source={{ uri: delivery.Tank2ImageUrl }} alt="image" width="100%" height="300" />
      </List.Accordion>
      <Button
        onPress={async () => {
          await setFormData(delivery);
          navigation.goBack();
          navigation.reset({
            index: 0,
            routes: [{ name: 'NewDeliveryTab' }],
          });
        }}
      >
        Edit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
