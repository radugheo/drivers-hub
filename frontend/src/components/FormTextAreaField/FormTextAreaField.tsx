import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./FormTextAreaField.styles";

interface FormTextAreaProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const FormTextAreaField: React.FC<FormTextAreaProps> = ({
  iconName,
  placeholder,
  value,
  onChangeText,
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
        multiline={true}
        numberOfLines={4} // Adjust the number of lines as needed
        autoCapitalize="none"
      />
    </View>
  );
};

export default FormTextAreaField;
