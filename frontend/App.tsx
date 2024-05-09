import { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/app-navigator";
import { ActivityIndicator, LogBox } from "react-native";
import * as Font from "expo-font";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try{
    await Font.loadAsync({
      "OktahRound-Bold": require("./assets/fonts/oktah_round_bold.otf"),
      "OktahRound-Regular": require("./assets/fonts/oktah_round_light.otf"),
      "Montserrat-Bold": require("./assets/fonts/montserrat-bold.ttf")
    });
    setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts", error);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['ViewPropTypes will be removed', 'Each child in a list should have a unique "key" prop', 'Reduced motion setting is enabled on this device']);
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return <AppNavigator />;
}
