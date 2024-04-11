import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "./ProfileScreen.styles";
import { removeString, retrieveString } from "../../utils/storage-handler";
import { getCarsApiCall, getUserDataApiCall } from "../../api/api-service";

const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
    carsNumber: 0,
  });

  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      const token = await retrieveString("userToken");
      if (token) {
        try {
          let data = await getUserDataApiCall(token);
          data = { ...data, carsNumber: await retrieveString("carsNumber") };
          setUserData(data);
        } catch (error) {
          console.log("Failed to fetch user data", error);
          Alert.alert("Error", "Unable to load profile data.");
        }
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await removeString("userToken");
      console.log("User logged out");
      Alert.alert("Success", "You have been logged out successfully.");
      navigation.navigate("Login" as never);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{userData.username}</Text>
          <View style={styles.emailContainerRow}>
            <MaterialIcons name="email" size={16} color="grey" />
            <Text style={styles.infoText}>{userData.email}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.fieldAmount}>{userData.carsNumber}</Text>
          <Text style={styles.fieldLabel}>Cars</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionItem}>
        <AntDesign name="edit" size={20} color="blue" />
        <Text style={styles.actionText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}>
        <Ionicons name="settings-outline" size={20} color="blue" />
        <Text style={styles.actionText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="blue" />
        <Text style={styles.actionText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
