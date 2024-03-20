import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./PrimaryButton.styles";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable style={styles.redirectButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
