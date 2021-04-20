import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, List } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';
import getRealm from '../services/realm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'


export default (props) => {
  useEffect(() => {
    async function getUsuarioRealm() {
      const realm = await getRealm();
      const store = realm.objects('User');
      setnome(store[0].nome);
      setemail(store[0].email);
      setUnitIdEmpresa(store[0].system_unit_id)
      getNomeEmpresa()

    }
    getUsuarioRealm();
  }, []);

  const [nome, setnome] = useState('Usuário');
  const [nomeEmpresa, setnomeEmpresa] = useState();
  const [email, setemail] = useState();
  const [UnitIdEmpresa, setUnitIdEmpresa] = useState();

  const dispatch = useDispatch()

  async function Deslogar() {
    const realm = await getRealm();
    const store = realm.objects('User');

    realm.write(() => {
      realm.delete(store[0]);
    });
    props.navigation.replace('Login');
  }

  const getNomeEmpresa = async () => {
    try {
      const EmpresaNome = await AsyncStorage.getItem('@Empresa')
      setnomeEmpresa(EmpresaNome)

    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity onPress={() => { props.navigation.navigate('Profile'); }}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row' }}>
                <Avatar.Image
                  source={require('../../assets/icon.png')}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                  <Title style={styles.title}>{nome}</Title>
                  <Caption style={styles.email}>{email}</Caption>
                  <Caption style={styles.email}>{nomeEmpresa}</Caption>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <Drawer.Section style={styles.drawerSection}>
            <List.AccordionGroup>
              <List.Item
                left={() => (
                  <List.Icon
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="newspaper-variant-outline"
                        color={color}
                        size={size}
                      />
                    )}
                  />
                )}
                title="Notificações"
                titleStyle={{ fontSize: 15 }}
                onPress={() => {
                  props.navigation.navigate('NotificationScreen');

                }}
              />
              <List.Accordion
                title="Inventário"
                id="1"
                left={() => (
                  <List.Icon
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="download-box-outline"
                        color={color}
                        size={size}
                      />
                    )}
                  />
                )}>
                <List.Item
                  title="Coleta Avulsa"
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => {
                    props.navigation.navigate('InventoryList');
                  }}
                />
              {/*  <List.Item
                  title="Auditoria"
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => {

                  }}
                />
                <List.Item
                  title="QR Code"
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => {

                  }}
                /> */}
              </List.Accordion>
              {UnitIdEmpresa != 3 && (
                <View>
                  {/*
                  <List.Accordion
                    title="Pessoal"
                    titleStyle={{ fontSize: 15 }}
                    id="2"
                    left={() => (
                      <List.Icon
                        icon={({ color, size }) => (
                          <MaterialCommunityIcons
                            name="account-details-outline"
                            color={color}
                            size={size}
                          />
                        )}
                      />
                    )}>
                    <List.Item
                      title="Agenda"
                      titleStyle={{ fontSize: 14 }}
                      onPress={() => { }}
                    />
                    <List.Item
                      title="Solicitação de HE"
                      titleStyle={{ fontSize: 14 }}
                      onPress={() => { }}
                    />
                  </List.Accordion>

                  <List.Accordion
                    title="Logistica"
                    titleStyle={{ fontSize: 15 }}
                    id="3"
                    left={() => (
                      <List.Icon
                        icon={({ color, size }) => (
                          <MaterialCommunityIcons
                            name="hard-hat"
                            color={color}
                            size={size}
                          />
                        )}
                      />
                    )}>
                    <List.Item
                      title="Embarques"
                      titleStyle={{ fontSize: 14 }}
                      onPress={() => { }}
                    />
                    <List.Item
                      title="Requisição de EPI"
                      titleStyle={{ fontSize: 14 }}
                      onPress={() => { }}
                    />
                    <List.Item
                      title="Treinamento Obrigatórios"
                      titleStyle={{ fontSize: 14 }}
                      onPress={() => { }}
                    />
                  </List.Accordion>
              */}
                </View>
              )}


              <List.Accordion
                title="Configurações"
                titleStyle={{ fontSize: 15 }}
                id="4"
                left={() => (
                  <List.Icon
                    icon={({ color, size }) => (
                      <FontAwesome name="cog" color={color} size={size} />
                    )}
                  />
                )}>
                <List.Item
                  title="Perfil"
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}
                />
                <List.Item
                  title="API"
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => {
                    props.navigation.navigate('Configs');
                  }}
                />
              </List.Accordion>
              <List.Item
                left={() => (
                  <List.Icon
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account-check-outline"
                        color={color}
                        size={size}
                      />
                    )}
                  />
                )}
                title="Suporte ETM"
                titleStyle={{ fontSize: 15 }}
                onPress={() => { Linking.openURL('https://www.etm.srv.br'); }}
              />
            </List.AccordionGroup>


          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sair"
          onPress={() => {
            Deslogar();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop:-5
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: commonStyles.color.principal,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: commonStyles.fontWeight,
    marginTop: 3,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: 14,
    fontWeight: commonStyles.fontWeight,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  email: {
    fontSize: 10,
    fontWeight: commonStyles.fontWeight,
    lineHeight: 14,
    color: 'white',
  },
});
