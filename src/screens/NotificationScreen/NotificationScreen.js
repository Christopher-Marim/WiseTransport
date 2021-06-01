import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Switch,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompleteNotification from '../../components/Modal/ModalNoticiaCompleta/CompleteNotification';
import ItemNoticia from '../../components/ComponentNoticia/ItemNoticia';
import {
  setJSExceptionHandler,
  getJSExceptionHandler,
} from 'react-native-exception-handler';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../../components/Loader';

import {getParmsAPI} from '../../services/api';
import commonStyles from '../../commonStyles';
import {useFocusEffect, useRoute} from '@react-navigation/core';
import {useCallback} from 'react';

export default function NotificationScreen({navigation}) {
  const [ModalNotificationVisible, setModalNotificationVisible] = useState(
    false,
  );
  const refresh = useSelector(state => state.inventorys.refresh);
  const noticias = useSelector(state => state.noticias.noticias);
  const [TituloCallback, setTituloCallback] = useState('');
  const [subTextCalback, setSubTextCallback] = useState('');
  const [DataCallback, setDataCallback] = useState('');
  const [HoraCallback, setHoraCallback] = useState('');
  const [isVisibleCheck, setIsVisibleCheck] = useState(false);
  const [visibleLoader, setVisibleLoader] = useState(false);
  const [idCallback, setIdCallback] = useState();
  const [BaseURL, setBaseURL] = useState('http://transportadora.etm.ltda');
  const [SystemUserId, setSystemUserId] = useState('');
  const BASIC_AUTHORIZATION =
    'Basic ac0fb7c1dedf6eb4cb16e4dab5fac37a63bf447f74a8c47366f9e7f5d72d';

  const corBotão = commonStyles.color.headers;
  const dispatch = useDispatch();

  const errorHandler = (error, isFatal) => {
    Alert.alert(`Error:${error.name} / ${error.message}`);
  };
  //Second argument is a boolean with a default value of false if unspecified.
  //If set to true the handler to be called in place of RED screen
  //in development mode also.
  setJSExceptionHandler((error, isFatal) => {
    errorHandler(error, isFatal);
  }, true);

  useEffect(() => {
    getSystemUserId();
    getParmsAPI().then(res => {
      setBaseURL(res);
    });
    getNoticias();
  }, []);

  const tougleEye = () => {
    setIsVisibleCheck(!isVisibleCheck);
  };

  async function getSystemUserId() {
    try {
      const useraux = await AsyncStorage.getItem('@User');
      const store = JSON.parse(useraux);
      setSystemUserId(store.system_user_id);
    } catch (e) {
      errorHandler(e, false);
      console.error(e);
    }
  }

  // recebe uma callback da modal para fechar ela
  function callbackModalNotification(statusModal, CheckRead) {
    setModalNotificationVisible(statusModal);
  }
  //Ao clilcar no item recebe uma callback Com o titulo, text, data e hora do item selecionado, alem do comando para
  //mostrar a modal
  function callbackItemNoticia(
    statusModal,
    TituloItem,
    SubTextItem,
    DataItem,
    HoraItem,
    IdItem,
  ) {
    setModalNotificationVisible(statusModal);
    setTituloCallback(TituloItem);
    setSubTextCallback(SubTextItem);
    setDataCallback(DataItem);
    setHoraCallback(HoraItem);
    setIdCallback(IdItem);
  }

  const api = axios.create({
    baseURL: `${BaseURL}`,
    headers: {
      Authorization:
        'Basic ac0fb7c1dedf6eb4cb16e4dab5fac37a63bf447f74a8c47366f9e7f5d72d',
    },
  });

  const route = useRoute();
  useFocusEffect(
    useCallback(() => {
      if (route.name === 'NotificationScreen') {
        getSystemUserId();
        getParmsAPI().then(res => {
          setBaseURL(res);
        });
        getNoticias();
      }
    }, [route]),
  );

  async function getNoticias() {
    try {
      setVisibleLoader(true);
      await api
        .get(`/noticias?method=loadAll&systemuserid=${SystemUserId}`)
        .then(result => {
          dispatch({type: 'CLEAN_NOTICIAS'});
          console.log(result.data.data);
          result.data.data.forEach(element => {
            if (element.checked == 'Y') {
              element.checked = true;
            } else {
              element.checked = false;
            }

            dispatch({
              type: 'ADD_NOTICIA',
              payload: [
                element.id,
                element.subject,
                element.message,
                element.dt_message,
                element.checked,
              ],
            });
          });
          setVisibleLoader(false);
        });
      dispatch({type: 'REFRESH', payload: [false]});
    } catch (error) {
      console.log(error);
      Alert.alert("Sem conexão", "Verifique sua conexão a internet!")
      dispatch({type: 'REFRESH', payload: [false]});
      setVisibleLoader(false);
    }
  }

  const onRefresh = () => {
    dispatch({type: 'REFRESH', payload: [true]});
  };

  async function postCheckNoticia(id) {
    setVisibleLoader(false);
    setModalNotificationVisible(false);

    console.log('ID' + id);
    await api.put(`/noticias/${id}?checked=Y`).then(result => {
      console.log(result.data.data);
    });
    getNoticias();
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: commonStyles.color.page}}>
      <Loader visible={visibleLoader} />
      <CompleteNotification
        visible={ModalNotificationVisible}
        callback={callbackModalNotification}
        titulo={TituloCallback}
        subText={subTextCalback}
        data={DataCallback}
        hora={HoraCallback}
        id={idCallback}
        callbackCheck={postCheckNoticia}
      />
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.buttonOpenDrawer}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View>
            <FontAwesome name="bars" size={hp('3%')} color={corBotão}></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text style={[styles.Text,{fontSize:hp('3.0%')}]}>Notificações</Text>
        <View
          style={{
            flexDirection: 'row',
            width: wp('30%'),
            justifyContent: 'space-between',
            position: 'absolute',
            padding: 10,
            right: 10,
          }}>
          <TouchableOpacity
            style={{width: wp('10%'), height: hp('5%') ,justifyContent: 'center', alignItems:'center'}}
            onPress={() => {
              getSystemUserId();
              getParmsAPI().then(res => {
                setBaseURL(res);
              });
              getNoticias();
            }}>
            <FontAwesome
              name="refresh"
              size={hp('3%')}
              color={corBotão}></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity 
          style={{width: wp('10%'), height: hp('5%'), justifyContent: 'center', alignItems:'center'}}
          onPress={tougleEye}
          >
            {isVisibleCheck? (
              <MaterialCommunityIcons name={'eye'} size={hp('4%')} color={corBotão} />
            ):
              (<MaterialCommunityIcons
                name={'eye-off-outline'}
                size={hp('4%')}
                color={corBotão}
              />)
            }
            
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 8}}>
        {noticias.length != 0 && (
          <View style={styles.collectList}>
            <FlatList
              data={noticias ? noticias : []}
              keyExtractor={noticia => `${noticia.id}`}
              renderItem={({item}) => (
                console.log('ITEM  ' + item.lido),
                (
                  <View style={{padding: 3}}>
                    {item.lido == isVisibleCheck && (
                      <ItemNoticia
                        titulo={item.subject}
                        subText={item.message}
                        data={item.data}
                        callback={callbackItemNoticia}
                        check={item.lido}
                        api={api}
                        id={item.id}
                        attList={getNoticias}
                      />
                    )}
                  </View>
                )
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={(onRefresh, getNoticias)}
                />
              }
            />
          </View>
        )}
        {noticias.filter(element => {
          if (element.lido == isVisibleCheck) {
            return true;
          } else {
            return false;
          }
        }) == false && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              padding: 10,
              marginTop: -30,
              paddingBottom: 80,
            }}>
            <MaterialCommunityIcons
              name="bell-off-outline"
              size={hp('18%')}
              color={corBotão}
            />
            <View style={{padding: 10, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  color: commonStyles.color.texts,
                  fontWeight: 'bold',
                }}
                adjustsFontSizeToFit={true}>
                Nada aqui!!!
              </Text>
              <Text
                style={{
                  fontSize: hp('2.1%'),
                  color: commonStyles.color.texts,
                  textAlign: 'center',
                }}
                adjustsFontSizeToFit={true}>
                Clique no botão de atualizar para checar se há novas
                notificações.
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
