import React, { useEffect } from "react";
import TopBarWithProfile from "../../components/TopBarWithProfile/TopBarWithProfile";
import NavBar from "../../components/NavBar/NavBar";
import { Alert, View } from "react-native";
import { updatePushTokenApiCall } from "../../api/api-service";
import { retrieveString } from "../../utils/storage-handler";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen: React.FC = () => {
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      console.log("Checking notification permissions...");
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      console.log("Existing status: ", existingStatus);
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "9551d3cf-92cb-4f04-ad7d-00ff0c1fab8d",
        })
      ).data;
      console.log(`Push Token: ${token}`);
      await addNotificationToken(token);

      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    };

    const addNotificationToken = async (token: string) => {
      try {
        const userToken = await retrieveString("userToken");
        const userId = await retrieveString("userId");
        await updatePushTokenApiCall(parseInt(userId), token, userToken);
        console.log("Push token updated successfully.");
      } catch (error) {
        console.error("Error updating notification token: ", error);
      }
    };

    registerForPushNotificationsAsync();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <TopBarWithProfile title="Driver's Hub" />
      <NavBar />
    </View>
  );
};

export default HomeScreen;
