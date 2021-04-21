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
import StepModal from "./StepModal";
import getRealm from "../../services/realm";
import TextInputMask from 'react-native-text-input-mask';

export default function AddJourney() {
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
  let Component2 =  <Text> component 2</Text>;
  return (
    <>
    {
statusModal&&
        <View >
         <StepModal 
          statusModal={statusModal}
          callback={closeModal}
          stepComponents={[
            <View>

            
            <Text style={{marginLeft:15}}>Informe o Cep: </Text>
          <TextInputMask 
          
          style={styles.input}  
          placeholder="CEP"
          placeholderTextColor='grey'
          onChangeText={(text, notFormated) => setInventoryName(text)}
          value={InventoryName}
          mask={"[000000]-[000]"}
        />
        </View>, 
        
        Component2
        
        ]} />
      </View>
    }
</>
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
    borderBottomWidth: 2,
    borderColor: "grey",
    borderRadius: 6,
    backgroundColor: "#f1f2f4",
    color:'black'
  },
});
