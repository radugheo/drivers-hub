import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import DashboardScreen from "../../screens/Dashboard/DashboardScreen";
import NearbyCarServicesScreen from "../../screens/NearbyCarServices/NearbyCarServices";
import AddCarScreen from "../../screens/AddCar/AddCarScreen";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import SymbolsScreen from "../../screens/SymbolsScreen/SymbolsScreen";
import LocationsScreen from "../../screens/LocationsScreen/LocationsScreen";
import ChatScreen from "../../screens/ChatScreen/ChatScreen";

const { width } = Dimensions.get("window");
const tabWidth = (width - 40) / 4;

const Tab = createBottomTabNavigator();

const NavBar = () => {
  useEffect(() => {
    console.log(`Tab width: ${tabWidth}, width: ${width}`);
  }, []);
  const TabBarBackground = () => {
    return (
      <Svg height={70} style={styles.svgStyle}>
        <Path
          // d={`M0,0 L${tabWidth * 1.5},0 Q${tabWidth * 2},80 ${tabWidth * 2.5},0 L${width},0 L${width},70 L0,70 Z`}
          // d={`M0,0 L0,0 L${((width-40) - 73)/2},0 A1,1,0,0,0,${((width-40) - 73)/2 + 73},0 L${width-40},0, L${width-40},70 L0,70 Z`}
          d={`M0,0 L0,0 L${(width - 40 - 73) / 2},0 C${(width - 40 - 73) / 2},60,${(width - 40 - 73) / 2 + 73},60,${(width - 40 - 73) / 2 + 73},0 L${width - 40},0, L${width - 40},70 L0,70 Z`}
          fill="white"
        />
      </Svg>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            height: 70,
            paddingBottom: 10,
            paddingHorizontal: 10,
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 25,
            alignItems: "center",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "OktahRound-Regular",
            marginTop: -10,
          },
          tabBarBackground: () => <TabBarBackground />,
          tabBarButton: (props) => {
            if (route.name === "Add Car") {
              return (
                <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.fab}
                    onPress={props.onPress}
                    onLongPress={props.onLongPress}
                  >
                    <FontAwesome5 name="plus" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              );
            } else {
              return <TouchableOpacity {...props} />;
            }
          },
          tabBarIcon: ({ focused, color, size }) => {
            const iconSize = focused ? size * 1.25 : size;
            switch (route.name) {
              case "Dashboard":
                return <FontAwesome5 name="th" size={iconSize} color={color} />;
              case "Services":
                return (
                  <FontAwesome5 name="wrench" size={iconSize} color={color} />
                );
              case "Location":
                return (
                  <FontAwesome5
                    name="map-marked"
                    size={iconSize}
                    color={color}
                  />
                );
              case "Symbols":
                return (
                  <FontAwesome5
                    name="tachometer-alt"
                    size={iconSize}
                    color={color}
                  />
                );
              case "Chat":
                return (
                  <FontAwesome5
                    name="comment-dots"
                    size={iconSize}
                    color={color}
                  />
                );
              default:
                return null;
            }
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Symbols" component={SymbolsScreen} />
        <Tab.Screen
          name="Add Car"
          component={AddCarScreen}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("AddCarScreen" as never);
            },
          })}
        />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Location" component={LocationsScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  svgStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 25,
    overflow: "hidden",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    // backgroundColor: "#092b3d",
    backgroundColor: "black",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    bottom: 20,
    zIndex: 1,
  },
});

export default NavBar;
