import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonStyles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import moment from 'moment';

export default function ItemNoticia({
  titulo,
  subText,
  callback,
  data,
  check,
  api,
  id,
  attList,
}) {
  const [dataAux, setDataAux] = useState(data);
  const [horaAux, setHoraAux] = useState(data);

  const formatteddate = (data) =>
    moment(data).locale('pt-br').format('D/MM/YYYY');
  const formattedHours = (data) => moment(data).locale('pt-br').format('LT');

  useEffect(() => {
    setDataAux(formatteddate(data));
    setHoraAux(formattedHours(data));
  }, []);


  const getLeftContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <View style={styles.left1}>
          <MaterialCommunityIcons
            name="check-outline"
            size={30}
            color="white"
          />
        </View>
      </View>
    );
  };

  async function postCheckNoticia() {
    attList();
    await api.put(`/noticias/${id}?checked=Y`).then((result) => {
      console.log(result.data.data);
    });
    attList();
  }

  return (
    <Swipeable
    
      renderLeftActions={ check == false && getLeftContent}
      overshootRight={false}
      overshootLeft={false}
      onSwipeableLeftWillOpen={postCheckNoticia}>
      <TouchableOpacity
        onPress={() => {
          callback(true, titulo, subText, dataAux, horaAux,id);
        }}
        style={styles.Button}>
        <View style={styles.containerLogo}>
          <FontAwesome
            name={'newspaper-o'}
            size={30}
            color={commonStyles.color.contrastante}
          />
          <View style={styles.containerTexts}>
            <Text style={styles.titulo} numberOfLines={1}>
              {titulo}
            </Text>
            <Text style={styles.timeText}>
              {dataAux} {horaAux}
            </Text>
          </View>
        </View>
        <Text style={styles.subText} numberOfLines={1}>
          {subText}
        </Text>

        {check == true && (
          <MaterialCommunityIcons
            name={'check-outline'}
            size={30}
            color={commonStyles.color.contrastante}
            style={{position: 'absolute', right: 20, top: 10}}
          />
        )}
      </TouchableOpacity>
    </Swipeable>
  );
}
