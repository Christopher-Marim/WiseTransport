import React, {useCallback} from 'react';
import {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import commonStyles from '../../commonStyles';

export function UpdateModal({callback, visible}) {
  function closeModal() {
    callback();
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
        }}>
          <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.headerModal}> Atualizar App!</Text>
          <Image
            style={{
              width: Dimensions.get('window').width/1.2,
              height: Dimensions.get('window').width/1.2,
              borderWidth: 2,
              borderColor: 'white',
            }}
            source={require('../../../assets/Image-updt.png')}
          />
          <TouchableOpacity 
          activeOpacity={0.7}
          onPress={()=>(Linking.openURL('https://play.google.com/store/apps/details?id=com.wisetransport'),callback())}
          style={styles.button}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.overlay} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '95%',
  },
  headerModal: {
    borderBottomWidth:2,
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    color: commonStyles.color.InventoryPrincipal,
    fontSize: 18,
    textAlign: 'center',
    padding: 18,
    paddingBottom:5,
    borderBottomColor:'#ededed',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    backgroundColor: commonStyles.color.InventoryPrincipal,
    padding: 10,
    paddingHorizontal:'25%',
    borderRadius: 10,
  },
  buttonText:{
    fontWeight: commonStyles.fontWeight,
    color:commonStyles.color.secondary,
    fontSize:18
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    paddingHorizontal: 5,
    height: 40,
    marginTop: 10,
    margin: 15,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: 'grey',
    borderRadius: 6,
    backgroundColor: '#f1f2f4',
  },
});
