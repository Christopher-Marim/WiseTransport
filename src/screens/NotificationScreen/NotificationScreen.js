import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Switch,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompleteNotification from '../../components/Modal/ModalNoticiaCompleta/CompleteNotification';
import ItemNoticia from '../../components/ComponentNoticia/ItemNoticia';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getRealm from '../../services/realm';
import Loader from '../../components/Loader';

import {getParmsAPI} from '../../services/api'
import commonStyles from '../../commonStyles';

export default function NotificationScreen({navigation}) {
  const [ModalNotificationVisible, setModalNotificationVisible] = useState(
    false,
  );
  const refresh = useSelector((state) => state.inventorys.refresh);
  const noticias = useSelector((state) => state.noticias.noticias);
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

    const corBotão = commonStyles.color.headers
  const dispatch = useDispatch();

  useEffect(() => {
    getNoticias();
    
  }, []);

  const tougleEye = () => {
    setIsVisibleCheck(!isVisibleCheck);
  };

  async function getSystemUserId() {
    const realm = await getRealm();
    const store = realm.objects('User');
    console.log('store: ' + store[0].system_user_id);
    setSystemUserId(store[0].system_user_id);
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
      Authorization: BASIC_AUTHORIZATION,
    },
  });

  async function getNoticias() {
    getSystemUserId();
    getParmsAPI().then(res=>{setBaseURL(res)})
    try {
      setVisibleLoader(true);
      await api
        .get(`/noticias?method=loadAll&systemuserid=${SystemUserId}`)
        .then((result) => {
          dispatch({type: 'CLEAN_NOTICIAS'});
          console.log(result.data.data);
          result.data.data.forEach((element) => {
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
    await api.put(`/noticias/${id}?checked=Y`).then((result) => {
      console.log(result.data.data);
    });
    getNoticias();
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:commonStyles.color.page}}>
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
            <FontAwesome name="bars" size={25} color={corBotão}></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text style={styles.Text}>Notificações</Text>
        <View
          style={{
            flexDirection: 'row',
            width: 115,
            justifyContent: 'space-between',
            position:'absolute',
            padding:10,
            right:10
          }}>
          <TouchableOpacity
            style={{width: 30, height: 30, alignItems: 'center'}}
            onPress={() => {
              getNoticias();
            }}>
            <FontAwesome name="refresh" size={25} color={corBotão}></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity onPress={tougleEye}>
            {isVisibleCheck == true && (
              <MaterialCommunityIcons name={'eye'} size={30} color={corBotão} />
            )}
            {isVisibleCheck == false && (
              <MaterialCommunityIcons
                name={'eye-off-outline'}
                size={30}
                color={corBotão}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 8}}>
        {noticias.length != 0 && (
          <View style={styles.collectList}>
            <FlatList
              data={noticias ? noticias : []}
              keyExtractor={(noticia) => `${noticia.id}`}
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
        {noticias.filter((element) => {
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
              size={150}
              color={corBotão}
            />
            <View style={{padding: 10, alignItems: 'center'}}>
              <Text
                style={{fontSize: 20, color: commonStyles.color.texts, fontWeight: 'bold'}}
                adjustsFontSizeToFit={true}>
                Nada aqui!!!
              </Text>
              <Text
                style={{fontSize: 18, color: commonStyles.color.texts, textAlign: 'center'}}
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
