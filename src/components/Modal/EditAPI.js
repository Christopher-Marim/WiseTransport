import React,{useEffect} from "react";
import { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector} from "react-redux";
import commonStyles from "../../commonStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditAPI(props) {
  const [ApiText, setApiText] = useState("");
  const statusModal = useSelector(
    (state) => state.showModal.showModalEDTAPI
  );

  const dispatch = useDispatch();

  function edtAPI() {
    if (!ApiText || !ApiText.trim()) {
      Alert.alert("Dados Invalidos", "Descrição não Informada!");
      return;
    } else {
      UpdateAPI();
      closeModal();
    }
  }
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
      console.error(e)
    }
  }

  async function UpdateAPI() {
    try {
      await AsyncStorage.setItem('@API', ApiText)
      props?.callback()
    } catch (e) {
      console.error(e)
    }

  }
  function closeModal() {
    dispatch({ type: "SHOW_MODAL_EDTAPI_OFF" });
    dispatch({ type: "REFRESH", payload: [true] });
    setInterval(() => {
      dispatch({ type: "REFRESH", payload: [false] });
    }, 1000);
  }

  return (
    <Modal
      transparent={true}
      visible={statusModal}
      onRequestClose={closeModal}
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.headerModal}> Editar API</Text>
          <Text style={styles.text}>Api</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a BaseURL"
            onChangeText={(text) => setApiText(text)}
            value={ApiText}
            autoCorrect={false}
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={edtAPI}>
              <Text style={styles.button}>Salvar</Text>
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

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    flex: 1,
  },
  container: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    width: "95%",
  },
  headerModal: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    backgroundColor: commonStyles.color.principal,
    color: commonStyles.color.secondary,
    fontSize: 18,
    textAlign: "center",
    padding: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text:{
    marginTop: 10,
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: 14,
    paddingLeft:20
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.color.today,
    fontWeight: commonStyles.fontWeight,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    paddingHorizontal: 5,
    fontWeight: commonStyles.fontWeight,
    height: 40,
    marginTop: 10,
    margin: 15,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderColor: "grey",
    borderRadius: 6,
    backgroundColor: "#f1f2f4",
  },
});
