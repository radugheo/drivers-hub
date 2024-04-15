import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import DateInputField from "../DateInputField/DateInputField";
import OpacityButton from "../OpacityButton/OpacityButton";
import PageTitle from "../PageTitle/PageTitle";
import { styles } from "./VignetteFormModal.styles";

interface VignetteFormModal {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  vignetteFormData: {
    vignetteStartDate: Date;
    vignetteExpiryDate: Date;
  };
  setVignetteFormData: (data: any) => void;
  onSave: () => void;
}

const VignetteFormModal: React.FC<VignetteFormModal> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  vignetteFormData,
  setVignetteFormData,
  onSave,
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalFormContainer}>
              <PageTitle title="Add Vignette" />
              <ScrollView>
                <Text style={styles.editField}>Valid from</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Vignette Start Date"
                  value={vignetteFormData.vignetteStartDate}
                  onChange={(date) =>
                    setVignetteFormData({
                      ...vignetteFormData,
                      vignetteStartDate: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>Valid to</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Vignette Expiry Date"
                  value={vignetteFormData.vignetteExpiryDate}
                  onChange={(date) =>
                    setVignetteFormData({
                      ...vignetteFormData,
                      vignetteExpiryDate: date || new Date(),
                    })
                  }
                />
              </ScrollView>
              <OpacityButton title="Save" onPress={onSave} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default VignetteFormModal;
