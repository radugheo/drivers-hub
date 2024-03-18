import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TopBar = ({ title }) => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 65,
    backgroundColor: "#0a2d43",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  topBarTitle: {
    color: "#ffffff",
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: 'OktahRound-Bold',
  },
});

export default TopBar;
