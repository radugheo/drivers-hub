import React, { useState } from "react";
import { View, Modal, Platform, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./FormDropdownField.styles";

interface FormDropdownProps {
  iconName: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  items: { label: string; value: string }[];
}

const FormDropdownField: React.FC<FormDropdownProps> = ({
  iconName,
  selectedValue,
  onValueChange,
  items,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <FontAwesome5 name={iconName} size={24} color="black" />
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedValue || "Select"}</Text>
      </TouchableOpacity>

      {Platform.OS === "ios" && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                onValueChange(itemValue);
                setModalVisible(false);
              }}
              style={styles.picker}
            >
              {items.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </Modal>
      )}

      {Platform.OS === "android" && (
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            onValueChange(itemValue);
          }}
          mode="dropdown"
          style={styles.picker}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default FormDropdownField;
