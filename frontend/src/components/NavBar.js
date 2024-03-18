import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import LoginScreen from "../screens/login-screen";
import RegisterScreen from "../screens/register-screen";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#0a2d43",
            height: 60,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "OktahRound-Regular",
            marginBottom: 5,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Garage") {
              iconName = focused ? "car-sport" : "car-sport-outline";
            } else if (route.name === "Services") {
              iconName = focused ? "construct" : "construct-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Garage" component={LoginScreen} />
        <Tab.Screen name="Services" component={RegisterScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default NavBar;
