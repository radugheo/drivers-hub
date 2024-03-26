import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./MarkParkingButton.styles";

interface MarkParkingButtonProps {
  onPress: () => void;
}

const MarkParkingButton: React.FC<MarkParkingButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.recenterButton} onPress={onPress}>
      <Ionicons name="pin-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default MarkParkingButton;
