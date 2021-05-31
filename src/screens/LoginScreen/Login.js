import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
  Platform,
  Keyboard,
  Linking,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import VersionCheck from 'react-native-version-check';
import Loader from '../../components/Loader';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {api} from '../../services/api';

import axios from 'axios';
import {UpdateModal} from '../../components/Modal/UpdateModal';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [internet, setInternet] = useState();

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [LoaderVisible, setVisible] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [PasswordVisible, setPasswordVisible] = useState(true);

  const [imageHeight] = useState(new Animated.Value(1));

  const api = axios.create({
    baseURL: 'http://transportadora.etm.ltda',
    headers: {
      Authorization:
        'Basic ac0fb7c1dedf6eb4cb16e4dab5fac37a63bf447f74a8c47366f9e7f5d72d',
    },
  });

  const keyboardWillHide = event => {
    Animated.timing(imageHeight, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const keyboardWillShow = event => {
    Animated.timing(imageHeight, {
      duration: 300,
      toValue: 0.6,
      useNativeDriver: true,
    }).start();
  };

  const dispatch = useDispatch();
  //ao iniciar a aplicação fará a validação se a chave registrada no storage é igual a do banco de dados, caso seja entrará na
  //aplicação, caso não solicitará que faça o login
  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    //consulta no storage
    getUsuario();
    connectivity();
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    Keyboard.addListener('keyboardDidHide', keyboardWillHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardWillShow);
      Keyboard.removeListener('keyboardDidHide', keyboardWillHide);
    };
  }, []);

  async function connectivity() {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        console.log('State Conexao:' + state.isConnected);

        if (state.isConnected.valueOf() == true) {
          return setInternet(true);
        } else {
          Alert.alert('Desconectado', 'Você está desconectado a internet');
          return setInternet(false);
        }
      });
    } else {
    }
  }

  function acessar() {
    getUsuario();
  }
  async function clearStore() {
    try {
      await AsyncStorage.setItem('@User', JSON.stringify({}));
    } catch (e) {
      console.error(e);
    }
  }
  async function getUsuario() {
    console.log('LoginScreen Internet: ' + internet);
    try {
      if (internet == true) {
        const response = await api.get('/acessoappcoleta');

        const data = response.data.data;

        try {
          const user = await AsyncStorage.getItem('@User');
          const store = JSON.parse(user);
          console.log('1 Store' + store);

          if (store != undefined) {
            //Logado
            if (store.logado == true) {
              setVisible(true);
              const index = data.findIndex(
                x =>
                  x.login == store.email &&
                  x.senha == store.senha &&
                  x.chave == store.token,
              );
              console.log('FILTER 1 : ' + data[index]);

              if (data[index]) {
                navigation.replace('NotificationScreen');
                setVisible(false);
              } else {
                clearStore();
              }
            } //Deslogado
            else {
              try {
                const index = data.findIndex(
                  x => x.login == email && x.senha == senha,
                );
                console.log('FILTER 2 : ' + data[index]);

                clearStore();
                setUser(data[index]);
                setVisible(false);
              } catch (error) {
                setVisible(false);
                Alert.alert(
                  'Email e Senha incorretos',
                  'Verifique o email e senha digitados',
                );
              }
            }
          } //Sem Storage
          else {
            try {
              const index = data.findIndex(
                x => x.login == email && x.senha == senha,
              );
              console.log('FILTER INTERNET DESLOGADO : ' + data[index].email);

              setUser(data[index]);
            } catch (error) {
              setVisible(false);
              Alert.alert(
                'Email e Senha incorretos',
                'Verifique o email e senha digitados',
              );
            }
          }
        } catch (e) {
          alert(e);
          console.error(e);
        }
      } else {
        try {
          const userAux = await AsyncStorage.getItem('@User');
          const store = JSON.parse(userAux);
          if (store?.logado == true) {
            navigation.replace('JourneyCurrent');
          }
        } catch (e) {
          alert(e);

          console.error(e);
        }
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async function setUser(usuario) {
    console.log('USUARIO' + usuario.nome);
    if (usuario.length != 0) {
      {
        /*const realm = await getRealm();

      realm.write(() => {
        realm.create('User', {
          id: parseInt(usuario.id),
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          token: usuario.chave,
          logado: true,
          system_user_id: parseInt(usuario.system_user_id, 10),
          system_unit_id: parseInt(usuario.system_unit_id, 10),
        });
      });
    */
      }
      try {
        const user = {
          id: parseInt(usuario.id),
          nome: usuario.nome,
          email: usuario.login,
          senha: usuario.senha,
          token: usuario.chave,
          logado: true,
          system_user_id: parseInt(usuario.system_user_id, 10),
          system_unit_id: parseInt(usuario.system_unit_id, 10),
        };
        await AsyncStorage.setItem('@User', JSON.stringify(user));
      } catch (e) {
        alert('error 3' + e);
        console.error(e);
      }

      dispatch({
        type: 'USER_LOGGED_IN',
        payload: [usuario.nome, usuario.login, usuario.senha, usuario.chave],
      });
      setEmail('');
      setSenha('');
    }
    setVisible(false);
    navigation.replace('Company');
  }

  VersionCheck.getLatestVersion({
    provider: 'playStore', // for Android
  }).then(latestVersion => {
    if (latestVersion > DeviceInfo.getVersion()) {
      setModalVisible(true);
    }
  });

  const callbackUpdateModal = () => setModalVisible(false);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <UpdateModal visible={ModalVisible} callback={callbackUpdateModal} />
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: wp('50%'),
            transform: [{scale: imageHeight}],
            height: hp('25%'),
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'white',
          }}
          source={require('../../../assets/icon.png')}
        />
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{translateY: offset.y}],
          },
        ]}>
        <TextInput
          style={[
            styles.input,
            {
              fontSize: hp('2.0%'),
              width: wp('80%'),
              height: hp('5.2%'),
            },
          ]}
          placeholder="Login"
          placeholderTextColor="grey"
          value={email}
          autoCorrect={false}
          onChangeText={text => setEmail(text)}
          keyboardType={'email-address'}
        />
        <View style={styles.textInputSenha}>
          <TextInput
            style={[
              styles.input,
              {
                fontSize: hp('2.0%'),
                width: wp('80%'),
                height: hp('5.2%'),
              },
            ]}
            placeholder="Senha"
            placeholderTextColor="grey"
            autoCorrect={false}
            value={senha}
            onChangeText={text => setSenha(text)}
            secureTextEntry={PasswordVisible}
          />
          <TouchableOpacity
            style={[styles.buttonEye,{top:hp('1.2%')}]}
            onPress={() => {
              setPasswordVisible(!PasswordVisible);
            }}>
            {!PasswordVisible && (
              <MaterialCommunityIcons name="eye-outline" size={hp('3%')} />
            )}
            {PasswordVisible && (
              <MaterialCommunityIcons name="eye-off-outline" size={hp('3%')} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.btnSubmit, {width: wp('80%'), height: hp('5.2%')}]}
          onPress={() => {
            acessar(), setVisible(true);
          }}>
          <Text style={[styles.submitText, {fontSize: hp('2.2%')}]}>
            Acessar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSolicit}
          onPress={() => {
            Linking.openURL('https://www.etm.srv.br');
          }}>
          <Text style={[styles.solicitText, {fontSize: hp('1.6%')}]}>Precisa de ajuda?</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
