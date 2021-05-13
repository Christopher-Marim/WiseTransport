import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import getRealm from '../../services/realm';
import commonStyles from '../../commonStyles';

import PickerCompany from '../../components/Modal/ModalEmpresas/ModalEmpresas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styles from './styles';
import commonsVariables from '../../../commonsVariables';

export default function Company(props) {
  const [UserName, setUserName] = useState();
  const [UserSystemUserId, setUserSystemUserId] = useState();
  const [UserId, setUserId] = useState();
  const [borderColor, setBorderColer] = useState(commonStyles.color.principal);
  const [PickerVisible, setPickerVisible] = useState(false);
  const [Empresa, setEmpresa] = useState('');
  const [EmpresaId, setEmpresaId] = useState('');
  const [EmpresaURL, setEmpresaUrl] = useState('');
  const [LeftPositionAnimation] = useState(new Animated.Value(-200));
  const [RightPositionAnimation] = useState(
    new Animated.Value(Dimensions.get('window').width),
  );

  const api = axios.create({
    baseURL: commonsVariables.api.baseUrl,
    headers: {
      Authorization: commonsVariables.api.Authorization,
    },
  });

  function callbackPicker(statusPicker, empresa, IdEmpresa, UrlEmpresa) {
    setPickerVisible(statusPicker);
    setEmpresa(empresa ? empresa : Empresa);
    setBorderColer('blue');

    setEmpresaId(IdEmpresa);
    setEmpresaUrl(UrlEmpresa);
  }

  async function changeEmpresa(IdEmpresa) {
    
    try {
      const userString = await AsyncStorage.getItem('@User')
      const store = JSON.parse(userString)

      const userAux={
        id:store.id,
        nome: store.nome,
        email: store.email,
        senha: store.senha,
        token: store.chave,
        logado: true,
        system_user_id: store.system_user_id,
        system_unit_id: parseInt(IdEmpresa, 10),
      }
    } catch(e) {
      console.error(e)
    }

    loadVeicules();
    loadOccurences();
  }

  async function loadVeicules() {
    const {data} = await api.get(`/veiculo?method=loadUnit&systemunitid=${EmpresaId}`);
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

    console.log('Veiculosss'+store);
  }
  async function loadOccurences() {
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
            comveiculo:parseInt(ocorrencia.comveiculo)==1?true:false,
            semveiculo:parseInt(ocorrencia.semveiculo)==1?true:false
          },
          'modified',
        );
      });
    });

    const store = realm.objects('Occurrence');

  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(LeftPositionAnimation, {
        toValue: -50,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(RightPositionAnimation, {
        toValue: Dimensions.get('window').width / 1.5,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    getUser();
  }, []);

  async function getUser() {
    try {
      const useraux = await AsyncStorage.getItem('@User')
      const store = JSON.parse(useraux)

      setUserId(store.id);
      setUserName(store.nome);
      setUserSystemUserId(store.system_user_id);
     
    } catch(e) {
      console.error(e)
    }
  }

  function ActionButtonProsseguir() {
    if (Empresa.length == 0) {
      Alert.alert(
        'Empresa não selecionada',
        'Seleciona sua empresa antes de prosseguir.',
      );
    } else {
      changeEmpresa(EmpresaId);
      SetEmpresaAsyncStorage();
      props.navigation.replace('NotificationScreen');
    }
  }

  async function SetEmpresaAsyncStorage() {
    try {
      await AsyncStorage.setItem('@Empresa', Empresa);
      console.log(EmpresaURL);
      await AsyncStorage.setItem('@API', `${EmpresaURL}`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <PickerCompany
        visible={PickerVisible}
        callback={callbackPicker}
        userId={UserSystemUserId}
      />
      <View style={styles.container1}>
        <Animated.View
          style={[
            styles.decorationTop,
            {transform: [{translateX: LeftPositionAnimation}]},
          ]}></Animated.View>

        <View style={styles.container1Texts}>
          <Text style={styles.textETM}>{UserName}</Text>
          <Text style={styles.subtextETM}>
            Informe a baixo a empresa ou departamento para dar prosseguimento
          </Text>
        </View>
        <Animated.View
          style={[
            styles.decorationBotton,
            {transform: [{translateX: RightPositionAnimation}]},
          ]}></Animated.View>
      </View>
      <View style={styles.container2}>
        <View style={{paddingHorizontal: 40, alignItems: 'center'}}>
          <Text style={styles.subtext}>Qual sua empresa?</Text>
          <TouchableOpacity
            style={[styles.picker, {borderColor: borderColor}]}
            onPress={() => {
              setPickerVisible(true);
            }}>
            <Text style={styles.textEmpresa}>{Empresa}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              ActionButtonProsseguir();
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginHorizontal: 30,
                justifyContent: 'center',
                fontWeight: 'bold',
              }}>
              Prosseguir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
