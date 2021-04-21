import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {JourneyList} from "../screens/JourneyList/JourneyList";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import DrawerContent from '../components/DrawerContent'

const Drawer = createDrawerNavigator();

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="JourneyList"
        screenOptions={{ headerShown: false }}
        drawerContent={props => <DrawerContent {...props}/>}

      >
        <Drawer.Screen name="JourneyList" component={JourneyList}/>
        <Drawer.Screen name="NotificationScreen" component={NotificationScreen}/>
      </Drawer.Navigator>
    </View>
  );
};
