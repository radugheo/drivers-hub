import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./CustomWidget.styles";

interface CustomWidgetProps {
  title: string;
  progress: number;
}

const CustomWidget: React.FC<CustomWidgetProps> = ({ title, progress }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarForeground, { width: `${progress}%` }]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomWidget;
