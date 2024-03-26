import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./TopBarWithProfile.styles";

interface TopBarWithProfileProps {
  title: string;
}

const TopBarWithProfile: React.FC<TopBarWithProfileProps> = ({ title }) => {
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

export default TopBarWithProfile;
