import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';

import Companys from '../../Companys';
import {api} from '../../../services/api'
import styles from './styles';
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function PickerCompany(props) {
  const [loadingActive, setloadingActive] = useState(true);
  const [Empresas, setEmpresas] = useState()
 
  //Fechar Modal
  function closeModal() {
    props.callback(false);
  }

  function callbackItem(nomeEmpresa, UrlEmpresa, IdEmpresa ) {
    props.callback(false, nomeEmpresa, IdEmpresa, UrlEmpresa );
  }

  useEffect(()=>{
    getEmpresas()
  },[props.visible])

  async function getEmpresas() {
    console.log("USER ID: "+props.userId)

    const result = await api.get(`/EmpresaUser?method=load&system_user_id=${props.userId}`)
    setEmpresas(result.data.data)
    setloadingActive(false)
  }

  

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={closeModal}
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.container]}>
        {loadingActive&&(
          <ActivityIndicator animating={true} color={'white'} />
        )
          
        }{!loadingActive&&(
          <FlatList
            data={Empresas}
            keyExtractor={(item) => `${item.system_unit_id}`}
            renderItem={({item}) => <Companys empresa={item.nomeempresa} IdEmpresa={item.system_unit_id} url={item.connection_name} callback={callbackItem}/>}
          />
        )
        }
          
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}
