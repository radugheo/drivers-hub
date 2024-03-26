import { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/app-navigator";
import { ActivityIndicator } from "react-native";
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
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return <AppNavigator />;
}
