import React, { useEffect, useState } from "react";
import { View, Text, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ProfileScreen.styles";
import { removeString, retrieveString } from "../../utils/storage-handler";
import { getUserDataApiCall } from "../../api/api-service";
import TopBar from "../../components/TopBar/TopBar";
import FormAuthField from "../../components/FormAuthField/FormAuthField";
import OpacityButton from "../../components/OpacityButton/OpacityButton";

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
    <View style={styles.mainContainer}>
      <TopBar title='Profile' />
      <View style={styles.headerContainer}>
        <View>
          <View style={styles.profileData}>
            <MaterialIcons name="account-circle" size={40} color="grey" />
            <View>
              <Text style={styles.name}>{userData.username}</Text>
              <Text style={styles.email}>{userData.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <Text style={styles.carsNumber}>{userData.carsNumber}</Text>
          <MaterialIcons name="drive-eta" size={30} color="grey" />
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
          <TouchableOpacity style={styles.actionItem}>
            <AntDesign name="edit" size={20} color="black" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="key-outline" size={20} color="black" />
            <Text style={styles.actionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="settings-outline" size={20} color="black" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lastActionItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="red" />
            <Text style={styles.actionText}>Logout</Text>
          </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
