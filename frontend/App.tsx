import { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/app-navigator";
import { ActivityIndicator, Alert, LogBox } from "react-native";
import * as Notifications from "expo-notifications";
import * as Font from "expo-font";
import {
  getPushTokenApiCall,
  updatePushTokenApiCall,
} from "./src/api/api-service";
import { retrieveString } from "./src/utils/storage-handler";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        "OktahRound-Bold": require("./assets/fonts/oktah_round_bold.otf"),
        "OktahRound-Regular": require("./assets/fonts/oktah_round_light.otf"),
        "Montserrat-Bold": require("./assets/fonts/montserrat-bold.ttf"),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts", error);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      "ViewPropTypes will be removed",
      'Each child in a list should have a unique "key" prop',
      "Reduced motion setting is enabled on this device",
      "Calling getExpoPushTokenAsync without specifying a projectId is deprecated",
    ]);
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return <AppNavigator />;
}
