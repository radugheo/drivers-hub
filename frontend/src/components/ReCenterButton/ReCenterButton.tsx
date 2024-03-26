import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ReCenterButton.styles";

interface ReCenterButtonProps {
  onPress: () => void;
}

const ReCenterButton: React.FC<ReCenterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.recenterButton} onPress={onPress}>
      <Ionicons name="compass-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default ReCenterButton;
