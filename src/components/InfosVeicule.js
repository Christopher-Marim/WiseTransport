import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import getRealm from '../services/realm';

export function InfosVeicules({veiculeType, plaque, backgroundColor}) {
  const [veicule, setVeicule] = useState(veiculeType);
  const [Journey, setJourney] = useState();
  const [placa, setPlaca] = useState(plaque);
  const [kmInicial, setKmInicial] = useState();

  async function loadJourney() {
    try {
      const realm = await getRealm();
      realm.objects('Journey').filter(x => {
        if (!x.dateFinish) {
          realm.objects('Veicules').filter(veicule => {
            if (veicule.id == x.veicule_id) {
              setVeicule(veicule.tipoVeiculo);
              setPlaca(veicule.placa);
            }
          });
          setJourney(x);
        }
      });     
      setKmInicial(Journey?.kmInicial);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadJourney();
  }, []);

  return (
    <View
      style={[
        styles.container,
        backgroundColor && {backgroundColor: backgroundColor},
      ]}>
      <View style={styles.wrapper}>
        <Text style={styles.subtitule}>Veiculo:</Text>
        <Text style={styles.text}>{veicule}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.subtitule}>Placa:</Text>
        <Text style={styles.text}>{placa}</Text>
      </View>
      {kmInicial && (
        <View style={styles.wrapper}>
          <Text style={styles.subtitule}>Km Inicial:</Text>
          <Text style={styles.text}>{kmInicial}</Text>
        </View>
      )}
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
  },
  subtitule: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
});
