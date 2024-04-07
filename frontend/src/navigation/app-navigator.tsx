import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/Register/RegisterScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import GarageScreen from "../screens/Garage/GarageScreen";
import AddCarScreen from "../screens/AddCar/AddCarScreen";
import CarScreen from "../screens/Car/CarScreen";
import { Car } from "../models/Car.model";
import FindMyCarScreen from "../screens/FindMyCar/FindMyCarScreen";
import InsuranceScreen from "../screens/InsuranceScreen/InsuranceScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Garage: undefined;
  AddCarScreen: undefined;
  CarScreen: { item: Car };
  FindMyCarScreen: undefined;
  InsuranceScreen: { item: Car };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Garage" component={GarageScreen} />
        <Stack.Screen
          name="AddCarScreen"
          component={AddCarScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CarScreen"
          component={CarScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FindMyCarScreen"
          component={FindMyCarScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InsuranceScreen"
          component={InsuranceScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
