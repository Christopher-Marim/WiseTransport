import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default function Loader(props) {
  return (
    <AnimatedLoader
      visible={props.visible}
      overlayColor="rgba(65, 81, 105,0.9)"
      source={require('../../assets/35070-car-loading.json')}
      animationStyle={styles.lottie}
      speed={1}>
      <Text style={{fontSize: 20, fontWeight : 'bold', color:'white'}}>Carregando...</Text>
    </AnimatedLoader>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: Dimensions.get('window').width/1.7,
    height:Dimensions.get('window').width/1.7
  },
});
