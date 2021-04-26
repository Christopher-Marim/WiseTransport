import React, {useEffect, useState} from 'react';

import {
  View,
  Modal,
  StyleSheet,
  PermissionsAndroid,
  Text,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import commonStyles from '../../commonStyles';
import StepModal from './StepModal';
import getRealm from '../../services/realm';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import {Map} from '../Map';
import {InfosJourney} from '../InfosJourney';

export default function AddJourney() {
  const [VeiculeName, setVeiculeName] = useState('');
  const [KmInicial, setKmInicial] = useState('');
  const [veiculoSelecionado, setVeiculoSelecionado] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [Color, setColor] = useState();
  const [KmComplete, setKmComplete] = useState(false);
  const statusModal = useSelector(
    state => state.showModal.showModalADDINVENTORY,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    callLocation();
  }, []);

  async function addInventory() {
    if (!VeiculeName || !VeiculeName.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não Informada!');
      return;
    } else {
      const realm = await getRealm();

      realm.write(() => {
        realm.create('Inventorys', {
          id: Math.random() * 1000,
          nome: VeiculeName,
          dateAt: new Date(),
          itens: [],
        });
        setVeiculeName();
        dispatch({type: 'REFRESH_INVENTORY', payload: [true]});
        setInterval(() => {
          dispatch({type: 'REFRESH_INVENTORY', payload: [false]});
        }, 1000);
        closeModal();
      });
    }
  }

  const arrayVeicules = [
    {
      id: 1,
      nome: 'R3 Yamaha',
      placa: 'ABC1D23',
    },
    {
      id: 2,
      nome: 'XJ6 Yamaha',
      placa: 'EFG4H56',
    },
  ];

  function getVeicule(placa) {
    const veiculoSelecionadoAux = arrayVeicules.filter(veiculoElement => {
      return veiculoElement.placa == placa;
    });
    console.warn(veiculoSelecionadoAux);

    if (veiculoSelecionadoAux.length > 0) {
      setVeiculoSelecionado(veiculoSelecionadoAux);
      setColor('#00bd2f');
    } else {
      setColor('#b80003');
    }
  }

  function closeModal() {
    dispatch({type: 'SHOW_MODAL_ADDINVENTORY_OFF'});
  }

  const callLocation = () => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Acesso à Localização',
            message: 'Este aplicativo precisa acessar sua localização.',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('opa');
          getLocation();
        } else {
          Alert.alert(
            'Permissão de Localização negada',
            'Permissão de Localização negada',
          );
        }
      };
      requestLocationPermission();
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLatitude = parseFloat(
          JSON.stringify(position.coords.latitude),
        );
        const currentLongitude = parseFloat(
          JSON.stringify(position.coords.longitude),
        );
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);

        console.warn(latitude, longitude);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };

  let Component2 = latitude && (
    <Map latitude={latitude} longitude={longitude} />
  );

  return (
    <>
      {statusModal && (
        <View>
          <StepModal
            statusModal={statusModal}
            closemodal={closeModal}
            callback={callLocation}
            stepComponents={[
              <View style={{flex: 1}}>
                <Text style={styles.infosText}>Informações vigentes</Text>
                <View style={{paddingHorizontal: 10}}>
                  <InfosJourney></InfosJourney>
                </View>
                <Text style={[styles.subtitule, {color: Color}]}>
                  Informe a placa do veiculo{' '}
                </Text>
                <View style={styles.containerTextInputIcon}>
                  <TextInput
                    autoCapitalize={'characters'}
                    style={[styles.input, {borderColor: Color}]}
                    placeholder="Placa"
                    placeholderTextColor="grey"
                    onChangeText={text => {
                      setVeiculeName(text);
                      if (VeiculeName.length == 6) {
                        console.warn(true);
                        getVeicule(text);
                      } else {
                        setVeiculoSelecionado([]);
                        setColor('black');
                      }
                    }}
                    value={VeiculeName}
                    maxLength={7}
                  />
                  {Color == '#00bd2f' && (
                    <MaterialCommunityIcons
                      name="check"
                      size={30}
                      color={'#00bd2f'}
                    />
                  )}
                  {Color == '#b80003' && (
                    <MaterialCommunityIcons
                      name="close"
                      size={30}
                      color={'#b80003'}
                    />
                  )}
                </View>
                {veiculoSelecionado.length > 0 && (
                  <Text
                    style={{
                      marginLeft: 20,
                      paddingBottom: 10,
                      fontWeight: 'bold',
                    }}>
                    {veiculoSelecionado[0].nome}
                  </Text>
                )}

                <Text
                  style={[
                    styles.subtitule,
                    {color: KmComplete ? '#00bd2f' : 'black'},
                  ]}>
                  Informe o KM Inicial{' '}
                </Text>
                <View style={styles.containerTextInputIcon}>
                  <TextInput
                    autoCapitalize={'characters'}
                    style={[
                      styles.input,
                      {borderColor: KmComplete ? '#00bd2f' : 'black'},
                    ]}
                    keyboardType={'numeric'}
                    placeholder="Km inicial"
                    placeholderTextColor="grey"
                    onChangeText={text => {
                      setKmInicial(text);
                    }}
                    onEndEditing={() => setKmComplete(true)}
                    value={KmInicial}
                    maxLength={7}
                  />
                  {KmComplete && (
                    <MaterialCommunityIcons
                      name="check"
                      size={35}
                      color={'#00bd2f'}
                    />
                  )}
                </View>
              </View>,

              Component2,
            ]}
          />
        </View>
      )}
    </>
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
    fontWeight: commonStyles.fontWeight,
    margin: 20,
    marginRight: 30,
    color: commonStyles.color.today,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
    margin: 15,
    borderWidth: 1,
    borderColor: '#00bd2f',
    borderRadius: 2,
    color: 'black',
    width: '80%',
  },
  subtitule: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infosText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  containerTextInputIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
