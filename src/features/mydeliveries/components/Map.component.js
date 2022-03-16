import { View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import MapView from 'react-native-maps';

import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';

export const Map = ({ delivery }) => {
  const [siteLatLocation, setSiteLatLocation] = useState(undefined);
  const [siteLonLocation, setSiteLonLocation] = useState(undefined);

  const { sites } = useContext(DeliveriesContext);

  useEffect(() => {
    console.log(delivery);
    console.log(sites);
    setSiteLatLocation(sites.filter((site) => site.SiteName === delivery.sitename)[0]?.Latitude);
    setSiteLonLocation(sites.filter((site) => site.SiteName === delivery.sitename)[0]?.Longitude);
  }, [delivery, siteLatLocation, sites]);

  return (
    <MapView
      region={{
        latitude: siteLatLocation,
        longitude: siteLonLocation,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      style={{ width: '100%', height: 150 }}
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
  );
};
