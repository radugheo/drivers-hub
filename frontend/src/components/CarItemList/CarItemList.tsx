import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Car } from "../../models/Car.model";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { styles } from "./CarItemList.styles";

interface CarItemListProps {
  item: Car;
}

const CarItemList: React.FC<CarItemListProps> = ({ item }) => {
  const navigation: any = useNavigation();

  const handlePress = () => {
    navigation.navigate("CarScreen", { item });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.carItem}>
      <View>
        <Text style={styles.carTitle}>
          {item.make} {item.model}
        </Text>
        <Text style={styles.carLicense}>{item.licensePlate}</Text>
        {/* Uncomment and update the Image component if you want to display the image */}
        {/* <Image source={{ uri: item.picture }} style={styles.carImage} /> */}
      </View>
    </TouchableOpacity>
  );
};

export default CarItemList;
