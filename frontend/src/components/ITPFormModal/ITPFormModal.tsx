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
import { styles } from "./ITPFormModal.styles";

interface ITPFormModal {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  ITPFormData: {
    lastInspection: Date;
    nextInspection: Date;
  };
  setITPFormData: (data: any) => void;
  onSave: () => void;
}

const ITPFormModal: React.FC<ITPFormModal> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  ITPFormData,
  setITPFormData,
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
              <PageTitle title="Add ITP" />
              <ScrollView>
                <Text style={styles.editField}>Valid from</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="ITP Start Date"
                  value={ITPFormData.lastInspection}
                  onChange={(date) =>
                    setITPFormData({
                      ...ITPFormData,
                      lastInspection: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>Valid to</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="ITP Expiry Date"
                  value={ITPFormData.nextInspection}
                  onChange={(date) =>
                    setITPFormData({
                      ...ITPFormData,
                      nextInspection: date || new Date(),
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

export default ITPFormModal;
