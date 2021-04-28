import React, {useEffect, useState} from 'react';
import {View, Modal, TouchableWithoutFeedback, FlatList, ScrollView ,TouchableOpacity, Text} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

import styles from './styles';
import getRealm from '../../../services/realm';

export default function PickerOcorrencias(props) {
  const [loadingActive, setloadingActive] = useState(true);
  const [Occurrences, setOcurrences] = useState();

  //Fechar Modal
  function closeModal() {
    props.callback(false);
  }

  function callbackItem(nomeEmpresa,) {
    props.callback(false, nomeEmpresa);
  }

  useEffect(() => {
    getOccurrences();
  }, [props.visible]);

  async function getOccurrences() {
    const realm = await getRealm();
    const store = realm.objects('Occurrence')
    setOcurrences(store);
    setloadingActive(false);
  }

  return (
    <Modal
      transparent={true}
      visible={props.visible}
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
        <View style={[styles.container]}>
          {loadingActive && (
            <ActivityIndicator animating={true} color={'white'} />
          )}
          {!loadingActive && (
            <FlatList
              data={Occurrences}
              keyExtractor={item => `${item.id}`}
              renderItem={({item}) => (
                <ScrollView style={{borderRadius: 10}}>
                  <TouchableOpacity
                    style={{
                      height: 50,
                      paddingLeft: 10,
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      borderBottomWidth: 0.4,
                      borderColor: 'black',
                    }}
                    onPress={() => {
                      callbackItem(item.occurrence, item.peso, item.id);
                    }}>
                    <Text style={{fontSize: 20, color: 'black'}}>
                      {item.occurrence}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            />
          )}
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}
