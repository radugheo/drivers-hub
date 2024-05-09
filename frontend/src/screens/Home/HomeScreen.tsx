import React from "react";
import TopBarWithProfile from "../../components/TopBarWithProfile/TopBarWithProfile";
import NavBar from "../../components/NavBar/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopBarWithProfile title="Driver's Hub" />
      <NavBar />
    </View>
  );
};

export default HomeScreen;
