import React, { useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import commonStyles from "../../commonStyles";

import getRealm from "../../services/realm";

export default function AddList() {
  const [InventoryName, setInventoryName] = useState("");
  const statusModal = useSelector(
    (state) => state.showModal.showModalADDINVENTORY
  );

  const dispatch = useDispatch();

  async function addInventory() {
    if (!InventoryName || !InventoryName.trim()) {
      Alert.alert("Dados Inválidos", "Descrição não Informada!");
      return;
    } else {
      const realm = await getRealm();

      realm.write(() => {
        realm.create("Inventorys", {
          id: Math.random() * 1000,
          nome: InventoryName,
          dateAt: new Date(),
          itens: [],
        });
        setInventoryName();
        dispatch({ type: "REFRESH_INVENTORY", payload: [true] });
        setInterval(() => {
          dispatch({ type: "REFRESH_INVENTORY", payload: [false] });
        }, 1000);
        closeModal();
      });
    }
  }
  function closeModal() {
    dispatch({ type: "SHOW_MODAL_ADDINVENTORY_OFF" });
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
          <Text style={styles.headerModal}>Novo Inventario</Text>
          <View>
          <TextInput
            style={styles.input}
            placeholder="Informe a Descrição"
            placeholderTextColor='grey'
            onChangeText={(text) => setInventoryName(text)}
            value={InventoryName}
          />
          <View style={{position:"absolute",right:20,top:50 }}>
          </View>

          </View>


          <View style={styles.buttons}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addInventory}>
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
    backgroundColor: commonStyles.color.InventoryPrincipal,
    color: commonStyles.color.secondary,
    fontSize: 18,
    textAlign: "center",
    padding: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    fontWeight: commonStyles.fontWeight,
    margin: 20,
    marginRight: 30,
    color: commonStyles.color.today,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    paddingHorizontal: 5,
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
