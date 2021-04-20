import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
} from "react-native";

import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch} from 'react-redux'
import EditAPI from '../../components/Modal/EditAPI'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MySettings({navigation}) {
  const dispatch = useDispatch()

  const [ApiText, setApiText] = useState("");


  useEffect(()=>{
    getData()
  },[])
  const getData = async () => {
    try {
      const apiText = await AsyncStorage.getItem('@API')
     
      if(apiText !== null) {
        setApiText(apiText)
      }
    } catch(e) {
      // error reading value
    }
  }

  return (
    <SafeAreaView style={styles.container}>
  <EditAPI></EditAPI>
    <View style={styles.headerView}>
        
        <TouchableOpacity style={styles.buttonGoBack} onPress={() => navigation.goBack()}>
          <View>
            <MaterialCommunityIcons name="chevron-left" size={40} color="white"></MaterialCommunityIcons>
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Configurações</Text>
      
    </View>
    <View style={styles.container}>
    
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.action}
          onPress={() => {
    dispatch({ type: "SHOW_MODAL_EDTAPI_ON" });

          }}
          >
            <View style={{flexDirection:'row', alignItems:'center'}}>

            <MaterialCommunityIcons  name="api" size={40}></MaterialCommunityIcons>
            <Text style={styles.actionText}>{ApiText?ApiText:"Api ainda não definida"}</Text>
            </View>

          </TouchableOpacity>
    
          

        </View>
        
    </View>
    <Text style={{...styles.actionText, paddingBottom:10, fontSize:12}}>Version 1.0.0 By ETM Conultoria e Sistemas</Text>

  </SafeAreaView>

  );
}

