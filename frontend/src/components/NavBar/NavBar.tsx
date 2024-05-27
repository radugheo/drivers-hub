import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import FindMyCarScreen from "../../screens/FindMyCar/FindMyCarScreen";
import DashboardScreen from "../../screens/Dashboard/DashboardScreen";
import NearbyCarServicesScreen from "../../screens/NearbyCarServices/NearbyCarServices";
import AddCarScreen from "../../screens/AddCar/AddCarScreen";
import { TouchableOpacity, View } from "react-native";
import LocationOptionsModal from "../LocationOptionsModal/LocationOptionsModal";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const handleCloseModal = () => {
    setLocationModalVisible(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "white",
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
        <Tab.Screen name="Symbols" component={DashboardScreen} />
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
        <Tab.Screen name="Chat" component={NearbyCarServicesScreen} />
        <Tab.Screen
          name="Location"
          component={FindMyCarScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setLocationModalVisible(true);
            },
          }}
        />
      </Tab.Navigator>
      <LocationOptionsModal
        isVisible={isLocationModalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#092b3d",
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
