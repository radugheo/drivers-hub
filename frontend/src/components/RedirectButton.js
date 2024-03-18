import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const RedirectButton = ({ title, onPress }) => {
  return (
    <Pressable style={styles.redirectButtonDesign} onPress={onPress}>
      <Text style={styles.redirectButtonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  redirectButtonDesign: {
    marginBottom: 20,
  },
  redirectButtonText: {
    fontSize: 16,
    fontFamily: 'OktahRound-Regular',
    color: "blue",
  },
});

export default RedirectButton;
