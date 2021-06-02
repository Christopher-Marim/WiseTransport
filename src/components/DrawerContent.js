import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Linking, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer, List, Snackbar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import commonsVariables from '../../commonsVariables';
import commonStyles from '../commonStyles';
import getRealm from '../services/realm';
import Loader from './Loader';

export default props => {
  const [nome, setnome] = useState('Usuário');
  const [loaderVisiBle, setLoaderVisible] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [nomeEmpresa, setnomeEmpresa] = useState();
  const [email, setemail] = useState();
  const [UnitIdEmpresa, setUnitIdEmpresa] = useState();

  const api = axios.create({
    baseURL: commonsVariables.api.baseUrl,
    headers: {
      Authorization: commonsVariables.api.Authorization,
    },
  });

  function GetdataVeiculesAndOccurrences() {
    loadVeicules();
    loadOccurences();
  }

  async function loadVeicules() {
    try {
      const {data} = await api.get(
        `/veiculo?method=loadUnit&systemunitid=${UnitIdEmpresa}`,
      );
      const veicules = data.data;
      const realm = await getRealm();
      veicules.forEach(veiculo => {
        realm.write(() => {
          realm.create(
            'Veicules',
            {
              id: parseInt(veiculo.id),
              tipoVeiculo: veiculo.tipoveiculo,
              placa: veiculo.placa,
            },
            'modified',
          );
        });
      });
  
      const store = realm.objects('Veicules');
  
      console.log('Veiculosss' + store);

      setLoaderVisible(false)
      
    } catch (error) {
      setLoaderVisible(false)
      
    }
  }
  async function loadOccurences() {
    try {
      const {data} = await api.get('/ocorrencia');
      const ocorrencia = data.data;
      console.log(ocorrencia);
      const realm = await getRealm();
      ocorrencia.forEach(ocorrencia => {
        realm.write(() => {
          realm.create(
            'Occurrence',
            {
              id: parseInt(ocorrencia.id),
              occurrence: ocorrencia.ocorrencia,
              peso: parseInt(ocorrencia.peso),
              comveiculo: parseInt(ocorrencia.comveiculo) == 1 ? true : false,
              semveiculo: parseInt(ocorrencia.semveiculo) == 1 ? true : false,
              systemUnitId: parseInt(ocorrencia.system_unit_id),
            },
            'modified',
          );
        });
      });
  
      const store = realm.objects('Occurrence');
      Alert.alert('Finalizado','Dados atualizados com sucesso!')
      setLoaderVisible(false)
      
    } catch (error) {
      alert(error)
      setLoaderVisible(false)
      
    }
  }

  useEffect(() => {
    async function getUsuarioRealm() {
      try {
        const useraux = await AsyncStorage.getItem('@User');
        const store = JSON.parse(useraux);
        setnome(store.nome);
        setemail(store.email);
        setUnitIdEmpresa(store.system_unit_id);
      } catch (e) {
        console.error(e);
      }
      getNomeEmpresa();
    }
    getUsuarioRealm();
  }, []);
  async function Deslogar() {
    try {
      await AsyncStorage.setItem('@User', JSON.stringify({}));
      props.navigation.replace('Login');
    } catch (e) {
      console.error(e);
    }
  }

  const getNomeEmpresa = async () => {
    try {
      const EmpresaNome = await AsyncStorage.getItem('@Empresa');
      setnomeEmpresa(EmpresaNome);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Loader visible={loaderVisiBle}></Loader>
      
      <DrawerContentScrollView {...props} >
        <View style={styles.drawerContent}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Profile');
            }}>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  source={require('../../assets/icon.png')}
                  size={hp('6%')}
                />
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Title numberOfLines={1} style={styles.title}>
                    {nome}
                  </Title>
                  <Caption style={styles.email}>{email}</Caption>
                  <Caption style={styles.email}>{nomeEmpresa}</Caption>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <Drawer.Section style={styles.drawerSection}>
            <List.AccordionGroup>
              <List.Item
                left={() => (
                  <List.Icon
                    icon={({color, size}) => (
                      <MaterialCommunityIcons
                        name="newspaper-variant-outline"
                        color={color}
                        size={size}
                      />
                    )}
                  />
                )}
                title="Notificações"
                titleStyle={{fontSize: hp('1.8%')}}
                onPress={() => {
                  props.navigation.navigate('NotificationScreen');
                }}
              />
              <List.Item
                left={() => (
                  <List.Icon
                    icon={({color, size}) => (
                      <MaterialCommunityIcons
                        name="truck-outline"
                        color={color}
                        size={size}
                      />
                    )}
                  />
                )}
                title="Jornada"
                titleStyle={{fontSize: hp('1.8%')}}
                onPress={() => {
                  props.navigation.navigate('JourneyCurrent');
                }}
              />
              <List.Item
                left={() => (
                  <List.Icon
                    icon={({color, size}) => (
                      <MaterialCommunityIcons
                        name="format-list-text"
                        color={color}
                        size={size}
                      />
                    )}
                  />
                )}
                title="Lista de Jornadas"
                titleStyle={{fontSize: hp('1.8%')}}
                onPress={() => {
                  props.navigation.navigate('JourneyList');
                }}
              />

              {UnitIdEmpresa != 3 && (
                <View>
                 
                </View>
              )}

              <List.Accordion
                title="Configurações"
                titleStyle={{fontSize: hp('1.8%')}}
                id="4"
                left={() => (
                  <List.Icon
                    icon={({color, size}) => (
                      <FontAwesome name="cog" color={color} size={size} />
                    )}
                  />
                )}>
                <List.Item
                  title="Perfil"
                  titleStyle={{fontSize: hp('1.8%')}}
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}
                />
                <List.Item
                  title="API"
                  titleStyle={{fontSize: hp('1.8%')}}
                  onPress={() => {
                    props.navigation.navigate('Configs');
                  }}
                />
              </List.Accordion>
              <List.Item
                left={() => (
                  <List.Icon
                    icon={({color, size}) => (
                      <MaterialCommunityIcons
                        name="database-sync"
                        color={color}
                        size={size}
                      />
                    )}
                  />
                )}
                title="Sincronizar dados"
                titleStyle={{fontSize: hp('1.8%')}}
                onPress={() => {
                  setLoaderVisible(true)
                  GetdataVeiculesAndOccurrences();
                }}
              />
              <List.Item
                left={() => (
                  <List.Icon
                    icon={({color, size}) => (
                      <MaterialCommunityIcons
                        name="account-check-outline"
                        color={color}
                        size={size}
                      />
                    )}
                  />
                )}
                title="Suporte ETM"
                titleStyle={{fontSize: hp('1.8%')}}
                onPress={() => {
                  Linking.openURL('https://www.etm.srv.br');
                }}
              />
            </List.AccordionGroup>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sair"
          onPress={() => {
            Deslogar();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: -5,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: commonStyles.color.principal,
    paddingVertical: 20,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: hp('1.9%'),
    width: '100%',
    fontWeight: commonStyles.fontWeight,
    marginTop: 3,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: hp('1.8%'),
    fontWeight: commonStyles.fontWeight,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  email: {
    fontSize: hp('1.2%'),
    fontWeight: commonStyles.fontWeight,
    lineHeight: 14,
    color: 'white',
  },
});
