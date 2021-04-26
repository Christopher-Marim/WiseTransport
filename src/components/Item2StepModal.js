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
      latitudeDelta: 0,
      longitudeDelta: 0,
    });
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
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
    flex: 1,
    justifyContent:'flex-end',
    padding:10
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
  },
});
