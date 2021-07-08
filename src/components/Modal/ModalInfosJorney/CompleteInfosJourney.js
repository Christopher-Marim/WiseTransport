import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/pt-br';

import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const formatteddate = data => moment(data).locale('pt-br').format('DD/MM/YYYY');

const formattedHours = horas => moment(horas).locale('pt-br').format('LT');

export function CompleteInfosJourney({callback, visible, item}) {
  //Fechar Modal
  function closeModal() {
    callback(false);
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              closeModal();
            }}>
            <MaterialCommunityIcons name={'close-box'} size={30} color="grey" />
          </TouchableOpacity>

          <View style={{paddingHorizontal: 10}}>
            <View>
              <Text style={styles.titulo}>Informações da jornada</Text>
              <Text style={styles.subtitulo}>
                {item?.veicule_name} (
                {item.check == null && item.dateFinish && 'Erro ao enviar'}
                {(item.check == true && item.dateFinish) ? 'Finalizado' : 'Em curso'})
              </Text>
            </View>

            <View style={{paddingTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: hp('1.8%')}}>
                  Inicio: {formatteddate(item.dateStart)}
                </Text>
                <Text style={{fontSize: hp('1.8%')}}>
                  {' '}
                  {formattedHours(item.dateStart)}
                </Text>
              </View>
              {item.dateFinish && (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: hp('1.8%')}}>
                    Fim: {formatteddate(item.dateFinish)}
                  </Text>
                  <Text style={{fontSize: hp('1.8%')}}>
                    {'    '}
                    {formattedHours(item.dateFinish)}
                  </Text>
                </View>
              )}
            </View>

            <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold'}}>
              Ocorrencias
            </Text>
          </View>
          <FlatList
            data={item.occurrences}
            contentContainerStyle={{paddingHorizontal: hp('1%')}}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={{flex: 1}}>
                <View
                  style={{
                    padding: hp('1%'),
                    marginVertical: 5,
                    borderRadius: 5,
                    borderWidth: 2,
                  }}>
                  <Text style={styles.TextOccurrence}>{item.occurrence}</Text>
                  <View style={{justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: hp('1.8%')}}>
                        Inicio: {formatteddate(item.dataInicio)}
                      </Text>
                      <Text style={{fontSize: hp('1.8%')}}>
                        {' '}
                        {formattedHours(item.dataInicio)}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: hp('1.8%')}}>
                        Fim:{' '}
                        {item.dataFim
                          ? formatteddate(item.dataFim)
                          : 'Ainda não finalizada'}
                      </Text>
                      <Text style={{fontSize: hp('1.8%')}}>
                        {'    '}
                        {item.dataFim ? formattedHours(item.dataFim) : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}
