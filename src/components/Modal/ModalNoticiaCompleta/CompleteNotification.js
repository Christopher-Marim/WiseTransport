import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default function CompleteNotification(props) {
  //Fechar Modal
  function closeModal() {
    props.callback(false);
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
        <View style={styles.container}>
          <View style={{position: 'absolute', right: 10, top: 5}}>
            
              <MaterialCommunityIcons
                name={'close-box'}
                size={30}
                color="grey"
                onPress={() => {
                  closeModal();
                }}
              />
            
          </View>
          <View>
            <Text style={styles.titulo}>{props.titulo}</Text>
            <Text style={styles.dateAndHours}>
              Data: {props.data} Hora: {props.hora}
            </Text>
          </View>
          <ScrollView style={styles.containerSubText}>
            <Text style={styles.subText} dataDetectorType={'all'}>
              {props.subText}
            </Text>
          </ScrollView>
          <View style={styles.containerButtons}>
            <TouchableOpacity style={styles.button} onPress={()=>{props.callbackCheck(props.id)}}>
              <Text style={styles.textButton}>Lido</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}
