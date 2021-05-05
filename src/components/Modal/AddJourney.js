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
import {InfosVeicules} from '../InfosVeicule';

export default function AddJourney({callback}) {
  const [arrayVeicules, setArrayVeicules] = useState();
  const [user, setUser] = useState();
  const [plaque, setplaque] = useState('');
  const [KmInicial, setKmInicial] = useState('');
  const [veiculoSelecionado, setVeiculoSelecionado] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [Color, setColor] = useState('black');
  const [KmComplete, setKmComplete] = useState(false);
  const statusModal = useSelector(
    state => state.showModal.showModalADDINVENTORY,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    callLocation();
    loadVeicules();
    loadUser();
  }, [statusModal]);

  async function loadVeicules() {
    const realm = await getRealm();
    const store = realm.objects('Veicules');
    setArrayVeicules(store);
  }

  async function loadUser() {
    const realm = await getRealm();
    const store = realm.objects('User');
    setUser(store[0]);
    console.log(user)
  }

  async function addJourney() {
    const realm = await getRealm();
    realm.write(() => {
      realm.create('Journey', {
        id: Math.random() * 1000,
        operator_id:user.id,
        operator: user.nome,
        dateStart: new Date(),
        veicule_name:veiculoSelecionado[0].tipoVeiculo,
        veicule_id: veiculoSelecionado[0].id,
        kmInicial: KmInicial,
        latitudeInicial: String(latitude),
        longitudeInicial: String(longitude),
        systemUnitId: user.system_unit_id,
        systemUserId: user.system_user_id,
        occurrences: [],
      });
      setplaque();
      dispatch({type: 'REFRESH_INVENTORY', payload: [true]});
      setInterval(() => {
        dispatch({type: 'REFRESH_INVENTORY', payload: [false]});
      }, 1000);
    });

    const journey = realm.objects('Journey')
    console.log(journey)
    callback()
    closeModal();

  }

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

  async function getLocation() {
    await Geolocation.getCurrentPosition(
      position => {
        const currentLatitude = parseFloat(
          JSON.stringify(position.coords.latitude),
        );
        const currentLongitude = parseFloat(
          JSON.stringify(position.coords.longitude),
        );
        if (currentLatitude != undefined) {
          setLatitude(currentLatitude);
          setLongitude(currentLongitude);

          console.warn(latitude, longitude);
        }
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  }

  let Component2 = (longitude&&veiculoSelecionado[0]) ? (
    <View style={{flex: 1}}>
      <Text style={styles.infosText}>Informações vigentes</Text>
      <View style={{paddingHorizontal: 10}}>
        <InfosJourney></InfosJourney>
      </View>
      <Text style={styles.infosText}>Informações veiculo</Text>
      <View style={{paddingHorizontal: 10}}>
        <InfosVeicules
          veiculeType={veiculoSelecionado[0]?.tipoVeiculo}
          plaque={plaque}></InfosVeicules>
      </View>
      <View style={{flex: 1}}>
        <Map latitude={latitude} longitude={longitude} />
      </View>
    </View>
  ) : (
    <></>
  );

  return (
    <>
      {statusModal && (
        <View>
          <StepModal
            statusModal={statusModal}
            closemodal={closeModal}
            callback={callLocation}
            callbackFinish={addJourney}
            next={KmComplete && true}
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
                    placeholder="Placa ABC-123"
                    placeholderTextColor="grey"
                    onChangeText={text => {
                      setplaque(text);
                      if (plaque.length == 7) {
                        console.warn(true);
                        getVeicule(text);
                      } else {
                        setVeiculoSelecionado([]);
                        setColor('black');
                      }
                    }}
                    value={plaque}
                    maxLength={8}
                  />
                </View>
                {veiculoSelecionado.length > 0 && (
                  <Text
                    style={{
                      marginLeft: 20,
                      paddingBottom: 10,
                      fontWeight: 'bold',
                    }}>
                    {veiculoSelecionado[0].tipoVeiculo}
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
                    editable={veiculoSelecionado.length > 0 ? true : false}
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
                    onBlur={() => {
                      if (KmInicial.length > 0) {
                        setKmComplete(true);
                      } else {
                        setKmComplete(false);
                      }
                    }}
                    onEndEditing={() => {
                      if (KmInicial.length > 0) {
                        setKmComplete(true);
                      } else {
                        setKmComplete(false);
                      }
                    }}
                    value={KmInicial}
                  />
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
    width: '90%',
  },
  subtitule: {
    marginTop: 10,
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
