import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


export function SelectItens({array, callback, placehoulder}) {
  const [openSelect, setOpenSelect] = useState(false);
  const [itemSelected, setItemSelected] = useState({
    id: 0,
    occurrence: `${placehoulder}`,
  });
  function handlewClickSelectTypeJourney() {
    setOpenSelect(!openSelect);
  }

  return (
    <View
      style={[
        styles.containerSelect,
        {
          height: hp('8.3%') * array.length,
        },
        !openSelect&&{
            height:hp('5.1%')
        }
      ]}>
      <TouchableOpacity
        style={styles.selectTypeJourney}
        onPress={handlewClickSelectTypeJourney}>
        <Text
          style={[
            {color: 'grey', fontSize: hp('1.8%'),},
            itemSelected.occurrence != placehoulder && {color: 'black'},
          ]}>
          {itemSelected.occurrence}
        </Text>
        {!openSelect && (
          <MaterialCommunityIcons name="chevron-down" size={hp('3.5%')} />
        )}
        {openSelect && <MaterialCommunityIcons name="chevron-up" size={hp('3.5%')} />}
      </TouchableOpacity>
      {openSelect && (
        <FlatList
          data={array}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.itenSelect2,
                itemSelected.id == item.id && {backgroundColor: '#f0f0f0'},
              ]}
              onPress={() => {
                handlewClickSelectTypeJourney(),
                  setItemSelected({
                    id: item.id,
                    occurrence: item.occurrence,
                  });
                callback({
                  id: item.id,
                  occurrence: item.occurrence,
                });
              }}>
              <Text style={{fontSize: hp('1.8%'),}}>{item.occurrence}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  selectTypeJourney: {
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  containerSelect: {
    minHeight:hp('5.1%'),
    maxHeight: hp('20.1%'),
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
});
