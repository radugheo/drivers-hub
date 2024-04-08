import { Modal, TouchableOpacity, View, FlatList } from "react-native";
import { styles } from "./OptionsModal.styles";

interface OptionsModalProps {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  options: string[];
  onRequestClose: () => void;
  renderOption: (item: any) => JSX.Element;
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  animationType,
  transparent,
  visible,
  options,
  onRequestClose,
  renderOption,
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onRequestClose}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            renderItem={renderOption}
            keyExtractor={(item) => item}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default OptionsModal;
