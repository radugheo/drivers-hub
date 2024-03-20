import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./RedirectButton.styles";

interface RedirectButtonProps {
  title: string;
  onPress: () => void;
}

const RedirectButton: React.FC<RedirectButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable style={styles.redirectButtonDesign} onPress={onPress}>
      <Text style={styles.redirectButtonText}>{title}</Text>
    </Pressable>
  );
};

export default RedirectButton;
