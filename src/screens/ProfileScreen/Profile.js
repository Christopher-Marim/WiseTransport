import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import NetInfo from '@react-native-community/netinfo';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import getRealm from '../../services/realm';
import {api} from '../../services/api';
import styles from './styles';

export default function Profile(props) {
  async function getUsuarioRealm() {
    try {
      const useraux = await AsyncStorage.getItem('@User');
      const store = JSON.parse(useraux);
      setNome(store.nome);
      setEmail(store.email);
      setSenha(store.senha);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getUsuarioRealm();
    CheckConnectivity();
    getEmpresa();
  }, []);

  const [nome, setNome] = useState('Usuario');
  const [senha, setSenha] = useState();
  const [email, setEmail] = useState();
  const [empresa, setEmpresa] = useState();
  const [internet, setInternet] = useState();
  const [ButonSalvar, setButtonSalvar] = useState(false);

  const refNome = useRef(null);
  const refSenha = useRef(null);
  const refEmail = useRef(null);

  async function EditarUsuario() {
    try {
      try {
        const useraux = await AsyncStorage.getItem('@User');
        const store = JSON.parse(useraux);

        const edtUser = {
          id: store.id,
          nome: nome,
          email: email,
          senha: senha,
          token: store.chave,
          logado: store.logado,
          system_user_id: store.system_user_id,
          system_unit_id: store.system_unit_id,
        };
        const result = await AsyncStorage.setItem(
          '@User',
          JSON.stringify(edtUser),
        );

        const res = await api.put(`/Acessoappcoleta/${store.id}`, {
          nome: nome,
          login: email,
          senha: senha,
        });
        console.log(res.status);
      } catch (e) {
        console.error(e);
      }

      setButtonSalvar(false);
      Alert.alert(
        'Alteração Feita',
        'Recomenda-se fechar e abrir a aplicação para as mudanças serem efetivadas.',
      );
      getUsuarioRealm();
    } catch (error) {
      console.log(error);
    }
  }

  async function getEmpresa() {
    try {
      const EmpresaNome = await AsyncStorage.getItem('@Empresa');
      setEmpresa(EmpresaNome);
    } catch (e) {
      console.error(e);
    }
  }

  function CheckConnectivity() {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          setInternet(true);
        } else {
          setInternet(false);
        }
      });
    } else {
      // For iOS devices
      NetInfo.addEventListener(
        'connectionChange',
        handleFirstConnectivityChange(),
      );
    }
  }

  const handleFirstConnectivityChange = isConnected => {
    NetInfo.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange(),
    );

    if (isConnected === false) {
      setInternet(false);
    } else {
      setInternet(true);
    }
  };

  const getFocusInputNome = () => {
    refNome.current.focus();
  };
  const getFocusInputSenha = () => {
    refSenha.current.focus();
  };
  const getFocusInputEmail = () => {
    refEmail.current.focus();
  };
  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonGoBack}
          onPress={() => props.navigation.goBack()}>
          <View>
            <FontAwesome
              name="chevron-left"
              size={hp('3%')}
              style={{fontWeight: 'bold'}}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.avatar}
        source={require('../../../assets/icon.png')}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{nome}</Text>
          <Text>{email}</Text>
        </View>
        <View style={styles.containerInfos}>
          <View>
            <Text style={styles.textInfo}>Informações da conta</Text>
          </View>
          <View style={styles.containerButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                getFocusInputNome();
              }}>
              <EvilIcons name={'user'} size={ hp('7%')} />
              <View style={styles.texts}>
                <Text style={styles.subText}>Nome</Text>
                <TextInput
                  style={{height: hp('4.8%'), color: '#696969',fontSize: hp('1.65%'),}}
                  placeholder={nome}
                  ref={refNome}
                  value={nome}
                  onChangeText={text => {
                    setNome(text);
                  }}
                  onSubmitEditing={() => {
                    setButtonSalvar(true);
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.button, paddingLeft: hp('1%')}}
              onPress={() => {
                getFocusInputSenha();
              }}>
              <MaterialCommunityIcons
                name={'form-textbox-password'}
                size={hp('5.3%')}
              />
              <View style={{...styles.texts, paddingLeft: hp('1.6%')}}>
                <Text style={styles.subText}>Senha</Text>
                <TextInput
                  style={{height: hp('4.8%'), color: '#696969',fontSize: hp('1.65%'),}}
                  secureTextEntry={true}
                  ref={refSenha}
                  value={senha}
                  onChangeText={text => {
                    setSenha(text);
                  }}
                  onSubmitEditing={() => {
                    setButtonSalvar(true);
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.button, paddingLeft: hp('1%')}}
              onPress={() => {
                getFocusInputEmail();
              }}>
              <MaterialCommunityIcons name={'email-outline'} size={hp('5.3%')} />
              <View style={{...styles.texts, paddingLeft: 13}}>
                <Text style={styles.subText}>Email</Text>
                <TextInput
                  style={{height: hp('4.8%'), color: '#696969',fontSize: hp('1.65%'),}}
                  placeholder={email}
                  keyboardType={'email-address'}
                  ref={refEmail}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                  onSubmitEditing={() => {
                    setButtonSalvar(true);
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.button, paddingLeft: hp('1%')}}
              onPress={() => {
                props.navigation.navigate('Company');
              }}>
              <MaterialCommunityIcons name={'office-building'} size={hp('5.3%')} />
              <View style={{...styles.texts, paddingLeft: 13}}>
                <Text style={styles.subText}>Empresa</Text>
                <Text
                  style={{
                    height: hp('4.8%'),
                    color: '#696969',
                    fontSize: hp('1.65%'),
                    marginTop: hp('1%'),
                    marginHorizontal: 5,
                  }}>
                  {empresa}
                </Text>
              </View>
            </TouchableOpacity>
            {ButonSalvar == true && (
              <TouchableOpacity
                style={styles.buttonSalvar}
                onPress={() => {
                  if (internet == true) {
                    EditarUsuario();
                  } else {
                    Alert.alert(
                      'Sem Internet',
                      'Mudanças no usuário só podem ser realizadas com conexão a internet',
                    );
                  }
                }}>
                <Text style={styles.textSalvar}>Salvar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
