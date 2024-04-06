import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
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
import FormInputField from "../../components/FormInputField/FormInputField";
import DateInputField from "../../components/DateInputField/DateInputField";
import PageTitle from "../../components/PageTitle/PageTitle";

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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = await retrieveString("userToken");
        if (token) {
          const fetchedCars: Car[] = await getCarsApiCall(token);
          setCars(fetchedCars);
          fetchedCars.forEach(async (car) => {
            const widgets = await retrieveCarWidgets(car.id!.toString());
            setCarWidgets((prevWidgets) => ({
              ...prevWidgets,
              [car.id!.toString()]: widgets,
            }));
          });
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

  const options = ["Insurance", "Service", "Accident", "Mileage"];

  const addWidgetToCar = async (carId: string, widgetName: string) => {
    const currentWidgets = carWidgets[carId] || [];
    if (currentWidgets.includes(widgetName)) {
      Alert.alert("Duplicate Widget", "This widget has already been added.");
      return;
    }
    const updatedWidgets = [...currentWidgets, widgetName];
    setCarWidgets({ ...carWidgets, [carId]: updatedWidgets });
    await saveCarWidgets(carId, updatedWidgets);
  };

  const renderOption = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        if (selectedCarId && item === "Insurance") {
          setIsInsuranceModalVisible(true);
          setServiceModalVisible(false);
          addWidgetToCar(selectedCarId.toString(), item);
        } else if (selectedCarId) {
          addWidgetToCar(selectedCarId.toString(), item);
          setServiceModalVisible(false);
        }
      }}
      style={styles.modalOption}
    >
      <Text style={styles.modalOptionText}>{item}</Text>
    </TouchableOpacity>
  );

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
          {widgets.map((widgetName, index) => (
            <CustomWidget key={index} title={widgetName} progress={30} />
          ))}
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
      const result = await updateCarApiCall(updatedCar, token);
      Alert.alert("Success", "Car insurance information updated successfully.");
      setIsInsuranceModalVisible(false);
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
      <Modal
        animationType="none"
        transparent={true}
        visible={isServiceModalVisible}
        onRequestClose={() => setServiceModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setServiceModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={isInsuranceModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsInsuranceModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsInsuranceModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalFormContainer}>
              <PageTitle title="Insurance Information" />
              <ScrollView>
                <Text style={styles.editField}>Insurance Start Date</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Insurance Start Date"
                  value={insuranceFormData.insuranceStartDate}
                  onChange={(selectedDate) => {
                    setInsuranceFormData((prevData) => ({
                      ...prevData,
                      insuranceStartDate: selectedDate || new Date(),
                    }));
                  }}
                />

                <Text style={styles.editField}>Insurance End Date</Text>
                <DateInputField
                  iconName="calendar-alt"
                  placeholder="Insurance Expiry Date"
                  value={insuranceFormData.insuranceExpiryDate}
                  onChange={(selectedDate) => {
                    setInsuranceFormData((prevData) => ({
                      ...prevData,
                      insuranceExpiryDate: selectedDate || new Date(),
                    }));
                  }}
                />

                <Text style={styles.editField}>Insurance Policy Number</Text>
                <FormInputField
                  iconName="file-contract"
                  placeholder="Insurance Policy Number"
                  value={insuranceFormData.insurancePolicyNumber}
                  onChangeText={(text) => {
                    setInsuranceFormData((prevData) => ({
                      ...prevData,
                      insurancePolicyNumber: text,
                    }));
                  }}
                />

                <Text style={styles.editField}>Insurance Company</Text>
                <FormInputField
                  iconName="building"
                  placeholder="Insurance Company"
                  value={insuranceFormData.insuranceCompany}
                  onChangeText={(text) => {
                    setInsuranceFormData((prevData) => ({
                      ...prevData,
                      insuranceCompany: text,
                    }));
                  }}
                />
              </ScrollView>
              <OpacityButton
                title="Submit"
                onPress={handleInsuranceFormSubmit}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DashboardScreen;
