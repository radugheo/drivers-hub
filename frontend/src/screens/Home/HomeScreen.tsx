import React from "react";
import TopBarWithProfile from "../../components/TopBarWithProfile/TopBarWithProfile";
import NavBar from "../../components/NavBar/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBarWithProfile title="Driver's Hub" />
      <NavBar />
    </SafeAreaView>
  );
};

export default HomeScreen;
