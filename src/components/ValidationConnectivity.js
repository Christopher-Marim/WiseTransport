import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

function CheckConnectivity({callback}) {
  const [internet, setInternet] = useState();

  if (Platform.OS === 'android') {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        return callback(true);
      } else {
        return callback(false);
      }
    });
  } else {
    // For iOS devices
    NetInfo.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange(),
    );
  }
}

const handleFirstConnectivityChange = (isConnected) => {
  NetInfo.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange(),
  );

  if (isConnected === false) {
    return callback(false);
  } else {
    return callback(true);
  }
};

export default CheckConnectivity;
