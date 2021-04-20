import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import commonStyles from '../commonStyles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import getRealm from '../services/realm';

export default (props) => {
  const [borderRadiusCONST, setborderRadius] = useState(10);
  const idInventory = useSelector((state) => state.inventorys.currentID);

  const dispatch = useDispatch();
  const onRefresh = () => {
    dispatch({type: 'REFRESH_INVENTORY', payload: [true]});
    setInterval(() => {
      dispatch({type: 'REFRESH_INVENTORY', payload: [false]});
    }, 1000);
  };

  const getLeftContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <TouchableOpacity
          onPress={() => {
            dispatch({type: 'SHOW_MODAL_EDTITEM_INVENTORY_ON'});
            dispatch({type: 'CURRENT_ID_ITEM_INVENTORY', payload: [props.id]});
          }}
          style={styles.left2}
          activeOpacity={0.5}>
          <Icon name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  async function DelItem() {
    const realm = await getRealm();

    let data = realm.objectForPrimaryKey('Inventorys', idInventory);

    realm.write(() => {
      let index = data.itens.findIndex((x) => x.id == props.id);
      data.itens.splice(index, 1);
    });

    onRefresh();
  }

  const getRightContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <TouchableOpacity
          onPress={DelItem}
          style={styles.right}
          activeOpacity={0.5}>
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={getLeftContent}
      renderRightActions={getRightContent}
      onSwipeableWillOpen={() => setborderRadius(0)}
      onSwipeableWillClose={() => setborderRadius(10)}>
      <View
        style={[
          styles.container,
          {
            paddingBottom: 10,
            borderBottomLeftRadius: borderRadiusCONST,
            borderTopLeftRadius: borderRadiusCONST,
          },
        ]}>
        <View style={styles.container2}>
          <View style={styles.textCollect}>
            <Text style={styles.nomeCollect}>{props.cod}</Text>
            <Text style={{fontWeight: commonStyles.fontWeight}}>
              Descrição: {props.desc}
            </Text>

            {props.info1.length > 1 && (
              <Text style={{fontWeight: commonStyles.fontWeight}}>
                {props.info1}
              </Text>
            )}
            {props.info2.length > 1 && (
              <Text style={{fontWeight: commonStyles.fontWeight}}>
                {props.info2}
              </Text>
            )}
            {props.info3.length > 1 && (
              <Text style={{fontWeight: commonStyles.fontWeight}}>
                {props.info3}
              </Text>
            )}
            {props.info4.length > 1 && (
              <Text style={{fontWeight: commonStyles.fontWeight}}>
                {props.info4}
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            padding: 0,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <View style={{paddingTop: 20, paddingHorizontal: 10}}>
            <Text style={{fontWeight: commonStyles.fontWeight}}>
              Qtd: {props.qtd}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 1,
    borderLeftWidth: 5,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: 15,
    borderRadius: 5,
    borderLeftColor: commonStyles.color.InventoryPrincipal,
    backgroundColor: 'white',
  },
  textCollect: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  nomeCollect: {
    fontSize: 20,
    fontWeight: commonStyles.fontWeight,
  },
  left2: {
    backgroundColor: '#4287f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  containerSwipeable: {
    flexDirection: 'row',
  },
  right: {
    backgroundColor: '#bf1f1f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  MoreInfButton: {
    backgroundColor: 'transparent',
    padding: 10,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
  },
  flatList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    backgroundColor: '#F0F0FA',
    borderRadius: 5,
  },
});
