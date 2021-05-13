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
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import 'moment/locale/pt-br';
import {useDispatch} from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import getRealm from '../services/realm';

export function CurrentOccurrence({callback, loaderVisible}) {
  const [borderRadiusCONST, setborderRadius] = useState(10);
  const [Journey, setJourney] = useState();
  const [ocurrence, setOccurrence] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [Heartbeat] = useState(new Animated.Value(0));

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const occurrenceAux = await AsyncStorage.getItem('@CurrentOccurrence');
console.log('OCORRENCIA'+ occurrenceAux)
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
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(Heartbeat, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }

  const boxInterpolation = Heartbeat.interpolate({
    inputRange: [0, 1],
    outputRange: [commonStyles.color.contrastante, '#00e1ff'],
  });

  const formatteddate = data =>
    moment(data).locale('pt-br').format('DD/MM/YYYY');

  async function getLocation() {
    loaderVisible(true);
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

          setChangesStorage();
        }
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  }

  async function setChangesStorage() {
    const realm = await getRealm();
    const data = realm.objects('Journey').filter(x => {
      if (!x.dateFinish) {
        setJourney(x);
        const journey = realm.objectForPrimaryKey('Journey', x.id);

        realm.write(() => {
          journey.occurrences.unshift({
            id: Math.random() * 1000,
            occurrence_id: ocurrence.idOccurrence,
            occurrence: ocurrence.nameOccurrence,
            dataInicio: ocurrence.dateOccurence,
            dataFim: new Date(),
            peso: ocurrence.pesoOccurrence,
            latitude: String(latitude),
            longitude: String(longitude),
          });
        });

        const journey2 = realm.objectForPrimaryKey('Journey', x.id);

        console.log('Push occurence'+ journey2.occurrences)

      }
    });
    


    loaderVisible(false);
    cleanCurrentoccurence();
  }

  async function cleanCurrentoccurence() {
    const result = await AsyncStorage.setItem(
      '@CurrentOccurrence',
      JSON.stringify({}),
    );
    callback();
  }

  const getLeftContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <TouchableOpacity
          style={styles.left1}
          activeOpacity={0.5}
          onPress={getLocation}>
          <MaterialCommunityIcons name="check-bold" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={cleanCurrentoccurence}
          style={styles.left2}
          activeOpacity={0.5}>
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

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
              borderBottomLeftRadius: borderRadiusCONST,
              borderTopLeftRadius: borderRadiusCONST,
            },
          ]}>
          <View style={styles.button}>
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
                <TouchableOpacity
                  style={styles.buttonChevron}
                  onPress={() => {}}>
                  <MaterialCommunityIcons name={'chevron-right'} size={35} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    borderWidth: 2,
    width: '100%',
    borderRadius: 10,
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
  buttonChevron: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
