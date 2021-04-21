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
import Inventory from '../../components/Inventory';
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
    loadInventorys(textFilter);
    onRefresh();
  }

  async function loadInventorys(textFilter = '') {
    const realm = await getRealm();

    const data = realm
      .objects('Inventorys')
      .sorted('dateAt')
      .filtered(`nome CONTAINS[c] "${textFilter}" `);

    setInventorys(data);
  }

  useEffect(() => {
    loadInventorys();
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
        <Text style={styles.Text}>Minhas Viagens</Text>

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
      {Inventorys.length > 0 && (
        <View style={{flex: 8}}>
          <View style={styles.collectList}>
            <FlatList
              data={Inventorys}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({item}) => (
                <View style={{padding: 5, }}>
                  <Inventory
                    id={item.id}
                    dateAt={item.dateAt}
                    nome={item.nome}
                    itens={item.itens}
                    check={item.check ? item.check : false}
                    idGet={item.idGet ? item.idGet : 0}
                    qtdItens={item.qtdItens ? item.qtdItens : 0}
                    navigation={navigation}
                    callbackInventoryItem={callbackInventory}
                    ></Inventory>
                </View>
              )}
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
              }
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch({type: 'SHOW_MODAL_ADDINVENTORY_ON'})}
            activeOpacity={0.7}>
            <FontAwesome
              name="plus"
              size={20}
              color={commonStyles.color.secondary}
            />
          </TouchableOpacity>
        </View>
      )}
      {Inventorys.length == 0 && (
        <View style={{flex: 8, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.addButtonCenter}
            onPress={() => dispatch({type: 'SHOW_MODAL_ADDINVENTORY_ON'})}
            activeOpacity={0.7}>
            <Text style={styles.TextButtonCenter}>Novo Inventário</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

