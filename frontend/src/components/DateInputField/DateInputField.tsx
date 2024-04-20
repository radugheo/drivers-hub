import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./DateInputField.styles"; // Adjust as needed

interface DateInputProps {
  iconName: string;
  placeholder: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

const DateInputField: React.FC<DateInputProps> = ({
  iconName,
  placeholder,
  value,
  onChange,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View style={styles.inputContainer}>
      <FontAwesome5 name={iconName} size={24} color="black" />
      <TouchableOpacity
        onPress={showDatePicker}
        style={{ marginLeft: 10, flex: 1 }}
      >
        <Text
          style={value ? styles.input : { ...styles.input, color: "#c7c7c7" }}
        >
          {value ? value.toLocaleDateString() : placeholder}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor="black"
      />
    </View>
  );
};

export default DateInputField;
