import React from "react";
import { View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./FormInputField.styles";
import { titleCase } from "../../utils/format-text";

interface FormInputProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const FormInputField: React.FC<FormInputProps> = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  const handleTextChange = (text: string) => {
    const formattedText = titleCase(text);
    onChangeText(formattedText);
  };
  return (
    <View style={styles.inputContainer}>
      <FontAwesome5 name={iconName} size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#666"}
        value={titleCase(value)}
        onChangeText={handleTextChange}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

export default FormInputField;
