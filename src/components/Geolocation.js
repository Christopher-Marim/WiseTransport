import React, { useEffect } from "react";
import { PermissionsAndroid,  Platform, Alert } from "react-native";
import Geolocation from '@react-native-community/geolocation';

export function getGeolocation() {

  const callLocation = () => {
    if(Platform.OS === 'ios') {
      getLocation();
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permissão de Acesso à Localização",
            message: "Este aplicativo precisa acessar sua localização.",
            buttonNeutral: "Pergunte-me depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert('Permissão de Localização negada','Permissão de Localização negada');
        }
      };
      requestLocationPermission();
    }
  }
  
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        return([currentLatitude, currentLongitude])
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  
}
