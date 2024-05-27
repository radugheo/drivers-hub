import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import OpacityButton from "../OpacityButton/OpacityButton";
import PageTitle from "../PageTitle/PageTitle";
import { styles } from "./ChangePasswordFormModal.styles";
import FormAuthField from "../FormAuthField/FormAuthField";

interface ChangePasswordFormModalProps {
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  visible: boolean;
  onRequestClose: () => void;
  newPassword: string;
  setNewPassword: (newPassword: string) => void;
  newPasswordConfirm: string;
  setNewPasswordConfirm: (newPasswordConfirm: string) => void;
  onSave: () => void;
}

const ChangePasswordFormModal: React.FC<ChangePasswordFormModalProps> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  newPassword,
  setNewPassword,
  newPasswordConfirm,
  setNewPasswordConfirm,
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
              <PageTitle title="Change Password" />
              <ScrollView>
                <Text style={styles.editField}>New Password</Text>
                <FormAuthField
                  iconName="lock"
                  placeholder="New Password"
                  secureTextEntry={true}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <Text style={styles.editField}>Confirm New Password</Text>
                <FormAuthField
                  iconName="lock"
                  placeholder="Confirm New Password"
                  secureTextEntry={true}
                  value={newPasswordConfirm}
                  onChangeText={setNewPasswordConfirm}
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

export default ChangePasswordFormModal;
