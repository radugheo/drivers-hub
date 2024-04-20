import React, { useState, useCallback } from "react";
import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { styles } from "./DashboardScreen.styles";
import {
  addInsuranceApiCall,
  getCarsApiCall,
  updateCarApiCall,
} from "../../api/api-service";
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
import VignetteFormModal from "../../components/VignetteFormModal/VignetteFormModal";
import { ActiveInsurance } from "../../models/Active-Insurance.model";

type FormData = { [key: string]: any };
type SetIsModalVisibleFunction = (isVisible: boolean) => void;
type WidgetName = string;

type HandleSubmitFormParams = {
  formData?: FormData;
  setIsModalVisible: SetIsModalVisibleFunction;
  widgetName: WidgetName;
};

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

  const [isITPModalVisible, setIsITPModalVisible] = useState(false);
  const [ITPFormData, setITPFormData] = useState({
    lastInspection: new Date(),
    nextInspection: new Date(),
  });

  const [isServiceModalVisible, setServiceModalVisible] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({
    lastService: new Date(),
    nextService: new Date(),
    lastServiceMileage: 0,
    nextServiceMileageInterval: 0,
    serviceCompany: "",
    serviceDetails: "",
  });

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
    setCarWidgets({ ...carWidgets, [carId]: updatedWidgets });
    await saveCarWidgets(carId, updatedWidgets);
  };

  const renderOption = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        if (!widgetExists(item)) {
          if (selectedCarId && item === "Insurance") {
            setIsInsuranceModalVisible(true);
            setOptionsModalVisible(false);
          } else if (selectedCarId && item === "ITP (Technical Inspection)") {
            setIsITPModalVisible(true);
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
    return car.lastInspection || car.nextInspection;
  };

  const carHasService = (car: Car) => {
    return (
      car.lastService ||
      car.nextService ||
      car.lastServiceMileage ||
      car.nextServiceMileageInterval ||
      car.serviceCompany ||
      car.serviceDetails
    );
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
    const carToUpdate = cars.find((car) => car.id === selectedCarId);
    if (!carToUpdate) {
      Alert.alert("Error", "Car not found.");
      return;
    }
    const updatedCar = {
      ...carToUpdate,
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

  // const handleSubmitForm = async ({
  //   formData,
  //   setIsModalVisible,
  //   widgetName,
  // }: HandleSubmitFormParams) => {
  //   if (!selectedCarId) {
  //     Alert.alert("Error", "No car selected.");
  //     return;
  //   }
  //   const token = await retrieveString("userToken");
  //   if (!token) {
  //     Alert.alert("Error", "User token not found.");
  //     return;
  //   }
  //   const carToUpdate = cars.find((car) => car.id === selectedCarId);
  //   if (!carToUpdate) {
  //     Alert.alert("Error", "Car not found.");
  //     return;
  //   }
  //   const updatedCar = {
  //     ...carToUpdate,
  //     ...formData,
  //   };
  //   try {
  //     await updateCarApiCall(updatedCar, token);
  //     Alert.alert(
  //       "Success",
  //       `Car ${widgetName} information updated successfully.`
  //     );
  //     setIsModalVisible(false);
  //     setCars(cars.map((car) => (car.id === selectedCarId ? updatedCar : car)));
  //     if (!carWidgets[selectedCarId.toString()].includes(widgetName)) {
  //       const updatedWidgets = [
  //         ...carWidgets[selectedCarId.toString()],
  //         widgetName,
  //       ];
  //       setCarWidgets({
  //         ...carWidgets,
  //         [selectedCarId.toString()]: updatedWidgets,
  //       });
  //       saveCarWidgets(selectedCarId.toString(), updatedWidgets);
  //     }
  //   } catch (error) {
  //     console.error(`Error updating ${widgetName} information:`, error);
  //     Alert.alert("Error", `Failed to update ${widgetName} information.`);
  //   }
  // };

  // const handleITPFormSubmit = async () => {
  //   await handleSubmitForm({
  //     formData: ITPFormData,
  //     setIsModalVisible: setIsITPModalVisible,
  //     widgetName: "ITP (Technical Inspection)",
  //   });
  // };

  // const handleServiceFormSubmit = async () => {
  //   await handleSubmitForm({
  //     formData: serviceFormData,
  //     setIsModalVisible: setServiceModalVisible,
  //     widgetName: "Service & Maintenance",
  //   });
  // };

  // const handleVignetteFormSubmit = async () => {
  //   await handleSubmitForm({
  //     formData: vignetteFormData,
  //     setIsModalVisible: setIsVignetteModalVisible,
  //     widgetName: "Vignette",
  //   });
  // };

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
