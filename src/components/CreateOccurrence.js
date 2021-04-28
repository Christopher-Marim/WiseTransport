import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickerOcorrencias from './Modal/ModalOcorrencias/PickerOcorrencias';
import moment from 'moment';

export function CreateOccurrence({responseCallback}) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [ocorrencia, setOcorrencia] = useState('Escolha uma ocorrência');
  const [addOccurrenceBeginning, setAddOccurrenceBeginning] = useState(false);
  const [date, setDate] = useState();
  const [hours, setHours] = useState();

  function callback(statusPicker, ocorrenciaAux) {
    setPickerVisible(statusPicker);
    setOcorrencia(ocorrenciaAux ? ocorrenciaAux : ocorrencia);
  }

  const formatteddate = data =>
    moment(data).locale('pt-br').format('DD/MM/YYYY');

  const formattedHours = horas => moment(horas).locale('pt').format('LT');

  function handlePressBeginning() {
    responseCallback(true)
    setHours(formattedHours(new Date()));
    setAddOccurrenceBeginning(true);
    setPickerVisible(true);
  }
  function handlePressButtonCancel() {
    responseCallback(false)
    setOcorrencia('Escolha uma ocorrência')
    setAddOccurrenceBeginning(false);
  }

  return (
    <View style={styles.container}>
      {!addOccurrenceBeginning && (
        <View>
          <TouchableOpacity
            style={styles.buttonOccurrence}
            onPress={handlePressBeginning}>
            <Text style={styles.subTitle}>Ocorrência</Text>
            <MaterialCommunityIcons name={'plus'} size={32} />
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
            <Text style={styles.textOccurrence}>{ocorrencia}</Text>
          </TouchableOpacity>
          <PickerOcorrencias visible={pickerVisible} callback={callback} />
          <Text style={styles.textHours}>Hora Inicio: {hours}</Text>
          <View style={styles.groupButtons}>
            <TouchableOpacity style={styles.buttonCancel} onPress={handlePressButtonCancel}>
              <Text style={styles.textCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBegin}>
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
  },
  textHours: {
    color: 'grey',
    marginLeft: 10,
  },
  textCancel:{
      color:'white'
  },
  textBegin:{
      color:'white'
  },
  groupButtons:{
      flexDirection:'row',
      justifyContent:'space-between',
      padding:10
  },
  buttonCancel:{
      backgroundColor:'grey',
      width:70,
      height:28,
      borderRadius:5,
      alignItems:'center',
      justifyContent:'center'
  },
  buttonBegin:{
    backgroundColor:'#001e42',
    width:70,
    height:28,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center'
  }
});
