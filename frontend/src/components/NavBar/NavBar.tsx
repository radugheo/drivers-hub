import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import GarageScreen from "../../screens/Garage/GarageScreen";
import FindMyCarScreen from "../../screens/FindMyCar/FindMyCarScreen";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 70,
          paddingBottom: 15,
          paddingHorizontal: 25, 
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "OktahRound-Regular",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === "Garage") {
            iconName = focused ? "car-sport" : "car-sport-outline";
          } else if (route.name === "Reminders") {
            iconName = focused ? "alarm" : "alarm-outline";
          } else if (route.name === "Digital Wallet") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Find my Car") {
            iconName = focused ? "location" : "location-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Garage" component={GarageScreen} />
      <Tab.Screen name="Reminders" component={GarageScreen} />
      <Tab.Screen name="Digital Wallet" component={GarageScreen} />
      <Tab.Screen name="Find my Car" component={FindMyCarScreen} />
    </Tab.Navigator>
  );
};

export default NavBar;
