import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const FormInputField = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <FontAwesome5 name={iconName} size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    padding: 10,
  },
  input: {
    height: 20,
    flex: 1,
    marginLeft: 10,
    fontFamily: 'OktahRound-Regular',
  },
});

export default FormInputField;
