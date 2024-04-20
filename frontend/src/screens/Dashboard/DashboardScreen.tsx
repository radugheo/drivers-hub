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
import ITPFormModal from "../../components/ITPFormModal/ITPFormModal";
import ITPWidget from "../../components/ITPWidget/ITPWidget";
import ServiceWidget from "../../components/ServiceWidget/ServiceWidget";
import ServiceFormModal from "../../components/ServiceFormModal/ServiceFormModal";
import VignetteWidget from "../../components/VignetteWidget/VignetteWidget";
import { ActiveInsurance } from "../../models/Active-Insurance.model";
import { ActiveInspection } from "../../models/Active-Inspection.model";
import { ActiveService } from "../../models/Active-Service.model";

const DashboardScreen: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [carWidgets, setCarWidgets] = useState<{ [carId: string]: string[] }>(
    {},
  );
  const [isInsuranceModalVisible, setIsInsuranceModalVisible] = useState(false);
  const [insurance, setInsurance] = useState<ActiveInsurance>(
    new ActiveInsurance(),
  );

  const [isInspectionModalVisible, setIsInspectionModalVisible] =
    useState(false);
  const [inspection, setInspection] = useState<ActiveInspection>(
    new ActiveInspection(),
  );

  const [isServiceModalVisible, setServiceModalVisible] = useState(false);
  const [service, setService] = useState<ActiveService>(new ActiveService());

  const [isVignetteModalVisible, setIsVignetteModalVisible] = useState(false);
  const [vignetteFormData, setVignetteFormData] = useState({
    vignetteStartDate: new Date(),
    vignetteExpiryDate: new Date(),
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
        console.log("Widgets map", widgetsMap);
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

  const options = [
    "Insurance",
    "ITP (Technical Inspection)",
    "Service & Maintenance",
    "Vignette",
  ];

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
    try {
      await saveCarWidgets(carId, updatedWidgets);
      setCarWidgets({ ...carWidgets, [carId]: updatedWidgets });
      fetchCarsAndWidgets();
    } catch (error) {
      console.error("Error saving widgets:", error);
      Alert.alert("Error", "Failed to save widgets.");
    }
  };

  const renderOption = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        if (!widgetExists(item)) {
          if (selectedCarId && item === "Insurance") {
            setIsInsuranceModalVisible(true);
            setOptionsModalVisible(false);
          } else if (selectedCarId && item === "ITP (Technical Inspection)") {
            setIsInspectionModalVisible(true);
            setOptionsModalVisible(false);
          } else if (selectedCarId && item === "Service & Maintenance") {
            setServiceModalVisible(true);
            setOptionsModalVisible(false);
          } else if (selectedCarId && item === "Vignette") {
            setIsVignetteModalVisible(true);
            setOptionsModalVisible(false);
          } else {
            addWidgetToCar(selectedCarId!.toString(), item);
            setOptionsModalVisible(false);
          }
        }
      }}
      style={styles.modalOption}
    >
      <Text style={styles.modalOptionText}>{item}</Text>
    </TouchableOpacity>
  );

  const carHasInsurance = (car: Car) => {
    console.log("Car insurance:", car.activeInsurance);
    return car.activeInsurance;
  };

  const carHasITP = (car: Car) => {
    console.log("Car inspection:", car.activeInspection);
    return car.activeInspection;
  };

  const carHasService = (car: Car) => {
    console.log("Car service:", car.activeService);
    return car.activeService;
  };

  const carHasVignette = (car: Car) => {
    return car.vignetteStartDate || car.vignetteExpiryDate;
  };

  const renderItem = ({ item }: { item: Car }) => {
    const widgets = carWidgets[item.id!.toString()] || [];
    return (
      <View style={styles.carContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.carTitle}>
            {item.make} {item.model} {item.year}
          </Text>
          <Text style={styles.carSubtitle}>{item.licensePlate}</Text>
        </View>
        <ScrollView>
          {widgets.map((widgetName, index) => {
            if (widgetName === "Insurance") {
              if (carHasInsurance(item)) {
                return <InsuranceWidget key={index} item={item} />;
              }
            } else if (widgetName === "ITP (Technical Inspection)") {
              if (carHasITP(item)) {
                return <ITPWidget key={index} item={item} />;
              }
            } else if (widgetName === "Service & Maintenance") {
              if (carHasService(item)) {
                return <ServiceWidget key={index} item={item} />;
              }
            } else if (widgetName === "Vignette") {
              if (carHasVignette(item)) {
                return <VignetteWidget key={index} item={item} />;
              }
            } else {
              return (
                <CustomWidget key={index} title={widgetName} progress={30} />
              );
            }
          })}
        </ScrollView>
        <OpacityButton
          title="Add new information"
          onPress={() => {
            setSelectedCarId(item.id!);
            setOptionsModalVisible(true);
          }}
        />
      </View>
    );
  };

  const updateWidgetsForCar = async (carId: string, widgetName: string) => {
    const widgets = carWidgets[carId] || [];
    if (!widgets.includes(widgetName)) {
      const updatedWidgets = [...widgets, widgetName];
      try {
        await saveCarWidgets(carId, updatedWidgets);
        setCarWidgets((prevState) => ({
          ...prevState,
          [carId]: updatedWidgets,
        }));
      } catch (error) {
        console.error("Error updating widgets:", error);
        Alert.alert("Error", "Failed to update widgets.");
      }
    }
  };

  const handleInsuranceFormSubmit = async () => {
    const token = await retrieveString("userToken");
    if (!token) {
      Alert.alert("Error", "User token not found.");
      return;
    }
    if (!selectedCarId) {
      Alert.alert("Error", "No car selected.");
      return;
    }
    const carToUpdateIndex = cars.findIndex((car) => car.id === selectedCarId);
    if (carToUpdateIndex === -1) {
      Alert.alert("Error", "Car not found.");
      return;
    }
    const updatedCar = {
      ...cars[carToUpdateIndex],
      activeInsurance: {
        ...insurance,
        carId: selectedCarId,
      },
    };
    try {
      console.log(
        `Updating insurance for carId: ${selectedCarId}: ${JSON.stringify(updatedCar.activeInsurance)}`,
      );
      await updateCarApiCall(updatedCar, token);
      Alert.alert("Success", "Insurance information updated successfully.");
      setIsInsuranceModalVisible(false);
      const newCars = [...cars];
      newCars[carToUpdateIndex] = updatedCar;
      setCars(newCars);

      updateWidgetsForCar(selectedCarId.toString(), "Insurance");
      fetchCarsAndWidgets();
    } catch (error) {
      console.error("Error updating insurance information:", error);
      Alert.alert("Error", "Failed to update insurance information.");
    }
  };

  const handleITPFormSubmit = async () => {
    const token = await retrieveString("userToken");
    if (!token) {
      Alert.alert("Error", "User token not found.");
      return;
    }
    if (!selectedCarId) {
      Alert.alert("Error", "No car selected.");
      return;
    }
    const carToUpdateIndex = cars.findIndex((car) => car.id === selectedCarId);
    if (carToUpdateIndex === -1) {
      Alert.alert("Error", "Car not found.");
      return;
    }
    const updatedCar = {
      ...cars[carToUpdateIndex],
      activeInspection: {
        ...inspection,
        carId: selectedCarId,
      },
    };
    try {
      console.log(
        `Updating inspection for carId: ${selectedCarId}: ${JSON.stringify(updatedCar.activeInspection)}`,
      );
      await updateCarApiCall(updatedCar, token);
      Alert.alert("Success", "ITP information updated successfully.");
      setIsInspectionModalVisible(false);
      const newCars = [...cars];
      newCars[carToUpdateIndex] = updatedCar;
      setCars(newCars);

      updateWidgetsForCar(
        selectedCarId.toString(),
        "ITP (Technical Inspection)",
      );
      fetchCarsAndWidgets();
    } catch (error) {
      console.error("Error updating ITP information:", error);
      Alert.alert("Error", "Failed to update ITP information.");
    }
  };

  const handleServiceFormSubmit = async () => {
    const token = await retrieveString("userToken");
    if (!token) {
      Alert.alert("Error", "User token not found.");
      return;
    }
    if (!selectedCarId) {
      Alert.alert("Error", "No car selected.");
      return;
    }
    const carToUpdateIndex = cars.findIndex((car) => car.id === selectedCarId);
    if (carToUpdateIndex === -1) {
      Alert.alert("Error", "Car not found.");
      return;
    }
    const updatedCar = {
      ...cars[carToUpdateIndex],
      activeService: {
        ...service,
        carId: selectedCarId,
      },
    };
    try {
      console.log(
        `Updating service for carId: ${selectedCarId}: ${JSON.stringify(updatedCar.activeService)}`,
      );
      await updateCarApiCall(updatedCar, token);
      Alert.alert("Success", "Service information updated successfully.");
      setServiceModalVisible(false);
      const newCars = [...cars];
      newCars[carToUpdateIndex] = updatedCar;
      setCars(newCars);

      updateWidgetsForCar(selectedCarId.toString(), "Service & Maintenance");
      fetchCarsAndWidgets();
    } catch (error) {
      console.error("Error updating service information:", error);
      Alert.alert("Error", "Failed to update service information.");
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
        visible={isOptionsModalVisible}
        options={options}
        onRequestClose={() => setOptionsModalVisible(false)}
        renderOption={renderOption}
      />

      <InsuranceFormModal
        animationType="none"
        transparent={true}
        visible={isInsuranceModalVisible}
        onRequestClose={() => setIsInsuranceModalVisible(false)}
        insurance={insurance}
        setInsurance={setInsurance}
        onSave={handleInsuranceFormSubmit}
      />

      <ITPFormModal
        animationType="none"
        transparent={true}
        visible={isInspectionModalVisible}
        onRequestClose={() => setIsInspectionModalVisible(false)}
        inspection={inspection}
        setInspection={setInspection}
        onSave={handleITPFormSubmit}
      />

      <ServiceFormModal
        animationType="none"
        transparent={true}
        visible={isServiceModalVisible}
        onRequestClose={() => setServiceModalVisible(false)}
        service={service}
        setService={setService}
        onSave={handleServiceFormSubmit}
      />

      {/* <ITPFormModal
        animationType="none"
        transparent={true}
        visible={isITPModalVisible}
        onRequestClose={() => setIsITPModalVisible(false)}
        ITPFormData={ITPFormData}
        setITPFormData={setITPFormData}
        onSave={handleITPFormSubmit}
      />

      <ServiceFormModal
        animationType="none"
        transparent={true}
        visible={isServiceModalVisible}
        onRequestClose={() => setServiceModalVisible(false)}
        serviceFormData={serviceFormData}
        setServiceFormData={setServiceFormData}
        onSave={handleServiceFormSubmit}
      />

      <VignetteFormModal
        animationType="none"
        transparent={true}
        visible={isVignetteModalVisible}
        onRequestClose={() => setIsVignetteModalVisible(false)}
        vignetteFormData={vignetteFormData}
        setVignetteFormData={setVignetteFormData}
        onSave={handleVignetteFormSubmit}
      /> */}
    </View>
  );
};

export default DashboardScreen;
