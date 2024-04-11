import React, { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  LogBox,
} from "react-native";
import { styles } from "./ServiceScreen.styles";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/app-navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "../../components/TopBar/TopBar";
import FormInputField from "../../components/FormInputField/FormInputField";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import { removeCarWidgets, retrieveString } from "../../utils/storage-handler";
import { updateCarApiCall } from "../../api/api-service";
import DateInputField from "../../components/DateInputField/DateInputField";
import { Car } from "../../models/Car.model";
import NumberInputField from "../../components/NumberInputField/NumberInputField";
import FormTextAreaField from "../../components/FormTextAreaField/FormTextAreaField";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

type ServiceScreenRouteProp = RouteProp<RootStackParamList, "ServiceScreen">;
type ServiceScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ServiceScreen"
>;

interface ServiceScreenProps {
  route: ServiceScreenRouteProp;
  navigation: ServiceScreenNavigationProp;
}

const ServiceScreen: React.FC<ServiceScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [car, setCar] = useState<Car>(item);

  const handleSaveService = async () => {
    try {
      for (const key in car) {
        if (car[key as keyof Car] === "") {
          (car[key as keyof Car] as Car[keyof Car] | null) = null;
        }
      }
      const token = await retrieveString("userToken");
      const result = await updateCarApiCall(car, token);
      if (result) {
        Alert.alert("Success", "Car updated successfully.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating the car:", error);
    }
  };

  const handleDeleteService = async () => {
    try {
      const token = await retrieveString("userToken");
      const result = await updateCarApiCall(
        {
          id: car.id,
          lastService: null,
          nextService: null,
          lastServiceMileage: null,
          nextServiceMileageInterval: null,
          serviceCompany: null,
        },
        token
      );
      if (result) {
        Alert.alert("Success", "Service details have been deleted.");
        await removeCarWidgets(car.id!.toString());
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the Service details:", error);
    }
  };

  const handleServiceInputChange = (name: keyof Car, value: string | null) => {
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar title="Service Details" />
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.editField}>Service Company</Text>
            <FormInputField
              iconName="building"
              placeholder={car.serviceCompany || "Service Company"}
              value={car.serviceCompany || ""}
              onChangeText={(serviceCompany) =>
                handleServiceInputChange("serviceCompany", serviceCompany)
              }
            />

            <Text style={styles.editField}>Last mantainance</Text>
            <DateInputField
              iconName="calendar"
              placeholder="Start Date"
              value={new Date(car.lastService || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("lastService", date.toISOString())
              }
            />

            <Text style={styles.editField}>Next estimated maintainance</Text>
            <DateInputField
              iconName="calendar"
              placeholder="End Date"
              value={new Date(car.nextService || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("nextService", date.toISOString())
              }
            />

            <Text style={styles.editField}>Mileage</Text>
            <NumberInputField
              iconName="tachometer-alt"
              placeholder={car.lastServiceMileage?.toString() || "Mileage"}
              value={car.lastServiceMileage?.toString() || null}
              onChangeText={(lastServiceMileage) =>
                handleServiceInputChange(
                  "lastServiceMileage",
                  lastServiceMileage
                )
              }
            />

            <Text style={styles.editField}>Next service in: </Text>
            <NumberInputField
              iconName="tachometer-alt"
              placeholder={
                car.nextServiceMileageInterval?.toString() || "Mileage"
              }
              value={car.nextServiceMileageInterval?.toString() || null}
              onChangeText={(nextServiceMileageInterval) =>
                handleServiceInputChange(
                  "nextServiceMileageInterval",
                  nextServiceMileageInterval
                )
              }
            />

            <Text style={styles.editField}>Service Details</Text>
            <FormTextAreaField
              iconName="file"
              placeholder={car.serviceDetails || "Service Details"}
              value={car.serviceDetails || ""}
              onChangeText={(serviceDetails) =>
                handleServiceInputChange("serviceDetails", serviceDetails)
              }
            />
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <OpacityButton title="Save" onPress={handleSaveService} />
            <OpacityButton title="Delete" onPress={handleDeleteService} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ServiceScreen;
