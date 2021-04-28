import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  BackHandler,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Modal from '../../components/Modal/AddJourney';
import Filter from '../../components/Modal/FilterInventory';
import commonStyles from '../../commonStyles';
import EditInventory from '../../components/Modal/EditInventory';
import getRealm from '../../services/realm';
import styles from './styles';
import Loader from '../../components/Loader';
import {InfosJourney} from '../../components/InfosJourney';
import {InfosVeicules} from '../../components/InfosVeicule';

export function JourneyList({navigation}) {
  const [LoaderVisiBle, setLoaderVisible] = useState(false);
  const [infosVisible, setInfosVisible] = useState(false);
  const statusModal = useSelector(
    state => state.showModal.showModalFILTERINVENTORY,
  );
  const colorButton = commonStyles.color.headers;
  const dispatch = useDispatch();

  const [Journey, setJourney] = useState([]);

  async function loadJourney() {
    const realm = await getRealm();

    const data = realm.objects('Journey');
    setJourney(data);
  }

  useEffect(() => {
    loadJourney();
  }, []);

  const route = useRoute();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'JourneyList') {
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

  return (
    <SafeAreaView style={styles.container}>
      <Modal />

      <EditInventory />
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
            if (statusModal == true) {
              dispatch({type: 'SHOW_MODAL_FILTER_INVENTORY_OFF'});
            } else {
              dispatch({type: 'SHOW_MODAL_FILTER_INVENTORY_ON'});
            }
          }}>
          <View>
            <FontAwesome
              name={statusModal ? 'close' : 'search'}
              size={25}
              color={colorButton}></FontAwesome>
          </View>
        </TouchableOpacity>
      </View>
      {Journey.length == 0 && (
        <View style={{flex: 8, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.addButtonCenter}
            onPress={() => dispatch({type: 'SHOW_MODAL_ADDINVENTORY_ON'})}
            activeOpacity={0.7}>
            <Text style={styles.TextButtonCenter}>Nova Jornada</Text>
          </TouchableOpacity>
        </View>
      )}
      {Journey.length > 0 && (
        <View style={[styles.container2, Journey.length == 0&& {backgroundColor:commonStyles.color.page}]}>
          <View style={styles.group}>
          <TouchableOpacity
            style={styles.buttonInfos}
            onPress={handleClickInfos}>
            <Text style={styles.subTitle}>Informações</Text>
            {infosVisible && (
              <MaterialCommunityIcons name={'chevron-up'} size={30} />
            )}
            {!infosVisible && (
              <MaterialCommunityIcons name={'chevron-down'} size={30} />
            )}
          </TouchableOpacity>
          {infosVisible && (
            <View style={styles.wrapper}>
              <InfosJourney backgroundColor={'white'} />
              <InfosVeicules backgroundColor={'white'} />
            </View>
          )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
