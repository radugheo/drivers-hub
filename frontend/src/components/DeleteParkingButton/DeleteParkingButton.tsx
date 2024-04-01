import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./DeleteParkingButton.styles";

interface DeleteParkingButtonProps {
  onPress: () => void;
}

const DeleteParkingButton: React.FC<DeleteParkingButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.recenterButton} onPress={onPress}>
      <Ionicons name="close-circle-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default DeleteParkingButton;
