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
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import Loader from './Loader';

export function Map({latitude, longitude}) {
  const [region, setRegion] = useState();
  const inicialRegion= {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
  }

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
      {
        (longitude!=null)&&
      (<MapView

        provider={PROVIDER_GOOGLE}
        style={styles.map}
        moveOnMarkerPress={true}
        initialRegion={inicialRegion}
        loadingEnabled={true}
        toolbarEnabled={true}
        showsMyLocationButton={true} 
        showsCompass={true}
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
      </MapView>)

      }
      {
        (longitude==null)&&(
          <Loader></Loader>
        )
      }
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
