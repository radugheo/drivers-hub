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

interface InsuranceFormModalProps {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  insuranceFormData: {
    insurancePolicyNumber: string;
    insuranceCompany: string;
    insuranceStartDate: Date;
    insuranceExpiryDate: Date;
    insurancePicture: string;
  };
  setInsuranceFormData: (data: any) => void;
  onSave: () => void;
}

const InsuranceFormModal: React.FC<InsuranceFormModalProps> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  insuranceFormData,
  setInsuranceFormData,
  onSave,
}) => {
  const handleImageSelect = (imageBase64: string | null) => {
    setInsuranceFormData({
      ...insuranceFormData,
      insurancePicture: imageBase64,
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
                  value={insuranceFormData.insurancePolicyNumber}
                  onChangeText={(text) =>
                    setInsuranceFormData({
                      ...insuranceFormData,
                      insurancePolicyNumber: text,
                    })
                  }
                />

                <Text style={styles.editField}>Insurance Company</Text>
                <FormInputField
                  iconName="building"
                  placeholder="Insurance Company"
                  value={insuranceFormData.insuranceCompany}
                  onChangeText={(text) =>
                    setInsuranceFormData({
                      ...insuranceFormData,
                      insuranceCompany: text,
                    })
                  }
                />

                <Text style={styles.editField}>Insurance Start Date</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Insurance Start Date"
                  value={insuranceFormData.insuranceStartDate}
                  onChange={(date) =>
                    setInsuranceFormData({
                      ...insuranceFormData,
                      insuranceStartDate: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>Insurance End Date</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Insurance Expiry Date"
                  value={insuranceFormData.insuranceExpiryDate}
                  onChange={(date) =>
                    setInsuranceFormData({
                      ...insuranceFormData,
                      insuranceExpiryDate: date || new Date(),
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
