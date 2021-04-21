import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import InventoryItemList from "../screens/ItemList/InventoryItemList";
import GetProducts from "../screens/GetProducts/GetProducts";
import Login from "../screens/LoginScreen/Login";
import Configs from "../screens/SettingsScreen/index";
import Profile from "../screens/ProfileScreen/Profile";
import Drawer from './Drawer'
import Company from "../screens/CompanyScreen/Company";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";

const Stack = createStackNavigator();

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Company" component={Company}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="JourneyList" component={Drawer} />
        <Stack.Screen name="Configs" component={Configs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="InventoryItemList" component={InventoryItemList} />
        <Stack.Screen name="GetProducts" component={GetProducts} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
      </Stack.Navigator>
    </View>
  );
};
