import React from "react";
import { View, Text } from "react-native";
import { styles } from "./PageTitle.styles";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default PageTitle;
