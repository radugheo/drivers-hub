import React, { useState, useCallback } from "react";
import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { styles } from "./DashboardScreen.styles";
import { getCarsApiCall, updateCarApiCall } from "../../api/api-service";
import { Car } from "../../models/Car.model";
import {
  retrieveCarWidgets,
  retrieveString,
  saveCarWidgets,
} from "../../utils/storage-handler";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import CustomWidget from "../../components/CustomWidget/CustomWidget";
import OptionsModal from "../../components/OptionsModal/OptionsModal";
import InsuranceFormModal from "../../components/InsuranceFormModal/InsuranceFormModal";
import { useFocusEffect } from "@react-navigation/native";
import InsuranceWidget from "../../components/InsuranceWidget/InsuranceWidget";

const DashboardScreen: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isServiceModalVisible, setServiceModalVisible] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [carWidgets, setCarWidgets] = useState<{ [carId: string]: string[] }>(
    {},
  );
  const [isInsuranceModalVisible, setIsInsuranceModalVisible] = useState(false);
  const [insuranceFormData, setInsuranceFormData] = useState({
    insuranceStartDate: new Date(),
    insuranceExpiryDate: new Date(),
    insurancePolicyNumber: "",
    insuranceCompany: "",
    insurancePicture: "",
  });

  const fetchCarsAndWidgets = useCallback(async () => {
    try {
      const token = await retrieveString("userToken");
      if (token) {
        let fetchedCars: Car[] = await getCarsApiCall(token);
        setCars(fetchedCars);
        const widgetsFetchPromises = fetchedCars.map((car) =>
          retrieveCarWidgets(car.id!.toString()),
        );
        const allWidgets = await Promise.all(widgetsFetchPromises);
        const widgetsMap = fetchedCars.reduce(
          (acc, car, index) => ({
            ...acc,
            [car.id!.toString()]: allWidgets[index] || [],
          }),
          {},
        );
        setCarWidgets(widgetsMap);
      } else {
        Alert.alert("Error", "Unable to retrieve user token");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to retrieve cars and widgets");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCarsAndWidgets();
    }, [fetchCarsAndWidgets]),
  );

  const options = ["Insurance", "Service", "Accident", "Mileage"];

  const widgetExists = (widgetName: string) => {
    if (selectedCarId) {
      const currentWidgets = carWidgets[selectedCarId.toString()] || [];
      if (currentWidgets.includes(widgetName)) {
        Alert.alert("Duplicate Widget", "This widget has already been added.");
        return true;
      }
    }
    return false;
  };

  const addWidgetToCar = async (carId: string, widgetName: string) => {
    const currentWidgets = carWidgets[carId] || [];
    const updatedWidgets = [...currentWidgets, widgetName];
    setCarWidgets({ ...carWidgets, [carId]: updatedWidgets });
    await saveCarWidgets(carId, updatedWidgets);
  };

  const renderOption = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        if (!widgetExists(item)) {
          if (selectedCarId && item === "Insurance") {
            setIsInsuranceModalVisible(true);
            setServiceModalVisible(false);
          } else if (selectedCarId) {
            addWidgetToCar(selectedCarId.toString(), item);
            setServiceModalVisible(false);
          }
        }
      }}
      style={styles.modalOption}
    >
      <Text style={styles.modalOptionText}>{item}</Text>
    </TouchableOpacity>
  );

  const carHasInsurance = (car: Car) => {
    return (
      car.insuranceCompany ||
      car.insurancePolicyNumber ||
      car.insuranceStartDate ||
      car.insuranceExpiryDate ||
      car.insurancePicture
    );
  };

  const renderItem = ({ item }: { item: Car }) => {
    const widgets = carWidgets[item.id!.toString()] || [];
    return (
      <View style={styles.carContainer}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Text style={styles.carTitle}>
              {item.make} {item.model} {item.year}
            </Text>
            <Text style={styles.carSubtitle}>{item.licensePlate}</Text>
          </View>
          {widgets.map((widgetName, index) => {
            if (widgetName === "Insurance") {
              if (carHasInsurance(item)) {
                return <InsuranceWidget item={item} />;
              }
            } else {
              return <CustomWidget title={widgetName} progress={30} />;
            }
          })}
        </ScrollView>
        <OpacityButton
          title="Add new information"
          onPress={() => {
            setSelectedCarId(item.id!);
            setServiceModalVisible(true);
          }}
        />
      </View>
    );
  };

  const handleInsuranceFormSubmit = async () => {
    if (!selectedCarId) {
      Alert.alert("Error", "No car selected.");
      return;
    }
    const token = await retrieveString("userToken");
    if (!token) {
      Alert.alert("Error", "User token not found.");
      return;
    }
    const carToUpdate = cars.find((car) => car.id === selectedCarId);
    if (!carToUpdate) {
      Alert.alert("Error", "Car not found.");
      return;
    }
    const updatedCar = {
      ...carToUpdate,
      ...insuranceFormData,
    };
    try {
      await updateCarApiCall(updatedCar, token);
      Alert.alert("Success", "Car insurance information updated successfully.");
      setIsInsuranceModalVisible(false);
      setCars(cars.map((car) => (car.id === selectedCarId ? updatedCar : car)));
      if (!carWidgets[selectedCarId.toString()].includes("Insurance")) {
        const updatedWidgets = [
          ...carWidgets[selectedCarId.toString()],
          "Insurance",
        ];
        setCarWidgets({
          ...carWidgets,
          [selectedCarId.toString()]: updatedWidgets,
        });
        saveCarWidgets(selectedCarId.toString(), updatedWidgets);
      }
    } catch (error) {
      console.error("Error updating insurance information:", error);
      Alert.alert("Error", "Failed to update insurance information.");
    }
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

      <OptionsModal
        animationType="none"
        transparent={true}
        visible={isServiceModalVisible}
        options={options}
        onRequestClose={() => setServiceModalVisible(false)}
        renderOption={renderOption}
      />

      <InsuranceFormModal
        animationType="none"
        transparent={true}
        visible={isInsuranceModalVisible}
        onRequestClose={() => setIsInsuranceModalVisible(false)}
        insuranceFormData={insuranceFormData}
        setInsuranceFormData={setInsuranceFormData}
        onSave={handleInsuranceFormSubmit}
      />
    </View>
  );
};

export default DashboardScreen;
