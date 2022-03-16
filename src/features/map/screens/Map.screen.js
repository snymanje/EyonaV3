import React, { useContext } from 'react';
import MapView from 'react-native-maps';

import { Box } from 'native-base';
import { DeliveriesContext } from '../../../services/deliveries/Deliveries.context';

export const Map = () => {
  const { sites } = useContext(DeliveriesContext);

  return (
    <Box>
      <MapView
        region={{
          latitude: sites[0].Latitude,
          longitude: sites[0].Longitude,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {sites.map((site) => (
          <MapView.Marker
            key={site.Id}
            title={site.SiteName}
            coordinate={{
              latitude: site.Latitude,
              longitude: site.Longitude,
            }}
          />
        ))}
      </MapView>
    </Box>
  );
};
