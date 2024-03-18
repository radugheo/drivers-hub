import { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/app-navigator';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'OktahRound-Bold': require('./assets/fonts/oktah_round_bold.otf'),
      'OktahRound-Regular': require('./assets/fonts/oktah_round_regular.otf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <AppNavigator />  
  );
}
