import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Vibration,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import {useDispatch, useSelector} from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import getRealm from '../services/realm';

export function CurrentOccurrence({callback}) {
  const [borderRadiusCONST, setborderRadius] = useState(10);
  const [Inventorys, setInventorys] = useState([]);
  const [ocurrence, setOccurrence] = useState([]);
  const [Check, setCheck] = useState(false);
  const [Heartbeat] = useState(new Animated.Value(0));
  const [ColorCheck, setColorCheck] = useState('green');

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const occurrenceAux = await AsyncStorage.getItem('@CurrentOccurrence');

        if (occurrenceAux !== null) {
          setOccurrence(JSON.parse(occurrenceAux));
        }
      } catch (e) {
        // error reading value
      }
    };

    setInterval(() => {}, 1000);

    getData();
    HeartbeatAnimation();
  }, []);

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

  const boxInterpolation = Heartbeat.interpolate({
    inputRange: [0, 1],
    outputRange: [commonStyles.color.contrastante, '#0896d4'],
  });
  const boxInterpolation2 = Heartbeat.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 2.5],
  });
  const animatedStyle = {
    borderColor: boxInterpolation,
    borderWidth: boxInterpolation2,
  };

  const formatteddate = data =>
    moment(data).locale('pt-br').format('D/MM/YYYY');

  async function setChangesStorage() {
    const realm = await getRealm();

    realm.write(() => {
      realm.create(
        'OccurrenceList',
        {
          id: idInventory,
          check: true,
          qtdItens: Inventorys.itens.length,
        },
        'modified',
      );
    });
    setCheck(props.check ? props.check : true);
    setColorCheck('green');

    refresh();
  }

  const getLeftContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <TouchableOpacity
          style={styles.left1}
          activeOpacity={0.5}
          onPress={() => {
            PostInventory();
            setChangesStorage();
          }}>
          <MaterialCommunityIcons name="check-bold" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async() => { 
              const result = await AsyncStorage.setItem('@CurrentOccurrence',JSON.stringify({}))
              callback()

            }}
          style={styles.left2}
          activeOpacity={0.5}>
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  function refresh() {
    dispatch({type: 'REFRESH_INVENTORY', payload: [true]});
    setInterval(() => {
      dispatch({type: 'REFRESH_INVENTORY', payload: [false]});
    }, 1000);
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
      }}>
      <Swipeable
        renderLeftActions={getLeftContent}
        onSwipeableWillOpen={() => setborderRadius(0)}
        onSwipeableWillClose={() => setborderRadius(10)}>
        <Animated.View
          style={[
            styles.container,
            {
                
              borderColor: boxInterpolation,
              borderWidth: boxInterpolation2,
              borderBottomLeftRadius: borderRadiusCONST,
              borderTopLeftRadius: borderRadiusCONST,
            },
          ]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('InventoryItemList');
              dispatch({type: 'CURRENT_ID_INVENTORY', payload: 1});
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 5,
              }}>
              <View style={styles.textCollect}>
                <Text style={styles.nomeCollect}>
                  {ocurrence.nameOccurrence}
                </Text>
                <Text style={{fontWeight: commonStyles.fontWeight}}>
                  Data: {formatteddate(ocurrence.dateOccurence)}
                </Text>

                <Text style={{fontWeight: commonStyles.fontWeight}}>
                  Iniciado {moment(ocurrence.dateOccurence).fromNow()}
                </Text>
              </View>
              <View style={{padding: 8}}>
                <MaterialCommunityIcons name={'chevron-right'} size={35} />
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 5,
    borderLeftColor: commonStyles.color.InventoryPrincipal,
    backgroundColor: 'white',
  },
  textCollect: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  nomeCollect: {
    fontWeight: commonStyles.fontWeight,
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'space-between',
  },
  left1: {
    backgroundColor: '#194c9e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  left2: {
    backgroundColor: '#4287f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerSwipeable: {
    flexDirection: 'row',
  },
});
