import { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/app-navigator";
import { ActivityIndicator, LogBox } from "react-native";
import * as Font from "expo-font";
import { configureAWS } from "./src/utils/aws-config";
import AWS from "aws-sdk";

let s3Client: AWS.S3;

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const initializeApp = () => {
    configureAWS();
    s3Client = new AWS.S3();
  };

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
    initializeApp();
    loadFonts();
    LogBox.ignoreAllLogs();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return <AppNavigator />;
}

export { s3Client };
