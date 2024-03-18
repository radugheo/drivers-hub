import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PageTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: 'OktahRound-Bold',
  },
});

export default PageTitle;
