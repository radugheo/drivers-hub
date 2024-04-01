import React, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { styles } from "./DashboardScreen.styles";
import { getCarsApiCall } from "../../api/auth-service";
import { Car } from "../../models/Car.model";
import { retrieveString } from "../../utils/storage-handler";
import OpacityButton from "../../components/OpacityButton/OpacityButton";

const DashboardScreen: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = await retrieveString("userToken");
        if (token) {
          const fetchedCars: Car[] = await getCarsApiCall(token);
          setCars(fetchedCars);
        } else {
          console.log("Unable to retrieve user token");
          Alert.alert("Error", "Unable to retrieve user token");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Unable to retrieve cars");
      }
    };

    fetchCars();
  }, []);

  const renderItem = ({ item }: { item: Car }) => {
    return (
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={styles.carTitle}>
            {item.make} {item.model} {item.year}
          </Text>
          <Text style={styles.carSubtitle}>{item.licensePlate}</Text>
        </View>
        <OpacityButton title="Add new information" onPress={() => {}} />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={cars}
        renderItem={renderItem}
        sliderWidth={styles.sliderWidth.width}
        itemWidth={styles.itemWidth.width}
        layout={"default"}
      />
    </View>
  );
};

export default DashboardScreen;
