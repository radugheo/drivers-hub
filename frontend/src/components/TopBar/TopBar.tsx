import React from "react";
import { View, Text } from "react-native";
import { styles } from "./TopBar.styles";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarTitle}>{title}</Text>
    </View>
  );
};

export default TopBar;
