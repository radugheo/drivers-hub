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
import { styles } from "./VignetteScreen.styles";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/app-navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "../../components/TopBar/TopBar";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import { removeCarWidgets, retrieveString } from "../../utils/storage-handler";
import { updateCarApiCall } from "../../api/api-service";
import DateInputField from "../../components/DateInputField/DateInputField";
import { Car } from "../../models/Car.model";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

type VignetteScreenRouteProp = RouteProp<RootStackParamList, "VignetteScreen">;
type VignetteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VignetteScreen"
>;

interface VignetteScreenProps {
  route: VignetteScreenRouteProp;
  navigation: VignetteScreenNavigationProp;
}

const VignetteScreen: React.FC<VignetteScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [car, setCar] = useState<Car>(item);

  const handleSaveVignette = async () => {
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

  const handleDeleteVignette = async () => {
    try {
      const token = await retrieveString("userToken");
      const result = await updateCarApiCall(
        {
          id: car.id,
          vignetteStartDate: null,
          vignetteExpiryDate: null,
        },
        token,
      );
      if (result) {
        Alert.alert("Success", "Vignette details have been deleted.");
        await removeCarWidgets(car.id!.toString());
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the Vignette details:", error);
    }
  };

  const handleServiceInputChange = (name: keyof Car, value: string | null) => {
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar title="Vignette Details" />
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.editField}>Valid from</Text>
            <DateInputField
              iconName="calendar"
              placeholder="Start Date"
              value={
                new Date(car.vignetteStartDate || new Date().toISOString())
              }
              onChange={(date) =>
                handleServiceInputChange(
                  "vignetteStartDate",
                  date.toISOString(),
                )
              }
            />

            <Text style={styles.editField}>Valid to</Text>
            <DateInputField
              iconName="calendar"
              placeholder="End Date"
              value={
                new Date(car.vignetteExpiryDate || new Date().toISOString())
              }
              onChange={(date) =>
                handleServiceInputChange(
                  "vignetteExpiryDate",
                  date.toISOString(),
                )
              }
            />
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <OpacityButton title="Save" onPress={handleSaveVignette} />
            <OpacityButton title="Delete" onPress={handleDeleteVignette} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default VignetteScreen;
