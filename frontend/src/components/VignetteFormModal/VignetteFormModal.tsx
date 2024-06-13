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
import { ActiveVignette } from "../../models/Active-Vignette.model";
import { nextYear } from "../../utils/format-text";

interface VignetteFormModal {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  vignette: ActiveVignette;
  setVignette: (data: any) => void;
  onSave: () => void;
}

const VignetteFormModal: React.FC<VignetteFormModal> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  vignette,
  setVignette,
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
                  value={vignette.validFrom || new Date()}
                  onChange={(date) =>
                    setVignette({
                      ...vignette,
                      validFrom: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>Valid to</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Vignette Expiry Date"
                  value={vignette.validUntil || nextYear()}
                  onChange={(date) =>
                    setVignette({
                      ...vignette,
                      validUntil: date || nextYear(),
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
