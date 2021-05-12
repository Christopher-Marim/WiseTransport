import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
     StyleSheet
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export function SelectItens({array, callback,placehoulder}) {
  const [openSelect, setOpenSelect] = useState(false);
  const [itemSelected, setItemSelected] = useState({
    id: 0,
    type: `${placehoulder}`,
  });
    function handlewClickSelectTypeJourney() {
        setOpenSelect(!openSelect);
      }

    return(
        <View style={styles.containerSelect}>
                      <TouchableOpacity
                        style={styles.selectTypeJourney}
                        onPress={handlewClickSelectTypeJourney}>
                        <Text style={[{color: 'grey'}, itemSelected.type!=placehoulder&&{color:'black'}]}>{itemSelected.type}</Text>
                        {!openSelect && (
                          <MaterialCommunityIcons
                            name="chevron-down"
                            size={30}
                          />
                        )}
                        {openSelect && (
                          <MaterialCommunityIcons name="chevron-up" size={30} />
                        )}
                      </TouchableOpacity>
                      {openSelect && (
                        <FlatList
                          data={array}
                          keyExtractor={item => {
                            item.id;
                          }}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              style={[styles.itenSelect2, (itemSelected.id==item.id)&&{backgroundColor:'#f0f0f0'}]}
                              onPress={() => {
                                handlewClickSelectTypeJourney(),
                                setItemSelected({
                                  id:item.id,
                                  type:item.type
                                })
                                callback({
                                    id:item.id,
                                    type:item.type
                                })
                              }}>
                              <Text>{item.type}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      )}
                    </View>
    )
}
const styles = StyleSheet.create({

    selectTypeJourney: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
      },
      containerSelect: {
        marginTop: 10,
        marginHorizontal: 18,
        borderWidth: 1,
        borderRadius: 5,
      },
      itenSelect2: {
        padding: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
      },
})