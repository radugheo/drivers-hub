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
import { styles } from "./ServiceFormModal.styles";
import FormInputField from "../FormInputField/FormInputField";
import NumberInputField from "../NumberInputField/NumberInputField";
import FormTextAreaField from "../FormTextAreaField/FormTextAreaField";

interface ServiceFormModal {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  serviceFormData: {
    lastService: Date;
    nextService: Date;
    lastServiceMileage: number;
    nextServiceMileageInterval: number;
    serviceCompany: string;
    serviceDetails: string;
  };
  setServiceFormData: (data: any) => void;
  onSave: () => void;
}

const ServiceFormModal: React.FC<ServiceFormModal> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  serviceFormData,
  setServiceFormData,
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
              <PageTitle title="Add Service" />
              <ScrollView>
                <Text style={styles.editField}>Service Company</Text>
                <FormInputField
                  iconName="building"
                  placeholder="Service Company"
                  value={serviceFormData.serviceCompany}
                  onChangeText={(serviceCompany) =>
                    setServiceFormData({
                      ...serviceFormData,
                      serviceCompany,
                    })
                  }
                />

                <Text style={styles.editField}>Last maintainance</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Last mainatance date"
                  value={serviceFormData.lastService}
                  onChange={(date) =>
                    setServiceFormData({
                      ...serviceFormData,
                      lastService: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>
                  Next estimated maintainance
                </Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Next maintainance date"
                  value={serviceFormData.nextService}
                  onChange={(date) =>
                    setServiceFormData({
                      ...serviceFormData,
                      nextService: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>Mileage</Text>
                <NumberInputField
                  iconName="tachometer-alt"
                  placeholder="Mileage"
                  value={
                    serviceFormData.lastServiceMileage === 0
                      ? ""
                      : serviceFormData.lastServiceMileage?.toString() || ""
                  }
                  onChangeText={(lastServiceMileage) =>
                    setServiceFormData({
                      ...serviceFormData,
                      lastServiceMileage,
                    })
                  }
                />

                <Text style={styles.editField}>Next service in:</Text>
                <NumberInputField
                  iconName="tachometer-alt"
                  placeholder="Mileage interval"
                  value={
                    serviceFormData.nextServiceMileageInterval === 0
                      ? ""
                      : serviceFormData.nextServiceMileageInterval?.toString() ||
                        ""
                  }
                  onChangeText={(nextServiceMileageInterval) =>
                    setServiceFormData({
                      ...serviceFormData,
                      nextServiceMileageInterval,
                    })
                  }
                />

                <Text style={styles.editField}>Service Details</Text>
                <FormTextAreaField
                  iconName="file"
                  placeholder="Service Details"
                  value={serviceFormData.serviceDetails}
                  onChangeText={(serviceDetails) =>
                    setServiceFormData({
                      ...serviceFormData,
                      serviceDetails,
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

export default ServiceFormModal;
