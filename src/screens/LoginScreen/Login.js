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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import getRealm from '../../services/realm';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';

import {api} from '../../services/api';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [internet, setInternet] = useState();

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [LoaderVisible, setVisible] = useState(false);

  const [imageHeight] = useState(new Animated.Value(1))
  const [activated, setActivated] = useState(false)

  const keyboardWillHide = (event) => {
      Animated.timing(imageHeight, {
        duration: 500,
        toValue:1,
        useNativeDriver: true

      }).start();
    };
   const keyboardWillShow = (event) => {
      Animated.timing(imageHeight, {
        duration: 300,
        toValue: 0.6,
        useNativeDriver: true
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

  useEffect(()=>{
    
    Keyboard.addListener('keyboardDidShow', keyboardWillShow)
    Keyboard.addListener('keyboardDidHide', keyboardWillHide)
    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardWillShow);
      Keyboard.removeListener("keyboardDidHide", keyboardWillHide);
    };
  },[])

  async function connectivity() {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then((state) => {
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
    const realm = await getRealm();
    const store = realm.objects('User');

    let object = realm.objectForPrimaryKey('User', store[0].id);
    console.log(object);
    realm.write(() => {
      realm.delete(object);
    });
  }
  async function getUsuario() {
    console.log('LoginScreen Internet: ' + internet);
    try {
      if (internet == true) {
        const response = await api.get('/Acessoappcoleta');
        const data = response.data.data;

        const realm = await getRealm();
        const store = realm.objects('User');
        console.log('1 Store' + store[0]);

        if (store[0] != undefined) {
          //Logado
          if (store[0].logado == true) {
            setVisible(true);
            const index = data.findIndex(
              (x) =>
                x.email == store[0].email &&
                x.senha == store[0].senha &&
                x.chave == store[0].token,
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
                (x) => x.email == email && x.senha == senha,
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
              (x) => x.email == email && x.senha == senha,
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
      } else {
        const realm = await getRealm();
        const store = realm.objects('User');
        if (store[0].logado == true) {
          navigation.replace('InventoryList');
        } else {
          Alert.alert(
            'Sem Internet',
            'Por favor conecte-se a internet para fazer o login de um novo usuário',
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setUser(usuario) {
    console.log('USUARIO' + usuario.nomeusuario);
    if (usuario.length != 0) {
      const realm = await getRealm();

      realm.write(() => {
        realm.create('User', {
          id: parseInt(usuario.id),
          nome: usuario.nomeusuario,
          email: usuario.email,
          senha: usuario.senha,
          token: usuario.chave,
          logado: true,
          system_user_id: parseInt(usuario.system_user_id, 10),
          system_unit_id: parseInt(usuario.system_unit_id, 10),
        });
      });
      dispatch({
        type: 'USER_LOGGED_IN',
        payload: [
          usuario.nomeusuario,
          usuario.email,
          usuario.senha,
          usuario.chave,
        ],
      });
      setEmail('');
      setSenha('');
    }
    setVisible(false);
    navigation.replace('Company');
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <Loader visible={LoaderVisible} />
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width:200,
            transform: [{ scale: imageHeight  }],
            height: 200,
            borderRadius: 10,
            borderWidth:2,
            borderColor:'white'
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
          style={styles.input}
          placeholder="Email"
          placeholderTextColor='grey'
          value={email}
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
          keyboardType={'email-address'}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor='grey'
          autoCorrect={false}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => {
            acessar(), setVisible(true);
          }}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSolicit} 
                onPress={() => {Linking.openURL('https://www.etm.srv.br');}}>
          <Text style={styles.solicitText}>Precisa de ajuda?</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
