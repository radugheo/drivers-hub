import { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/app-navigator";
import { ActivityIndicator, LogBox } from "react-native";
import * as Font from "expo-font";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "OktahRound-Bold": require("./assets/fonts/oktah_round_light.otf"),
      "OktahRound-Regular": require("./assets/fonts/oktah_round_light.otf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    LogBox.ignoreLogs(['ViewPropTypes will be removed']);
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return <AppNavigator />;
}
