import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import getRealm from '../services/realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { set } from 'react-native-reanimated';
import commonStyles from '../commonStyles';

export function InfosVeicules({veiculeType, plaque}) {  

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.subtitule}>Veiculo:</Text>
        <Text style={styles.text}>{veiculeType}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.subtitule}>Placa:</Text>
        <Text style={styles.text}>{plaque}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
 
    borderRadius:10,
    backgroundColor:'#e8e8e8'
  },
  wrapper: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  subtitule: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal:5
  },
});
