import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ProfileScreen.styles";
import { removeString, retrieveString } from "../../utils/storage-handler";
import {
  getUserDataApiCall,
  updatePushTokenApiCall,
  updateUserDataApiCall,
  updateUserPasswordApiCall,
} from "../../api/api-service";
import TopBar from "../../components/TopBar/TopBar";
import EditProfileFormModal from "../../components/EditProfileFormModal/EditProfileFormModal";
import ChangePasswordFormModal from "../../components/ChangePasswordFormModal/ChangePasswordFormModal";

const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
    carsNumber: 0,
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);

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

  const clearNotificationToken = async () => {
    try {
      const userId = await retrieveString("userId");
      const userToken = await retrieveString("userToken");
      await updatePushTokenApiCall(parseInt(userId), "", userToken);
      console.log("Notification token cleared successfully");
    } catch (error) {
      console.error("Error clearing notification token: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await clearNotificationToken();
      await removeString("userToken");
      console.log("User logged out");
      Alert.alert("Success", "You have been logged out successfully.");
      navigation.navigate("Login" as never);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const handleEditFormSubmit = async () => {
    const userId = await retrieveString("userId");
    const userToken = await retrieveString("userToken");
    if (!userToken || !userId) {
      Alert.alert("Error", "User not logged in.");
      return;
    }
    try {
      const formattedFormData = {
        username: formData.username || undefined,
        email: formData.email || undefined,
      };
      console.log(`Updating user data: ${JSON.stringify(formattedFormData)}`);
      await updateUserDataApiCall(
        formattedFormData,
        parseInt(userId),
        userToken
      );
      Alert.alert("Success", "Profile updated successfully.");
      setEditModalVisible(false);
      setUserData({
        ...userData,
        username: formattedFormData.username || userData.username,
        email: formattedFormData.email || userData.email,
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  const handleChangePasswordFormSubmit = async () => {
    if (newPassword !== newPasswordConfirm) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    const userToken = await retrieveString("userToken");
    if (!userToken) {
      Alert.alert("Error", "User not logged in.");
      return;
    }
    try {
      await updateUserPasswordApiCall(userData.email, newPassword, userToken);
      Alert.alert("Success", "Password updated successfully.");
      setChangePasswordModalVisible(false);
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert("Error", "Failed to update password.");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar title="Profile" />
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
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => setEditModalVisible(true)}
        >
          <AntDesign name="edit" size={20} color="black" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => setChangePasswordModalVisible(true)}
        >
          <Ionicons name="key-outline" size={20} color="black" />
          <Text style={styles.actionText}>Change Password</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.actionItem}>
          <Ionicons name="settings-outline" size={20} color="black" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.lastActionItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <EditProfileFormModal
        animationType="fade"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
        userData={formData}
        setUserData={setFormData}
        onSave={handleEditFormSubmit}
      />
      <ChangePasswordFormModal
        animationType="fade"
        transparent={true}
        visible={isChangePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        newPasswordConfirm={newPasswordConfirm}
        setNewPasswordConfirm={setNewPasswordConfirm}
        onSave={handleChangePasswordFormSubmit}
      />
    </View>
  );
};

export default ProfileScreen;
