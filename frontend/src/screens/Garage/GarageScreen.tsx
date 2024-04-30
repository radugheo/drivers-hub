import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, ListRenderItem, Alert } from "react-native";
import { Car } from "../../models/Car.model";
import { getCarsApiCall } from "../../api/api-service";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { retrieveString, storeString } from "../../utils/storage-handler";
import { styles } from "./GarageScreen.styles";
import CarItemList from "../../components/CarItemList/CarItemList";
import OpacityButton from "../../components/OpacityButton/OpacityButton";

const GarageScreen: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const navigation = useNavigation();

  const fetchCars = async () => {
    try {
      const token = await retrieveString("userToken");
      if (token) {
        let fetchedCars: Car[] = await getCarsApiCall(token);
        setCars(fetchedCars);
        await storeString("carsNumber", fetchedCars.length.toString());
      } else {
        console.log("Unable to retrieve user token");
        Alert.alert("Error", "Unable to retrieve user token");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to retrieve cars");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCars();
    }, [fetchCars]),
  );

  const handleAddCar = async () => {
    navigation.navigate("AddCarScreen" as never);
  };

  const renderCarItem: ListRenderItem<Car> = ({ item }) => (
    <CarItemList item={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id!.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{ fontFamily: "OktahRound-Regular" }}>
            No cars available.
          </Text>
        }
      />
      <OpacityButton title="Add Car" onPress={handleAddCar} />
    </View>
  );
};

export default GarageScreen;
