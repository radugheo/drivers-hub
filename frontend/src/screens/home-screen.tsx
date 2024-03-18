import React from "react";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar title="Driver's Hub" />
      <NavBar />
    </SafeAreaView>
  );
};

export default HomeScreen;
