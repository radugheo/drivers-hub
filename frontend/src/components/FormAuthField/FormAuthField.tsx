import React from "react";
import { View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./FormAuthField.styles";

interface FormInputProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const FormAuthField: React.FC<FormInputProps> = ({
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
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

export default FormAuthField;
