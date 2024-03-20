import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./TopBar.styles";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarTitle}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Profile" as never)}>
        <Ionicons name="person-circle-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
