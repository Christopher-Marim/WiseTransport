import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import commonStyles from '../../commonStyles';

import getRealm from '../../services/realm';

export function KmFinalModal({visible, JourneyId, callbackClose, loaderVisible, post, kmInicial}) {
  const [kmfinal, setKmfinal] = useState();
  const [statusModal, setStatusModal] = useState(visible);

  useEffect(() => {
    setStatusModal(visible);
  }, [visible]);

 
   function getLocation() {
    loaderVisible(true);
     Geolocation.getCurrentPosition(
      position => {
        const currentLatitude = parseFloat(
          JSON.stringify(position.coords.latitude),
        );
        const currentLongitude = parseFloat(
          JSON.stringify(position.coords.longitude),
        );
        if (currentLatitude != undefined) {
          UpdateJourney(currentLatitude, currentLongitude);
        }
      },
      error => (Alert.alert(error.message), UpdateJourney('Não foi possivel pegar posição final', 'Não foi possivel pegar posição final')),
      {enableHighAccuracy: false, timeout: 20000},
    );
  }

  async function UpdateJourney(latitude, longitude) {
    const realm = await getRealm();

    realm.write(() => {
      realm.create(
        'Journey',
        {
          id: JourneyId,
          kmFinal: kmfinal,
          latitudeFinal: String(latitude),
          longitudeFinal: String(longitude),
          dateFinish:new Date()
        },
        'modified',
      );
    });

    loaderVisible(false)
    post()
  }

  function close() {
    callbackClose();
  }

  return (
    <Modal transparent={true} visible={statusModal} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.headerModal}> Digite o KM final</Text>
          <TextInput
            style={styles.input}
            keyboardType={'decimal-pad'}
            placeholder="Informe o KM"
            placeholderTextColor={'grey'}
            onChangeText={text => setKmfinal(text)}
            value={kmfinal}
          />
          <Text style={styles.InfokmInicial}>Km inicial: {kmInicial}</Text>


          <View style={styles.buttons}>
            <TouchableOpacity onPress={close}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Finalizar Jornada',
                  'Deseja mesmo finalizar a jornada?',
                  [
                    {
                      text: 'Cancelar',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Prosseguir',
                      onPress: () => {
                        console.warn(kmInicial)
                        if(parseFloat(kmfinal)>= kmInicial){
                          getLocation()
                        }else{
                          Alert.alert('Erro!','Km final menor que km Inicial, por favor verificar')
                        }
                      },
                    },
                  ],
                );
              }}>
              <Text style={styles.button}>Finalizar jornada</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            close;
          }}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    flex: 1,
  },
  container: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '95%',
  },
  headerModal: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    backgroundColor: commonStyles.color.InventoryPrincipal,
    color: commonStyles.color.secondary,
    fontSize: 18,
    textAlign: 'center',
    padding: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.color.today,
    fontWeight: commonStyles.fontWeight,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    paddingHorizontal: 5,
    fontWeight: commonStyles.fontWeight,
    height: 40,
    marginTop: 10,
    margin: 15,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: 'grey',
    borderRadius: 6,
    color:'black',
    backgroundColor: '#f1f2f4',
  },
  InfokmInicial:{
    marginHorizontal:20,
   marginTop:-5
  }
});
