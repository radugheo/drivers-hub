import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import GarageScreen from "../../screens/Garage/GarageScreen";

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
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "OktahRound-Regular",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === "Garage") {
            iconName = focused ? "car-sport" : "car-sport-outline";
          } else if (route.name === "Services") {
            iconName = focused ? "construct" : "construct-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Garage" component={GarageScreen} />
      <Tab.Screen name="Services" component={GarageScreen} />
    </Tab.Navigator>
  );
};

export default NavBar;
