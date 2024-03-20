import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar title="Driver's Hub" />
      <NavBar />
    </SafeAreaView>
  );
};

export default HomeScreen;
