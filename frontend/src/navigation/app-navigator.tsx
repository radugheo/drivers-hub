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
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import ITPScreen from "../screens/ITPScreen/ITPScreen";
import ServiceScreen from "../screens/ServiceScreen/ServiceScreen";
import VignetteScreen from "../screens/VignetteScreen/VignetteScreen";
import { ActiveInsurance } from "../models/Active-Insurance.model";
import { ActiveInspection } from "../models/Active-Inspection.model";
import { ActiveService } from "../models/Active-Service.model";
import NearbyCarServicesScreen from "../screens/NearbyCarServices/NearbyCarServices";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  GarageScreen: undefined;
  AddCarScreen: undefined;
  CarScreen: { item: Car };
  DashboardScreen: undefined;
  FindMyCarScreen: undefined;
  InsuranceScreen: { carItem: Car; insuranceItem: ActiveInsurance };
  ITPScreen: { carItem: Car; inspectionItem: ActiveInspection };
  ServiceScreen: { carItem: Car; serviceItem: ActiveService };
  VignetteScreen: { item: Car };
  NearbyCarServicesScreen: undefined;
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
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GarageScreen"
          component={GarageScreen}
          options={{ headerShown: false }}
        />
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
          name="DashboardScreen"
          component={DashboardScreen}
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
        <Stack.Screen
          name="ITPScreen"
          component={ITPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServiceScreen"
          component={ServiceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VignetteScreen"
          component={VignetteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NearbyCarServicesScreen"
          component={NearbyCarServicesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
