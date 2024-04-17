import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import DateInputField from "../DateInputField/DateInputField";
import FormInputField from "../FormInputField/FormInputField";
import OpacityButton from "../OpacityButton/OpacityButton";
import PageTitle from "../PageTitle/PageTitle";
import { styles } from "./InsuranceFormModal.styles";
import PictureInputField from "../PictureInputField/PictureInputField";
import { ActiveInsurance } from "../../models/Active-Insurance.model";

interface InsuranceFormModalProps {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  insurance: ActiveInsurance;
  setInsurance: (data: any) => void;
  onSave: () => void;
}

const InsuranceFormModal: React.FC<InsuranceFormModalProps> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  insurance,
  setInsurance,
  onSave,
}) => {
  const handleImageSelect = (imageBase64: string | null) => {
    setInsurance({
      ...insurance,
      picture: imageBase64,
    });
  };

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
              <PageTitle title="Add Insurance" />
              <ScrollView>
                <Text style={styles.editField}>Insurance Policy Number</Text>
                <FormInputField
                  iconName="file-contract"
                  placeholder="Insurance Policy Number"
                  value={insurance.policyNumber ? insurance.policyNumber : ""}
                  onChangeText={(text) =>
                    setInsurance({
                      ...insurance,
                      policyNumber: text,
                    })
                  }
                />

                <Text style={styles.editField}>Insurance Company</Text>
                <FormInputField
                  iconName="building"
                  placeholder="Insurance Company"
                  value={insurance.company ? insurance.company : ""}
                  onChangeText={(text) =>
                    setInsurance({
                      ...insurance,
                      company: text,
                    })
                  }
                />

                <Text style={styles.editField}>Valid from</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Insurance Start Date"
                  value={insurance.startDate!}
                  onChange={(date) =>
                    setInsurance({
                      ...insurance,
                      startDate: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>Valid to</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Insurance Expiry Date"
                  value={insurance.expiryDate!}
                  onChange={(date) =>
                    setInsurance({
                      ...insurance,
                      expiryDate: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>Insurance Picture</Text>
                <PictureInputField
                  iconName="camera"
                  title="Select or Take a Picture"
                  onImageSelect={handleImageSelect}
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
