import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/pt-br';
import axios from 'axios';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import commonsVariables from '../../../commonsVariables';
import {getParmsAPI} from '../../services/api';
import commonStyles from '../../commonStyles';
import Loader from '../../components/Loader';
import getRealm from '../../services/realm';
import styles from './styles';

export function JourneyList({navigation}) {
  const [LoaderVisiBle, setLoaderVisible] = useState(false);
  const [Journey, setJourney] = useState([]);
  const colorButton = commonStyles.color.headers;
  const [BaseURL, setBaseURL] = useState('');

  const api = axios.create({
    baseURL: `${BaseURL}`,
    headers: {
      Authorization: commonsVariables.api.Authorization,
    },
  });

  async function loadJourney() {
    const realm = await getRealm();

    const data = realm.objects('Journey').sorted('dateStart', true);
    setJourney(data);
  }

  useEffect(() => {
    loadJourney();
    getParmsAPI().then(res => {
      setBaseURL(res);
    });
  }, []);

  const route = useRoute();
  useFocusEffect(
    useCallback(() => {
      if (route.name === 'JourneyList') {
        loadJourney();
      }
    }, [route]),
  );

  async function PostJourney(Jornada) {
    setLoaderVisible(true);
    try {
      console.log(Jornada.operator_id);

      const {data} = await api.post('/jornada', {
        funcionario_id: Jornada.operator_id,
        carro_id: Jornada.veicule_id,
        datainiciojornada: `${moment(Jornada.dateStart).format('YYYY-MM-DD')} ${moment(Jornada.dateStart).format('LTS')} `,
        datafimjornada: `${moment(Jornada.dateFinish).format('YYYY-MM-DD')} ${moment(Jornada.dateFinish).format('LTS')} `,
        kminicial: Jornada.kmInicial,
        kmfinal: Jornada.kmFinal,
        kmrodado: parseInt(Jornada.kmFinal) - parseInt(Jornada.kmInicial),
        latitudeinicial: Jornada.latitudeInicial,
        latitudefinal: Jornada.latitudeFinal,
        longitudeinicial: Jornada.longitudeInicial,
        longitudefinal: Jornada.longitudeFinal,
        system_unit_id: Jornada.systemUnitId,
        system_user_id: Jornada.systemUserId,
      });

      const idJornada = data.data.id;
      console.log(data);
      PostOccurrences(idJornada, Jornada);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao finalizar a jornada, quando tiver conexão a internet procure reenviar essa jornada na lista de jornadas.',
      );
      loadJourney();
      setLoaderVisible(false);
    }
  }

  const forEachCustom = async (idJornada, element, jornada) => {
    console.log('Jornada Unit Id' + jornada.systemUnitId);
    console.log('Jornada FOREach' + jornada);
    try {
      const response = await api.post('/jornadaocorrencia', {
        jornada_id: idJornada,
        ocorrencia_id: element.occurrence_id,
        system_unit_id: jornada.systemUnitId,
        system_user_id: jornada.systemUserId,
        datahorainicio: moment(element.dataInicio).format(
          'YYYY-MM-DD hh:mm:ss',
        ),
        datahorafim: moment(element.dataFim).format('YYYY-MM-DD hh:mm:ss'),
        latitude: element.latitade,
        longitude: element.longitude,
      });
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao enviar a jornada');
    }
  };
  async function PostOccurrences(idJornada, Journey) {
    for (let i = 0; i < Journey.occurrences.length; i++) {
      const element = Journey.occurrences[i];
      await forEachCustom(idJornada, element, Journey);
    }
    const realm = await getRealm();
    realm.write(() => {
      realm.create(
        'Journey',
        {
          id: Journey.id,
          check: true,
        },
        'modified',
      );
    });
    loadJourney();
    setLoaderVisible(false);
  }

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
              size={hp('3%')}
              color={colorButton}></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text style={styles.Text}>Lista de Jornadas</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={Journey}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{flex: 1, paddingHorizontal: 20}}>
              <View
                style={{
                  padding: hp('1%'),
                  marginVertical: 5,
                  borderRadius: 5,
                  borderWidth: 2,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: hp('0.6%'),
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.TextOccurrence}>{item.veicule_name}</Text>
                  {!item.dateFinish && (
                    <MaterialCommunityIcons
                      name={'timer-outline'}
                      size={hp('4.2%')}
                      color="grey"
                      style={{paddingRight: 2}}
                      onPress={() => {
                        Alert.alert(
                          'Jornada em andamento',
                          'Jornada ainda não finalizada',
                        );
                      }}
                    />
                  )}
                  {item.dateFinish && item.check == null && (
                    <MaterialCommunityIcons
                      name={'alert-circle-outline'}
                      size={hp('4.2%')}
                      style={{paddingRight: 2}}
                      color="#b50000"
                      onPress={() => {
                        Alert.alert(
                          'Erro ao Finalizar',
                          'Tente novamente finalizar a jornada arrastando esse componente para a direita',
                        );
                      }}
                    />
                  )}
                  {item.dateFinish && item.check == true && (
                    <MaterialCommunityIcons
                      name={'checkbox-marked-circle-outline'}
                      size={hp('4.2%')}
                      style={{paddingRight: 2}}
                      color="green"
                    />
                  )}
                </View>
                <View style={{justifyContent: 'center'}}>
                  {item.dateFinish && item.check == null && (
                    <TouchableOpacity
                      style={styles.buttonPost}
                      onPress={() => {
                        PostJourney(item);
                      }}>
                      <Text style={{color: '#b50000', fontWeight: 'bold'}}>
                        Enviar
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: hp('1.8%')}}>Inicio: {formatteddate(item.dateStart)}</Text>
                    <Text style={{fontSize: hp('1.8%')}}> {formattedHours(item.dateStart)}</Text>
                  </View>
                  {item.dateFinish && (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: hp('1.8%')}}>Fim: {formatteddate(item.dateFinish)}</Text>
                      <Text style={{fontSize: hp('1.8%')}}>
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
