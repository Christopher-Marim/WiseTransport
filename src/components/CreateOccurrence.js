import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickerOcorrencias from './Modal/ModalOcorrencias/PickerOcorrencias';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';

export function CreateOccurrence({responseCallback, getData, WithoutVehicle, system_unit_id}) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [ocorrenciaNome, setOcorrenciaNome] = useState( 'Escolha uma ocorrência');
  const [ocorrenciaPeso, setOcorrenciaPeso] = useState();
  const [ocorrenciaId, setOcorrenciaId] = useState();
  const [addOccurrenceBeginning, setAddOccurrenceBeginning] = useState(false);
  const [date, setDate] = useState();
  const [hours, setHours] = useState();

  function callback(statusPicker, ocorrenciaNomeAux, ocorrenciaPesoAux, ocorrenciaIdAux) {
    setPickerVisible(statusPicker);
    
    setOcorrenciaNome(ocorrenciaNomeAux ? ocorrenciaNomeAux : ocorrenciaNome);
    setOcorrenciaPeso(ocorrenciaPesoAux);
    setOcorrenciaId(ocorrenciaIdAux);
  }

  const formatteddate = data =>
    moment(data).locale('pt-br').format('DD/MM/YYYY');

  const formattedHours = horas => moment(horas).locale('pt-br').format('LT');

  function handlePressBeginning() {
    responseCallback(true);
    setHours(formattedHours(new Date()));
    setAddOccurrenceBeginning(true);
    setPickerVisible(true);
  }
  function handlePressButtonCancel() {
    responseCallback(false);
    setAddOccurrenceBeginning(false);
    resetState()

  }

  function handlePressFinish() {
    if(ocorrenciaNome!='Escolha uma ocorrência'){
      responseCallback(false);
      SetOccurenceAsyncStorage()
      getData()
      setAddOccurrenceBeginning(false);
      resetState()
    }
    else{
      Alert.alert('Ocorrência invalida', 'Selecione uma ocorrência')
    }
  }

  function resetState() {
    setOcorrenciaNome('Escolha uma ocorrência');
    setOcorrenciaId()
    setOcorrenciaPeso()
    
  }

  async function SetOccurenceAsyncStorage() {
    let obj = {
      idOccurrence: ocorrenciaId,
      pesoOccurrence: ocorrenciaPeso,
      nameOccurrence: ocorrenciaNome,
      dateOccurence: new Date(),
    }
    try {
      await AsyncStorage.setItem('@CurrentOccurrence', JSON.stringify(obj) );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      {!addOccurrenceBeginning && (
        <View>
          <TouchableOpacity
            style={styles.buttonOccurrence}
            onPress={handlePressBeginning}>
            <Text style={styles.subTitle}>Ocorrência</Text>
            <MaterialCommunityIcons name={'plus'} size={30} color='white' />
          </TouchableOpacity>
        </View>
      )}
      {addOccurrenceBeginning && (
        <View>
          <TouchableOpacity
            style={styles.buttonPicker}
            onPress={() => {
              setPickerVisible(true);
            }}>
            <Text style={styles.textOccurrence}>{ocorrenciaNome}</Text>
          </TouchableOpacity>
          <PickerOcorrencias visible={pickerVisible} callback={callback} withoutVehicle={WithoutVehicle} system_unit_id={system_unit_id} />
          <Text style={styles.textHours}>Hora Inicio: {hours}</Text>
          <View style={styles.groupButtons}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={handlePressButtonCancel}>
              <Text style={styles.textCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonBegin}
              onPress={handlePressFinish}>
              <Text style={styles.textBegin}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  buttonPicker: {
    padding: 10,
  },
  textOccurrence: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonOccurrence: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
  textHours: {
    color: 'grey',
    marginLeft: 10,
  },
  textCancel: {
    color: 'white',
  },
  textBegin: {
    color: 'white',
  },
  groupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonCancel: {
    backgroundColor: 'grey',
    width: 70,
    height: 28,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBegin: {
    backgroundColor: '#001e42',
    width: 70,
    height: 28,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
