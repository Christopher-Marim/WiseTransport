import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

export default function CompanyButton(props) {
  return (
    <ScrollView style={{borderRadius: 10}}>
      <TouchableOpacity
        style={{
          height: 50,
          paddingLeft: 10,
          justifyContent: 'center',
          backgroundColor: '#001e42',
          borderBottomWidth: 0.4,
          borderColor: 'white',
        }}
        onPress={() => {
          props.callback(props.empresa, props.url, props.IdEmpresa);
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>{props.empresa}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
