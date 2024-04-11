import React from "react";
import { View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./NumberInputField.styles"; 

interface NumberInputProps {
  iconName: string;
  placeholder: string;
  value: string | null; 
  onChangeText: (text: string) => void; 
  secureTextEntry?: boolean; 
}

const NumberInputField: React.FC<NumberInputProps> = ({
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
        placeholderTextColor={"#666"}
        value={value? value : undefined}
        onChangeText={onChangeText}
        keyboardType="numeric"
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

export default NumberInputField;
