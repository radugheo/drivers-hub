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
import { ActiveService } from "../../models/Active-Service.model";
import FormDropdownField from "../FormDropdownField/FormDropdownField";
import { nextYear } from "../../utils/format-text";

interface ServiceFormModal {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  service: ActiveService;
  setService: (data: any) => void;
  onSave: () => void;
}

const ServiceFormModal: React.FC<ServiceFormModal> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  service,
  setService,
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
                  value={service.companyName || ""}
                  onChangeText={(companyName) =>
                    setService({
                      ...service,
                      companyName,
                    })
                  }
                />

                <Text style={styles.editField}>Valid from</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Valid from"
                  value={service.validFrom!}
                  onChange={(date) =>
                    setService({
                      ...service,
                      validFrom: date || new Date(),
                    })
                  }
                />

                <Text style={styles.editField}>
                  Next estimated maintainance
                </Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Next maintainance date"
                  value={service.validUntil!}
                  onChange={(date) =>
                    setService({
                      ...service,
                      validUntil: date || nextYear(),
                    })
                  }
                />

                <Text style={styles.editField}>Mileage</Text>
                <NumberInputField
                  iconName="tachometer-alt"
                  placeholder="Mileage"
                  value={service.serviceMileage || null}
                  onChangeText={(serviceMileage) =>
                    setService({
                      ...service,
                      serviceMileage,
                    })
                  }
                />

                <Text style={styles.editField}>Next service in:</Text>
                <FormDropdownField
                  iconName="tachometer-alt"
                  selectedValue={service.mileageInterval?.toString() || ""}
                  items={[
                    { label: "10,000", value: "10000" },
                    { label: "15,000", value: "15000" },
                  ]}
                  onValueChange={(mileageInterval) =>
                    setService({
                      ...service,
                      mileageInterval,
                    })
                  }
                />

                <Text style={styles.editField}>Service Details</Text>
                <FormTextAreaField
                  iconName="file"
                  placeholder="Service Details"
                  value={service.description || ""}
                  onChangeText={(description) =>
                    setService({
                      ...service,
                      description,
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
