import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import PickerOcorrencias from './Modal/ModalOcorrencias/PickerOcorrencias';

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
            <MaterialCommunityIcons name={'plus'} size={hp('3.8%')} color='white' />
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
  container: {
    
  },
  buttonPicker: {
    padding: hp('0.5%'),
  },
  textOccurrence: {
    fontWeight: 'bold',
    fontSize: hp('2.4%'),
  },
  buttonOccurrence: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    color:'white'
  },
  textHours: {
    color: 'grey',
    fontSize: hp('1.65%'),
    marginLeft: hp('0.5%'),
  },
  textCancel: {
    color: 'white',
    fontSize: hp('1.65%'),
  },
  textBegin: {
    color: 'white',
    fontSize: hp('1.65%'),
  },
  groupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:hp('2%'),
    padding: hp('0.5%'),
  },
  buttonCancel: {
    backgroundColor: 'grey',
    width: wp('15%'),
    height: hp('3.2%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBegin: {
    backgroundColor: '#001e42',
    width: wp('16.5%'),
    height: hp('3.2%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
