import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import getRealm from '../services/realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export function InfosJourney({backgroundColor}) {
  const [nome, setnome] = useState('Usuário');
  const [data, setData] = useState();
  const [horas, setHoras] = useState();
  const [nomeEmpresa, setnomeEmpresa] = useState();
  const [UnitIdEmpresa, setUnitIdEmpresa] = useState();

  const formatteddate = data =>
    moment(data).locale('pt-br').format('DD/MM/YYYY');

  const formattedHours = horas => moment(horas).locale('pt-br').format('LT');

  async function getUsuarioRealm() {
    const realm = await getRealm();
    const store = realm.objects('User');
    const user = store[0]
    setnome(user.nome);
    setUnitIdEmpresa(user.system_unit_id);
    getNomeEmpresa();
  }
  useEffect(() => {

    getUsuarioRealm();
    setHoras(formattedHours(new Date()));
    setData(formatteddate(new Date()));
  }, []);

  async function loadJourney() {
    try {
      const realm = await getRealm();
      const data = realm.objects('Journey');
      const Journey = data[0]
      if(Journey){

        setnome(Journey.operator)
        setData(formatteddate(Journey.dateStart));
        setHoras(formattedHours(Journey.dateStart));
      }
    } catch (error) {
      console.error(error)
    }
    
  }

  useEffect(() => {
    getUsuarioRealm();

    loadJourney();
  }, []);

  const getNomeEmpresa = async () => {
    try {
      const EmpresaNome = await AsyncStorage.getItem('@Empresa');
      setnomeEmpresa(EmpresaNome);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={[styles.container, backgroundColor&&{backgroundColor:backgroundColor}]}>
      <View style={styles.wrapper}>
        <Text style={styles.subtitule}>Operador:</Text>
        <Text style={styles.text} numberOfLines={1}>
          {nome}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.subtitule}>Empresa:</Text>
        <Text style={styles.text} numberOfLines={1}>
          {nomeEmpresa}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.subtitule}>Data Inicio:</Text>
        <Text style={styles.text}>{data} - {horas}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    width: '70%',
  },
  subtitule: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
});
