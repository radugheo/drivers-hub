import { FontAwesome5 } from "@expo/vector-icons";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./LocationOptionsModal.styles";

interface FloatingActionButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.fabContainer} onPress={onPress}>
      <View>
        <FontAwesome5
          style={{ color: "gray" }}
          name={icon}
          size={26}
          color="#000"
        />
      </View>
      <Text style={styles.fabText}>{label}</Text>
    </TouchableOpacity>
  );
};

interface LocationOptionsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LocationOptionsModal: React.FC<LocationOptionsModalProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.fabGroup}>
          <FloatingActionButton
            icon="map-pin"
            label="Park"
            onPress={() => {
              onClose();
            }}
          />
          <FloatingActionButton
            icon="wrench"
            label="Services"
            onPress={() => {
              onClose();
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LocationOptionsModal;
