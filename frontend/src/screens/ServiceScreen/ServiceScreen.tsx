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
import { removeCarWidget, retrieveString } from "../../utils/storage-handler";
import { updateCarApiCall } from "../../api/api-service";
import DateInputField from "../../components/DateInputField/DateInputField";
import { Car } from "../../models/Car.model";
import NumberInputField from "../../components/NumberInputField/NumberInputField";
import FormTextAreaField from "../../components/FormTextAreaField/FormTextAreaField";
import { ActiveService } from "../../models/Active-Service.model";
import FormDropdownField from "../../components/FormDropdownField/FormDropdownField";

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
  const { carItem, serviceItem } = route.params;
  const [car, setCar] = useState<Car>(carItem);
  const [service, setService] = useState(serviceItem);

  const handleSaveService = async () => {
    try {
      for (const key in service) {
        if (service[key as keyof ActiveService] === "") {
          (service[key as keyof ActiveService] as
            | ActiveService[keyof ActiveService]
            | null) = null;
        }
      }
      console.log("Updating service with ID: ", service.id);
      console.log("Updating car with ID: ", car.id);
      const updatedCar = { ...car, activeService: service };
      const token = await retrieveString("userToken");
      const resultCarCall = await updateCarApiCall(updatedCar, token);
      if (resultCarCall) {
        Alert.alert("Success", "Service details have been updated.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating the Service details:", error);
    }
  };

  const handleDeleteService = async () => {
    try {
      const updatedCar = { ...car, activeService: null };
      console.log("Deleting service with ID: ", service.id);
      console.log("Updating car with ID: ", car.id);
      const token = await retrieveString("userToken");
      const resultCarCall = await updateCarApiCall(updatedCar, token);
      if (resultCarCall) {
        Alert.alert("Success", "Service details have been deleted.");
        await removeCarWidget(car.id!.toString(), "Service & Maintenance");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the Service details:", error);
    }
  };

  const handleServiceInputChange = (
    name: keyof ActiveService,
    value: string | null,
  ) => {
    setService((prevService) => ({ ...prevService, [name]: value }));
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
              placeholder={service.companyName || "Service Company"}
              value={service.companyName || ""}
              onChangeText={(companyName) =>
                handleServiceInputChange("companyName", companyName)
              }
            />

            <Text style={styles.editField}>Last mantainance</Text>
            <DateInputField
              iconName="calendar"
              placeholder="Start Date"
              value={new Date(service.validFrom || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("validFrom", date.toISOString())
              }
            />

            <Text style={styles.editField}>Next estimated maintainance</Text>
            <DateInputField
              iconName="calendar"
              placeholder="End Date"
              value={new Date(service.validUntil || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("validUntil", date.toISOString())
              }
            />

            <Text style={styles.editField}>Mileage</Text>
            <NumberInputField
              iconName="tachometer-alt"
              placeholder={service.serviceMileage?.toString() || "Mileage"}
              value={service.serviceMileage || null}
              onChangeText={(serviceMileage) =>
                handleServiceInputChange("serviceMileage", serviceMileage)
              }
            />

            <Text style={styles.editField}>Next service in: </Text>
            <FormDropdownField
              iconName="tachometer-alt"
              selectedValue={service.mileageInterval?.toString() || ""}
              items={[
                { label: "10,000", value: "10000" },
                { label: "15,000", value: "15000" },
              ]}
              onValueChange={(mileageInterval) =>
                handleServiceInputChange("mileageInterval", mileageInterval)
              }
            />

            <Text style={styles.editField}>Service Details</Text>
            <FormTextAreaField
              iconName="file"
              placeholder={service.description || "Service Details"}
              value={service.description || ""}
              onChangeText={(description) =>
                handleServiceInputChange("description", description)
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
