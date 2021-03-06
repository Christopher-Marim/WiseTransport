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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {RadioButton} from 'react-native-paper';
import commonStyles from '../../commonStyles';
import {InfosVeicules} from '../InfosVeicule';
import { EnableLocation } from '../SnackBar';
import {InfosJourney} from '../InfosJourney';
import getRealm from '../../services/realm';
import {SelectItens} from '../SelectItem';
import StepModal from './StepModal';
import {Map} from '../Map';


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
  const [value, setValue] = useState('first');
  const [typeJourney, setTypeJourney] = useState();
  const [Ocurrences, setOcurrences] = useState();

  const statusModal = useSelector(
    state => state.showModal.showModalADDINVENTORY,
  );

  async function getOccurrences(system_unit_id) {
    const realm = await getRealm();
    const store = realm.objects('Occurrence').filtered(`(semveiculo == true && comveiculo == true)||(semveiculo == true) && systemUnitId == ${system_unit_id}`)
    setOcurrences(store);
  }


  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
    callLocation();
    loadVeicules();
  }, [statusModal]);

  async function loadVeicules() {
    try {
      const realm = await getRealm();
      const store = realm.objects('Veicules');
      setArrayVeicules(store);
    } catch (error) {
      alert('Erro ao carregar os Veiculos: ' + error);
    }
  }

  async function loadUser() {
    try {
      const useraux = await AsyncStorage.getItem('@User');
      const store = JSON.parse(useraux);
      setUser(store);
      getOccurrences(store.system_unit_id)
    } catch (e) {
      alert('Erro ao carregar o usuario ' + e);
      console.error(e);
    }
    console.log(user);
  }

  async function addJourney() {
    try {
      const realm = await getRealm();

      if(!typeJourney){
        realm.write(() => {
          realm.create('Journey', {
            id: Math.random() * 10000,
            operator_id: user.id,
            operator: user.nome,
            dateStart: new Date(),
            veicule_name: veiculoSelecionado[0].tipoVeiculo,
            veicule_id: veiculoSelecionado[0].id,
            kmInicial: KmInicial,
            latitudeInicial: String(latitude),
            longitudeInicial: String(longitude),
            systemUnitId: user.system_unit_id,
            systemUserId: user.system_user_id,
            occurrences: [],
          });
        });
        callback(false);
        setplaque();
      }else{
        realm.write(() => {
          realm.create('Journey', {
            id: Math.random() * 10000,
            operator_id: user.id,
            operator: user.nome,
            dateStart: new Date(),
            veicule_name: typeJourney.occurrence,
            latitudeInicial: String(latitude),
            longitudeInicial: String(longitude),
            systemUnitId: user.system_unit_id,
            systemUserId: user.system_user_id,
            occurrences: [],
          });
        });
        setplaque();
        SetOccurenceAsyncStorage()
        callback(true);
      }
      closeModal();
    } catch (error) {
      alert('Erro ao adicionar Jornada' + error);
    }
  }

  function getVeicule(placa) {
    try {
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
    } catch (error) {
      alert('Error: ' + error);
    }
  }

  function closeModal() {
    dispatch({type: 'SHOW_MODAL_ADDINVENTORY_OFF'});
    setplaque('');
    setKmInicial('');
    setColor('black');
    setKmComplete(false);
    setVeiculoSelecionado([]);
    setValue('first');
    setTypeJourney();
  }

  const callLocation = () => {
    try {
      if (Platform.OS === 'ios') {
        getLocation();

      }  if (PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      }
      
    } catch (error) {
      alert('Permision Error' + error);
    }
  };
  
  async function getLocation() {
    try {
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
        error => ( EnableLocation() ),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
      );
    } catch (error) {
      alert('Error ao pegar Geolocaliza????o: ' + error);
    }
  }

  function itemSelected(item) {
    setTypeJourney({id: item.id, occurrence: item.occurrence});
  }

  async function SetOccurenceAsyncStorage() {

    let obj = {
      idOccurrence: typeJourney.id,
      pesoOccurrence: 1,
      nameOccurrence: typeJourney.occurrence,
      dateOccurence: new Date(),
    }
    try {
      await AsyncStorage.setItem('@CurrentOccurrence', JSON.stringify(obj) );
    } catch (e) {
      console.error(e);
    }
  }

  let Component2 =
    longitude && (veiculoSelecionado[0] || typeJourney) ? (
      <View style={{flex: 1}}>
        <Text style={styles.infosText}>Informa????es vigentes</Text>
        <View style={{paddingHorizontal: 10}}>
          <InfosJourney></InfosJourney>
        </View>
        {!typeJourney && (
          <>
            <Text style={styles.infosText}>Informa????es veiculo</Text>

            <View style={{paddingHorizontal: 10}}>
              <InfosVeicules
                veiculeType={veiculoSelecionado[0]?.tipoVeiculo}
                plaque={plaque}></InfosVeicules>
            </View>
          </>
        )}
        {typeJourney && (
          <>
            <Text style={styles.infosText}>Ocorr??ncia: {typeJourney.occurrence}</Text>
          </>
        )}

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
            next={(KmComplete || typeJourney) && true}
            stepComponents={[
              <View style={{flex: 1}}>
                <Text style={styles.infosText}>Informa????es vigentes</Text>
                <View style={{paddingHorizontal: 10}}>
                  <InfosJourney></InfosJourney>
                </View>
                <Text style={[styles.subtitule, {color: 'black'}]}>
                  Jornada
                </Text>
                <View style={styles.containerGroupItens}>
                  <RadioButton.Group
                    onValueChange={newValue => {
                      setValue(newValue), setTypeJourney();
                    }}
                    value={value}>
                    <View>
                      <RadioButton.Item
                        label="Com Veiculo"
                        value="first"
                        color="black"
                        labelStyle={{ fontSize: hp('1.8%')}}
                        style={{marginHorizontal: -10, borderRadius: 5, width: wp('80%'), height:hp('5%')}}
                      />
                    </View>
                    <View>
                      <RadioButton.Item
                        label="Sem Veiculo"
                        value="second"
                        color="black"
                        labelStyle={{ fontSize: hp('1.8%')}}
                        style={{marginHorizontal: -10, width: wp('80%'), height:hp('5%')}}
                      />
                    </View>
                  </RadioButton.Group>
                </View>

                {/* JORNADA SEM VEICULO */}
                {value == 'second' && (
                  <>
                    <Text style={[styles.subtitule, {color: 'black'}]}>
                      Tipo de jornada sem veiculo
                    </Text>
                    <SelectItens
                      placehoulder={'Selecione uma jornada'}
                      array={Ocurrences}
                      callback={itemSelected}
                    />
                  </>
                )}

                {/* JORNADA COM VEICULO */}

                {value == 'first' && (
                  <>
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
                        onEndEditing={()=>getVeicule(plaque)}
                        value={plaque}
                        maxLength={8}
                      />
                    </View>
                    {Color == '#b80003' && (
                      <Text
                        style={{
                          marginLeft: 20,
                          marginTop: -15,
                          color: '#b80003',
                          fontSize: hp('1.41%'),
                        }}>
                        Nenhum ve??culo encontrado com essa placa.
                      </Text>
                    )}
                    {veiculoSelecionado.length > 0 && (
                      <Text
                        style={{
                          marginLeft: 20,
                          marginTop: -15,
                          paddingBottom: 10,
                          color: '#00bd2f',
                        }}>
                        Ve??culo encontrado: {veiculoSelecionado[0].tipoVeiculo}
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
                  </>
                )}
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
    fontSize: hp('2.1%'),
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
    fontSize: hp('1.65%'),
  },
  input: {
    justifyContent:'center',
    alignItems:'center',
    fontSize: hp('1.8%'),
    paddingHorizontal: 10,
    paddingVertical:hp('0.8%'),
    height: hp('4.75%'),
    marginTop: 10,
    margin: 15,
    borderWidth: 1,
    borderColor: '#00bd2f',
    borderRadius: 5,
    color: 'black',
    width: wp('75%'),
  },
  subtitule: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
  },
  infosText: {
    marginLeft: 15,
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
    marginVertical: 10,
  },
  containerTextInputIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectTypeJourney: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  containerSelect: {
    marginTop: 10,
    marginHorizontal: 18,
    borderWidth: 1,
    borderRadius: 5,
  },
  containerGroupItens: {
    marginTop: 10,
    marginHorizontal: 15,
  },

  itenSelect2: {
    padding: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
