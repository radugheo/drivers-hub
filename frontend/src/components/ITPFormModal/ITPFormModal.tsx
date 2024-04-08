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
    lastService: Date;
    nextService: Date;
  };
  setITPFormData: (data: any) => void;
  onSave: () => void;
}

const InsuranceFormModal: React.FC<ITPFormModal> = ({
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
                  placeholder="Insurance Start Date"
                  value={ITPFormData.lastService}
                  onChange={(date) =>
                    setITPFormData({
                      ...ITPFormData,
                      lastService: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>Valid to</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Insurance Expiry Date"
                  value={ITPFormData.nextService}
                  onChange={(date) =>
                    setITPFormData({
                      ...ITPFormData,
                      nextService: date || new Date(),
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

export default InsuranceFormModal;
