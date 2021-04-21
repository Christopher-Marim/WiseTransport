import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  TextInput,
  Keyboard
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonStyles';
import Item from '../../components/InventoryItem';
import EditItem from '../../components/Modal/EditItem';
import EllipsisItem from '../../components/Modal/EllipsisItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import getRealm from '../../services/realm';
import styles from'./styles'
import Filter from '../../components/Modal/FilterInventory';

export default function ItemList(props) {
  const refresh = useSelector((state) => state.inventorys.refresh);
  const idInventory = useSelector((state) => state.inventorys.currentID);
  const coleta = useSelector((state) => state.barcodes.barcode);
  console.log(coleta);
  const [itens, setItens] = useState([]);
  const [auxNome, setAuxNome] = useState('');
  const [qtdProduto, setQtdProduto] = useState('1');
  const [codProduto, setCodProduto] = useState(coleta ? coleta : '');
  const statusModal = useSelector(
    (state) => state.showModal.showModalFILTERINVENTORY,
  );

  const refProduct = useRef(null)

  const dispatch = useDispatch();

  useEffect(() => {
    setCodProduto(coleta ? coleta : '');
  }, [coleta]);

  async function addToFlatList() {
    const realm = await getRealm();

    let dataInventorys = realm.objectForPrimaryKey('Inventorys', idInventory);
    let dataStorageProducts = realm.objects('StorageProducts');

    if (dataStorageProducts.filtered(`cod == "${codProduto}" `).length !== 0) {
      var store = dataStorageProducts.filtered(`cod == "${codProduto}" `);
    }

    realm.write(() => {
      dataInventorys.itens.unshift({
        id: Math.random() * 100000,
        cod: store ? store[0].cod : codProduto,
        idCod: store ? store[0].id : 0,
        qtd: qtdProduto,
        desc: store ? store[0].desc : codProduto,
        value: '',
        info1: store ? store[0].info1 : '',
        info2: store ? store[0].info2 : '',
        info3: store ? store[0].info3 : '',
        info4: store ? store[0].info4 : '',
        system_user_id: store ? store[0].system_user_id : '',
        system_unit_id: store ? store[0].system_unit_id : '',
      });
      AtualizarLista();
    });
    clearInputs();
    getFocusInputNewProduct()
  }

  function AtualizarLista() {
    dispatch({type: 'REFRESH_INVENTORY', payload: [true]});
    setInterval(() => {
      dispatch({type: 'REFRESH_INVENTORY', payload: [false]});
    }, 1000);
  }

  function clearInputs() {
    setCodProduto('');
    setQtdProduto('1');
  }

  async function attListInventorys() {
    const realm = await getRealm();
    let dataInventorys = realm.objects('ItensInventory');
    let dataStorageProducts = realm.objects('StorageProducts');

    dataInventorys.forEach((element) => {
      if (
        dataStorageProducts.filtered(`cod == "${element.cod}" `).length !== 0
      ) {
        var store = dataStorageProducts.filtered(`cod == "${element.cod}" `);

        realm.write(() => {
          realm.create(
            'ItensInventory',
            {
              id: element.id,
              desc: store ? store[0].desc : element.desc,
              idCod: store ? store[0].id : 0,
              info1: store ? store[0].info1 : '',
              info2: store ? store[0].info2 : '',
              info3: store ? store[0].info3 : '',
              info4: store ? store[0].info4 : '',
            },
            'modified',
          );
        });
        AtualizarLista();
      }
    });
  }

  function callBackFilter(textFilter) {
    loadItens(textFilter);
  }

  async function loadItens(textFilter ='') {
    const realm = await getRealm();

    let {nome, itens} = realm.objectForPrimaryKey('Inventorys', idInventory);


    
    setAuxNome(nome);
    setItens(itens.filtered(`cod CONTAINS[c] "${textFilter}" `));
  }

  useEffect(() => {
    loadItens();
    attListInventorys();
  }, []);


  const getFocusInputNewProduct = () => {
    refProduct.current.focus();
  };

  const renderitem = useCallback(({item}) => (
    <View style={{padding: 3}}>
      <Item
        id={item.id}
        cod={item.cod}
        qtd={item.qtd}
        desc={item.desc}
        info1={item.info1}
        info2={item.info2}
        info3={item.info3}
        info4={item.info4}></Item>
    </View>
  ), []) 

  
  return (
    <SafeAreaView style={styles.container}>
      <EditItem />
      

      <Filter callback={callBackFilter} />
      
      <EllipsisItem navigation={props.navigation} />

      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.buttonGoBack}
          onPress={() => props.navigation.goBack()}>
          <View>
            <FontAwesome
              name="chevron-left"
              size={25}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
        
          
        <Text adjustsFontSizeToFit
        numberOfLines={1}
         style={[styles.text,{maxWidth:300}]}>{auxNome}</Text>
        

        {statusModal == false&&(<TouchableOpacity
          style={styles.buttonOpenEllipsis}
          onPress={() => {
            dispatch({type: 'SHOW_MODAL_ELLIPSIS_ON'});
          }}>
          <View>
            <FontAwesome
              name="ellipsis-v"
              size={25}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>)}
        {statusModal == true&&(<TouchableOpacity
          style={styles.buttonOpenEllipsis}
          onPress={() => {
            dispatch({type: 'SHOW_MODAL_FILTER_INVENTORY_OFF'});
          }}>
          <View>
            <FontAwesome
              name="close"
              size={30}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>)}
      </View>

      {/*--------------ColetaManual--------------*/}

      <View style={styles.containerAdd}>
        <View style={{paddingHorizontal: 5, justifyContent: 'center'}}>
          <Text style={styles.textBusca}>Qtd</Text>
          <TextInput
            placeholder={'QTD'}
            style={styles.textInputQtd}
            onChangeText={(text) => {
              setQtdProduto(text);
            }}
            value={qtdProduto}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.textBusca}>Código do produto</Text>
          <View style={{flexDirection: 'row', paddingRight: 190}}>
            <TextInput
              placeholder={'Código do produto'}
              style={styles.textInputCod}
              ref={refProduct}
              onChangeText={(text) => {
                setCodProduto(text);
              }}
              value={codProduto}
              keyboardType="default"
              onSubmitEditing={()=>{  
                addToFlatList();
                dispatch({type: 'CHANGE_STATUS_INVENTORY', payload:[true]})
                Keyboard.dismiss()
              }}
              
            />
            {qtdProduto.length > 0 && codProduto.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  addToFlatList();
                  dispatch({type: 'CHANGE_STATUS_INVENTORY', payload:[true]})
                }}>
                <View
                  style={{
                    backgroundColor: commonStyles.color.InventoryPrincipal,
                    borderRadius: 22,
                    height: 45,
                    width: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 50, paddingBottom: 5, color: 'white'}}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {(qtdProduto.length == 0 || codProduto.length == 0) && (
              <TouchableOpacity
                onPress={() => {}}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={45}
                  color={commonStyles.color.InventoryPrincipal}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {itens.length > 0 && (
        <View style={{flex: 9}}>
          <View style={{flex: 9}}>
            <View style={styles.itemList}>
              <FlatList
                data={itens}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderitem}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={5} // Reduce initial render amount
                maxToRenderPerBatch={8} // Reduce number in each render batch
                updateCellsBatchingPeriod={100} // Increase time between renders
                windowSize={20} // Reduce the window size
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#cdc8cf',
              height: 40,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                fontFamily: commonStyles.fontFamily,
                fontWeight: commonStyles.fontWeight,
              }}>{`Total de itens: ${itens.length} `}</Text>
          </View>
        </View>
      )}
      {itens.length == 0 && (
        <View style={{flex: 9, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              flex: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
        </View>
      )}
    </SafeAreaView>
  );
}


