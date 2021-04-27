import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

import image from '../../assets/iconETM.png';

export function Map({latitude, longitude}) {
  const [region, setRegion] = useState();

  console.log(latitude, longitude);
  useEffect(() => {
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}>
        <Marker
          calloutAnchor={{
            x: 2.9,
            y: 0.8,
          }}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}>
          </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    padding:10,
  },

  map: {
    width: '100%',
    height: '100%',
  },
});
