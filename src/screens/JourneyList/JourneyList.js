import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  BackHandler
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../../components/Modal/AddJourney';
import Filter from '../../components/Modal/FilterInventory';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import commonStyles from '../../commonStyles';
import EditInventory from '../../components/Modal/EditInventory';
import getRealm from '../../services/realm';
import styles from './styles'
import Loader from '../../components/Loader';

export function JourneyList({navigation}) {
  const [LoaderVisiBle, setLoaderVisible]= useState(false)
  const refresh = useSelector((state) => state.inventorys.refresh);
  const statusModal = useSelector(
    (state) => state.showModal.showModalFILTERINVENTORY,
  );
    const colorButton= commonStyles.color.headers
  const dispatch = useDispatch();

  const [Inventorys, setInventorys] = useState([]);

  function callBackFilter(textFilter) {
    loadJourney();
    onRefresh();
  }

  async function loadJourney() {
    const realm = await getRealm();

    const data = realm
      .objects('Journey')
    setInventorys(data);
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
    }, [route])      
  )

  const onRefresh = () => {
    dispatch({type: 'REFRESH', payload: [true]});
    setInterval(() => {
      dispatch({type: 'REFRESH', payload: [false]});
    }, 1000);
  };

  function callbackInventory  (status) {
    setLoaderVisible(status)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={LoaderVisiBle}></Loader>
      <Modal />

      <EditInventory />
      <View style={styles.headerView}>
        <Filter callback={callBackFilter} />

        <TouchableOpacity
          style={styles.buttonOpenDrawer}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View>
            <FontAwesome name="bars" size={25} color={colorButton}></FontAwesome>
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
            <FontAwesome name={statusModal?"close":'search'} size={25} color={colorButton}></FontAwesome>
          </View>
        </TouchableOpacity>
      </View>
      {Inventorys.length == 0 && (
        <View style={{flex: 8, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.addButtonCenter}
            onPress={() => dispatch({type: 'SHOW_MODAL_ADDINVENTORY_ON'})}
            activeOpacity={0.7}>
            <Text style={styles.TextButtonCenter}>Nova Jornada</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

