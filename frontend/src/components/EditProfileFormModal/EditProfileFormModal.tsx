import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import OpacityButton from "../OpacityButton/OpacityButton";
import PageTitle from "../PageTitle/PageTitle";
import { styles } from "./EditProfileFormModal.styles";
import FormAuthField from "../FormAuthField/FormAuthField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface EditProfileFormModalProps {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  userData: { username: string; email: string };
  setUserData: (data: any) => void;
  onSave: () => void;
}

const EditProfileFormModal: React.FC<EditProfileFormModalProps> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  userData,
  setUserData,
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
              <PageTitle title="Edit Profile" />
              <ScrollView>
                <Text style={styles.editField}>Username</Text>
                <FormAuthField
                  iconName="user"
                  placeholder="Username"
                  value={userData.username}
                  onChangeText={(text) =>
                    setUserData({ ...userData, username: text })
                  }
                />
                <Text style={styles.editField}>Email</Text>
                <FormAuthField
                  iconName="envelope"
                  placeholder="Email"
                  value={userData.email}
                  onChangeText={(text) =>
                    setUserData({ ...userData, email: text })
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

export default EditProfileFormModal;
