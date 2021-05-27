import * as React from 'react';
import {Platform, StyleSheet, PermissionsAndroid, Alert} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {Button, Snackbar} from 'react-native-paper';

export function SnackBar({message, visibleAux}) {
  const [visible, setVisible] = React.useState(visibleAux);

  React.useEffect(()=>{
    callLocation()

  },[])

  const callLocation = () => {
    try {
      if (Platform.OS === 'ios') {
        setVisible(false);
      } else {
        const requestLocationPermission = async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permissão de Acesso à Localização',
              message: 'Este aplicativo precisa acessar sua localização.',
              buttonNeutral: 'Pergunte-me depois',
              buttonNegative: 'Cancelar',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setVisible(false);
          } else {
            Alert.alert(
              'Permissão de Localização negada',
              'Permissão de Localização negada',
            );
          }
        };
        requestLocationPermission();
      }
    } catch (error) {
      alert('Permision Error' + error);
    }
  };

  return (
    <Snackbar
      visible={visible}
      action={{
        label: 'Ativar',
        onPress: () => {
          callLocation();
        },
      }}>
      {message}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export function EnableLocation() {
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then(data => {
      // The user has accepted to enable the location services
      // data can be :
      //  - "already-enabled" if the location services has been already enabled
      //  - "enabled" if user has clicked on OK button in the popup
    })
    .catch(err => {
      // The user has not accepted to enable the location services or something went wrong during the process
      // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
      // codes :
      //  - ERR00 : The user has clicked on Cancel button in the popup
      //  - ERR01 : If the Settings change are unavailable
      //  - ERR02 : If the popup has failed to open
      //  - ERR03 : Internal error
    });
}
