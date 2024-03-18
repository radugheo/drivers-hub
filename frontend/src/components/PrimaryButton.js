import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const PrimaryButton = ({ title, onPress }) => {
  return (
    <Pressable style={styles.redirectButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  redirectButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    fontFamily: 'OktahRound-Bold',
    letterSpacing: 0.25,
    color: "white",
  },
});

export default PrimaryButton;
