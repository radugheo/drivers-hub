import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Car } from "../../models/Car.model";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { styles } from "./CarItemList.styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { getEstimatedCarPriceApiCall } from "../../api/api-service";
import { retrieveString } from "../../utils/storage-handler";
import { formatCurrency } from "../../utils/format-text";
import OpacityButton from "../OpacityButton/OpacityButton";

interface CarItemListProps {
  item: Car;
}

const CarItemList: React.FC<CarItemListProps> = ({ item }) => {
  const navigation: any = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null);

  const handlePress = () => {
    navigation.navigate("CarScreen", { item });
  };

  const showPricePopup = async () => {
    setModalVisible(true);
    const token = await retrieveString("userToken");
    const price = await getEstimatedCarPriceApiCall(item.id!, token);
    setEstimatedPrice(formatCurrency(price));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.carItem}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.carTitle}>
              {item.make} {item.model}
            </Text>
            <Text style={styles.carYear}>
              {item.year}, {item.mileage} km
            </Text>
            <Text style={styles.carLicense}>{item.licensePlate}</Text>
          </View>
          <TouchableOpacity onPress={showPricePopup} style={styles.headerRight}>
            <FontAwesome5 name={"dollar-sign"} size={24} color="green" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FontAwesome5
              name="robot"
              size={24}
              color="#5D5DFF"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.modalTitle}>AI Car Valuation</Text>
            <Text style={styles.modalText}>
              {estimatedPrice
                ? `Our AI estimates your car to be worth around ${estimatedPrice}`
                : "Calculating..."}
            </Text>
            <OpacityButton title="Close" onPress={closeModal}></OpacityButton>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CarItemList;
