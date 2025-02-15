import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./CustomWidget.styles";
import { Ionicons } from "@expo/vector-icons";

interface CustomWidgetProps {
  title: string;
  expiryDate: string;
  deleteHistoryWidget: () => void;
}

const CustomWidget: React.FC<CustomWidgetProps> = ({
  title,
  expiryDate,
  deleteHistoryWidget,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.allContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Expired on {expiryDate}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={deleteHistoryWidget}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomWidget;
