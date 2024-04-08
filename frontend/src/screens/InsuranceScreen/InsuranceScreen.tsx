import React, { useState } from "react";
import {
  Text,
  Image,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  LogBox,
} from "react-native";
import { styles } from "./InsuranceScreen.styles";
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

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

type InsuranceScreenRouteProp = RouteProp<
  RootStackParamList,
  "InsuranceScreen"
>;
type InsuranceScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InsuranceScreen"
>;

interface InsuranceScreenProps {
  route: InsuranceScreenRouteProp;
  navigation: InsuranceScreenNavigationProp;
}

const InsuranceScreen: React.FC<InsuranceScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [car, setCar] = useState<Car>(item);

  const handleSaveInsurance = async () => {
    try {
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

  const handleDeleteInsurance = async () => {
    try {
      const token = await retrieveString("userToken");
      const result = await updateCarApiCall(
        {
          id: car.id,
          insuranceCompany: null,
          insurancePolicyNumber: null,
          insuranceStartDate: null,
          insuranceExpiryDate: null,
          insurancePicture: null,
        },
        token,
      );
      if (result) {
        Alert.alert("Success", "Insurance details have been deleted.");
        await removeCarWidgets(car.id!.toString());
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the insurance details:", error);
    }
  };

  const handleServiceInputChange = (name: keyof Car, value: string) => {
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar title="Insurance Details" />
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.editField}>Company</Text>
            <FormInputField
              iconName="building"
              placeholder={car.insuranceCompany || ""}
              value={car.insuranceCompany || ""}
              onChangeText={(insuranceCompany) =>
                handleServiceInputChange("insuranceCompany", insuranceCompany)
              }
            />

            <Text style={styles.editField}>Policy Number</Text>
            <FormInputField
              iconName="file"
              placeholder={car.insurancePolicyNumber || ""}
              value={car.insurancePolicyNumber || ""}
              onChangeText={(insurancePolicyNumber) =>
                handleServiceInputChange(
                  "insurancePolicyNumber",
                  insurancePolicyNumber,
                )
              }
            />

            <Text style={styles.editField}>Start Date</Text>
            <DateInputField
              iconName="calendar"
              placeholder="Start Date"
              value={
                new Date(car.insuranceStartDate || new Date().toISOString())
              }
              onChange={(date) =>
                handleServiceInputChange(
                  "insuranceStartDate",
                  date.toISOString(),
                )
              }
            />

            <Text style={styles.editField}>End Date</Text>
            <DateInputField
              iconName="calendar"
              placeholder="End Date"
              value={
                new Date(car.insuranceExpiryDate || new Date().toISOString())
              }
              onChange={(date) =>
                handleServiceInputChange(
                  "insuranceExpiryDate",
                  date.toISOString(),
                )
              }
            />

            <Text style={styles.editField}>Insurance Picture</Text>
            {car.insurancePicture ? (
              <Image
                source={{
                  uri: `data:image/png;base64,${car.insurancePicture}`,
                }}
                style={styles.insuranceImage}
              />
            ) : (
              <Text>No image available</Text>
            )}
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <OpacityButton title="Save car" onPress={handleSaveInsurance} />
            <OpacityButton title="Delete car" onPress={handleDeleteInsurance} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default InsuranceScreen;
