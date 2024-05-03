import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./PlusButton.styles";

interface PlusButtonProps {
  onPress: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

export default PlusButton;
