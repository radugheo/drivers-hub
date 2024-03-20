import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./OpacityButton.styles";

interface OpacityButtonProps {
  title: string;
  onPress: () => void;
}

const OpacityButton: React.FC<OpacityButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OpacityButton;
