import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
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

import commonStyles from '../../commonStyles';
import getRealm from '../../services/realm';
import styles from './styles';
import Loader from '../../components/Loader';
import {FlatList} from 'react-native-gesture-handler';

export function JourneyList({navigation}) {
  const [LoaderVisiBle, setLoaderVisible] = useState(false);

  const [Journey, setJourney] = useState([]);
  const colorButton = commonStyles.color.headers;
  const [BaseURL, setBaseURL] = useState('');

  const dispatch = useDispatch();

  async function loadJourney() {
    const realm = await getRealm();

    const data = realm.objects('Journey').sorted('dateStart', true);
    setJourney(data);
  }

  useEffect(() => {
    loadJourney();
  }, []);

  const formatteddate = data =>
    moment(data).locale('pt-br').format('DD/MM/YYYY');

  const formattedHours = horas => moment(horas).locale('pt-br').format('LT');

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.Text}>Lista de Jornadas</Text>

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
      <View>
        <FlatList
          data={Journey}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{flex: 1, paddingHorizontal: 20}}>
              <View
                style={{
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  borderWidth: 2,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 5,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.TextOccurrence}>{item.veicule_name}</Text>
                  {!item.dateFinish && (
                    <MaterialCommunityIcons
                      name={'timer-outline'}
                      size={35}
                      color="grey"
                      onPress={()=>{Alert.alert('Jornada em andamento','Jornada ainda não finalizada')}}
                    />
                  )}
                  {item.dateFinish&&(item.check==null) && (
                    <MaterialCommunityIcons
                      name={'alert-circle-outline'}
                      size={35}
                      color="#b50000"
                      onPress={()=>{Alert.alert('Erro ao Finalizar','Tente novamente finalizar a jornada arrastando esse componente para a direta')}}
                    />
                  )}
                  {(item.dateFinish&&(item.check==true)) && (
                    <MaterialCommunityIcons
                      name={'checkbox-marked-circle-outline'}
                      size={35}
                      color="green"
                    />
                  )}
                </View>
                <View style={{justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Inicio: {formatteddate(item.dateStart)}</Text>
                    <Text> {formattedHours(item.dateStart)}</Text>
                  </View>
                  {item.dateFinish && (
                    <View style={{flexDirection: 'row'}}>
                      <Text>Fim: {formatteddate(item.dateFinish)}</Text>
                      <Text>
                        {'    '}
                        {formattedHours(item.dateFinish)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
