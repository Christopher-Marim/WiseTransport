import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import getRealm from '../services/realm';

export function InfosJourney({backgroundColor}) {
  const [nome, setnome] = useState('Usuário');
  const [data, setData] = useState();
  const [horas, setHoras] = useState();
  const [nomeEmpresa, setnomeEmpresa] = useState();
  const [Journey, setJourney] = useState();
  const [UnitIdEmpresa, setUnitIdEmpresa] = useState();

  const formatteddate = data =>
    moment(data).locale('pt-br').format('DD/MM/YYYY');

  const formattedHours = horas => moment(horas).locale('pt-br').format('LT');

  async function getUsuarioRealm() {
    try {
      const useraux = await AsyncStorage.getItem('@User')
      const store = JSON.parse(useraux)
      setnome(store.nome);
      setUnitIdEmpresa(store.system_unit_id);
      getNomeEmpresa();
    } catch(e) {
      alert('Erro ao pegar o usuario Infos '+e)
      console.error(e)
    }
  }
  useEffect(() => {

    getUsuarioRealm();
    setHoras(formattedHours(new Date()));
    setData(formatteddate(new Date()));
  }, []);

  async function loadJourney() {
    try {
      const realm = await getRealm();
       const data = realm.objects('Journey').filter(x=>{if(!x.dateFinish){setJourney(x);}});

      if(Journey){

        setnome(Journey.operator)
        setData(formatteddate(Journey.dateStart));
        setHoras(formattedHours(Journey.dateStart));
      }
    } catch (error) {
      alert('Error LoadJourney InfosJourney:' + error)
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
      alert('Error getNomeEmpresa InfosJourney:' + e)

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
    fontSize: hp('1.65%'),
    color: 'black',
    width: wp('60%'),
  },
  subtitule: {
    marginLeft: 15,
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
});
