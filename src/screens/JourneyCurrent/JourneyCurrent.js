import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Animated,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import moment from 'moment';

import Modal from '../../components/Modal/AddJourney';
import commonStyles from '../../commonStyles';
import getRealm from '../../services/realm';
import styles from './styles';
import Loader from '../../components/Loader';
import {InfosJourney} from '../../components/InfosJourney';
import {InfosVeicules} from '../../components/InfosVeicule';
import {CreateOccurrence} from '../../components/CreateOccurrence';
import {CurrentOccurrence} from '../../components/SwipeableOccurence';
import {getParmsAPI} from '../../services/api';
import commonsVariables from '../../../commonsVariables';
import {KmFinalModal} from '../../components/Modal/KmFinalModal';

export function JourneyCurrent({navigation}) {
  const [LoaderVisiBle, setLoaderVisible] = useState(false);
  const [modalKmFinalVisible, setModalKmFinalVisible] = useState(false);
  const [infosVisible, setInfosVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [createBegin, setcreateBegin] = useState(false);
  const [createFinish, setCreateFinish] = useState(null);
  const [Journey, setJourney] = useState();
  const [Occurrences, setOccurrences] = useState([]);
  const [Heartbeat] = useState(new Animated.Value(0));
  const colorButton = commonStyles.color.headers;
  const [BaseURL, setBaseURL] = useState('');

  const dispatch = useDispatch();

  async function loadJourney() {
    const realm = await getRealm();

    const data = realm.objects('Journey').filter(x=>{if(!x.dateFinish){setJourney(x), setOccurrences(x.occurrences);}});
    console.log(Journey)
  }

  const getData = async () => {
    try {
      const occurrenceAux = await AsyncStorage.getItem('@CurrentOccurrence');

      console.log('AA' + occurrenceAux);
      if (occurrenceAux?.length > 2) {
        setCreateFinish(true);
      } else {
        setCreateFinish(false);
      }
      loadJourney();
    } catch (e) {
      console.error(e);
      loadJourney();
    }
  };
  useEffect(() => {
    getData();
    loadJourney();
    getParmsAPI().then(res => {
      setBaseURL(res);
    });
  }, []);

  const route = useRoute();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'JourneyCurrent') {
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  function handleClickInfos() {
    setInfosVisible(!infosVisible);
  }
  function handleClickList() {
    setListVisible(!listVisible);
  }
  function handleCreateBegin(status, create) {
    getData();
    setcreateBegin(status);
    HeartbeatAnimation();
  }

  function HeartbeatAnimation() {
    Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(Heartbeat, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(Heartbeat, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }

  async function PostJourney() {
    try {
     console.log(Journey.operator_id)

      const {data} = await api.post('/jornada', {
        funcionario_id: Journey.operator_id,
        carro_id: Journey.veicule_id,
        datainiciojornada:moment(Journey.dateStart).format("YYYY-MM-DD hh:mm:ss"),
        datafimjornada:moment(Journey.dateFinal).format("YYYY-MM-DD hh:mm:ss"),
        kminicial: Journey.kmInicial,
        kmfinal: Journey.kmFinal,
        kmrodado: parseInt(Journey.kmFinal) - parseInt(Journey.kmInicial),
        latitudeinicial: Journey.latitudeInicial,
        latitudefinal: Journey.latitudeFinal,
        longitudeinicial: Journey.longitudeInicial,
        longitudefinal: Journey.longitudeFinal,
        system_unit_id: Journey.systemUnitId,
        system_user_id: Journey.systemUserId,
      });
  
     const idJornada = data.data.id
     console.log(data)
     PostOccurrences(idJornada)
  
    } catch (error) {

     Alert.alert('Erro', 'Erro ao finalizar a jornada, quando tiver conexão a internet procure reenviar essa jornada na lista de jornadas.')
     loadJourney();
     callbackCloseModalKMFinal()
    }
  }

  
  const forEachCustom = async (idJornada, element) => {
    try {
      const response = await api.post('/jornadaocorrencia', { 
        jornada_id: idJornada,
        ocorrencia_id: element.occurrence_id,
        system_unit_id: Journey.systemUnitId,
        system_user_id: Journey.systemUserId,
        datahorainicio: moment(element.dataInicio).format("YYYY-MM-DD hh:mm:ss"),
        datahorafim: moment(element.dataFim).format("YYYY-MM-DD hh:mm:ss"),
        latitude: element.latitade,
        longitude: element.longitude
      });
      console.log(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  async function PostOccurrences(idJornada) {
    for (let i = 0; i < Journey.occurrences.length; i++) {
      const element = Journey.occurrences[i];
      await forEachCustom(idJornada, element)
    }

    const realm = await getRealm();

    realm.write(() => {
      realm.create(
        'Journey',
        {
          id: Journey.id,
          check:true
        },
        'modified',
      );
    });

    loadJourney();
     callbackCloseModalKMFinal()
  }

  const api = axios.create({
    baseURL: `${BaseURL}`,
    headers: {
      Authorization: commonsVariables.api.Authorization,
    },
  });

  const boxInterpolation = Heartbeat.interpolate({
    inputRange: [0, 1],
    outputRange: [commonStyles.color.contrastante, '#0896d4'],
  });
  const boxInterpolation2 = Heartbeat.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 2.5],
  });
  const animatedStyle = {
    backgroundColor:'white',
    borderColor: boxInterpolation,
    borderWidth: boxInterpolation2,
  };

  const formatteddate = data =>
    moment(data).locale('pt-br').format('DD/MM/YYYY');
  const callbackLoaderVisible = status => setLoaderVisible(status);
  const callbackCloseModalKMFinal = () => (
     setModalKmFinalVisible(false)
  );

  const formattedHours = horas => moment(horas).locale('pt-br').format('LT');

  return (
    <SafeAreaView style={styles.container}>
      <Modal callback={loadJourney} />
      <KmFinalModal
        kmInicial={Journey?.kmInicial}
        JourneyId={Journey?.id}
        loaderVisible={callbackLoaderVisible}
        visible={modalKmFinalVisible}
        callbackClose={callbackCloseModalKMFinal}
        post={PostJourney}
      />
      <Loader visible={LoaderVisiBle}></Loader>

      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.buttonOpenDrawer}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View>
            <FontAwesome
              name="bars"
              size={25}
              color={colorButton}></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text style={styles.Text}>Minha jornada</Text>

        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={() => {
            setModalKmFinalVisible(true);
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: commonStyles.color.headers,
                marginHorizontal: 5,
                fontSize: 16,
              }}>
              Finalizar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {(!Journey) && (
        <View style={{flex: 8, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.addButtonCenter}
            onPress={() => dispatch({type: 'SHOW_MODAL_ADDINVENTORY_ON'})}
            activeOpacity={0.7}>
            <Text style={styles.TextButtonCenter}>Nova Jornada</Text>
          </TouchableOpacity>
        </View>
      )}
      {(!Journey?.dateFinish&&Journey) && (
        <View
          style={[
            styles.container2,
            !Journey && {backgroundColor: commonStyles.color.page},
          ]}>
          <View style={styles.group}>
            <TouchableOpacity
              style={styles.buttonInfos}
              onPress={handleClickInfos}>
              <Text style={styles.subTitle}>Informações</Text>
              {infosVisible && (
                <MaterialCommunityIcons name={'chevron-up'} size={32} />
              )}
              {!infosVisible && (
                <MaterialCommunityIcons name={'chevron-down'} size={32} />
              )}
            </TouchableOpacity>
            {infosVisible && (
              <View style={styles.wrapper}>
                <InfosJourney backgroundColor={'white'} />
                <InfosVeicules backgroundColor={'white'} />
              </View>
            )}
          </View>
          {!createFinish && (
            <Animated.View
              style={[
                styles.group,
                {marginVertical: 10, backgroundColor: commonStyles.color.InventoryPrincipal},
                createBegin && {...animatedStyle},
              ]}>
              <CreateOccurrence
                responseCallback={handleCreateBegin}
                getData={getData}
              />
            </Animated.View>
          )}

          {createFinish && (
            <View style={{marginVertical: 10}}>
              <CurrentOccurrence
                callback={getData}
                loaderVisible={callbackLoaderVisible}
              />
            </View>
          )}

          <View style={[styles.group, listVisible && {flex: 1}]}>
            <TouchableOpacity
              style={styles.buttonInfos}
              onPress={handleClickList}>
              <Text
                style={[styles.subTitle, listVisible && {marginBottom: 10}]}>
                Lista de ocorrências
              </Text>
              {listVisible && (
                <MaterialCommunityIcons
                  name={'chevron-up'}
                  size={32}
                  style={{marginBottom: 10}}
                />
              )}
              {!listVisible && (
                <MaterialCommunityIcons
                  name={'chevron-down'}
                  size={32}
                  style={listVisible && {marginBottom: 10}}
                />
              )}
            </TouchableOpacity>
            {listVisible && Occurrences.length > 0 && (
              <FlatList
                data={Occurrences}
                contentContainerStyle={{paddingHorizontal: 10}}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        padding: 10,
                        marginVertical: 5,
                        borderRadius: 5,
                        borderWidth: 2,
                      }}>
                      <Text style={styles.TextOccurrence}>
                        {item.occurrence}
                      </Text>
                      <View style={{justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Inicio: {formatteddate(item.dataInicio)}</Text>
                          <Text> {formattedHours(item.dataInicio)}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Fim: {formatteddate(item.dataFim)}</Text>
                          <Text>
                            {'    '}
                            {formattedHours(item.dataFim)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}

            {listVisible && Occurrences.length == 0 && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <MaterialCommunityIcons
                  name={'alert-outline'}
                  size={60}
                  color="grey"
                  style={{marginTop: -20}}
                />
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'grey'}}>
                  Nenhuma ocorrência registrada!
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
