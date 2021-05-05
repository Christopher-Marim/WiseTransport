import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {JourneyCurrent} from "../screens/JourneyCurrent/JourneyCurrent";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import DrawerContent from '../components/DrawerContent'
import { JourneyList } from "../screens/JourneyList/JourneyList";

const Drawer = createDrawerNavigator();

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="NotificationScreen"
        screenOptions={{ headerShown: false }}
        drawerContent={props => <DrawerContent {...props}/>}

      >
        <Drawer.Screen name="JourneyCurrent" component={JourneyCurrent}/>
        <Drawer.Screen name="NotificationScreen" component={NotificationScreen}/>
        <Drawer.Screen name="JourneyList" component={JourneyList} />

      </Drawer.Navigator>
    </View>
  );
};
