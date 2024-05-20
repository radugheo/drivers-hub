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
import { styles } from "./ITPScreen.styles";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/app-navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "../../components/TopBar/TopBar";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import { removeCarWidget, retrieveString } from "../../utils/storage-handler";
import { updateCarApiCall } from "../../api/api-service";
import DateInputField from "../../components/DateInputField/DateInputField";
import { Car } from "../../models/Car.model";
import { ActiveInspection } from "../../models/Active-Inspection.model";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

type ITPScreenRouteProp = RouteProp<RootStackParamList, "ITPScreen">;
type ITPScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ITPScreen"
>;

interface ITPScreenProps {
  route: ITPScreenRouteProp;
  navigation: ITPScreenNavigationProp;
}

const ITPScreen: React.FC<ITPScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { carItem, inspectionItem } = route.params;
  const [car, setCar] = useState<Car>(carItem);
  const [inspection, setInspection] =
    useState<ActiveInspection>(inspectionItem);

  const handleSaveITP = async () => {
    try {
      for (const key in inspection) {
        if (inspection[key as keyof ActiveInspection] === null) {
          (inspection[key as keyof ActiveInspection] as
            | ActiveInspection[keyof ActiveInspection]
            | null) = null;
        }
      }
      console.log("Updating inspection with ID: ", inspection.id);
      console.log("Udating car with ID: ", car.id);
      const updatedCar = { ...car, activeInspection: inspection };
      const token = await retrieveString("userToken");
      const resultCarCall = await updateCarApiCall(updatedCar, token);
      if (resultCarCall) {
        Alert.alert("Success", "Car inspection updated successfully.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating the car inspection:", error);
    }
  };

  const handleDeleteITP = async () => {
    try {
      const updatedCar = { ...car, activeInspection: null };
      const token = await retrieveString("userToken");
      const resultCarCall = await updateCarApiCall(updatedCar, token);
      if (resultCarCall) {
        Alert.alert("Success", "ITP details have been deleted.");
        await removeCarWidget(car.id!.toString(), "ITP (Technical Inspection)");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the ITP details:", error);
    }
  };

  const handleServiceInputChange = (
    name: keyof ActiveInspection,
    value: string | null,
  ) => {
    setInspection((prevInspection) => ({ ...prevInspection, [name]: value }));
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar title="ITP Details" />
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
              value={new Date(inspection.validFrom || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("validFrom", date.toISOString())
              }
            />

            <Text style={styles.editField}>Valid to</Text>
            <DateInputField
              iconName="calendar"
              placeholder="End Date"
              value={
                new Date(inspection.validUntil || new Date().toISOString())
              }
              onChange={(date) =>
                handleServiceInputChange("validUntil", date.toISOString())
              }
            />
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <OpacityButton title="Save" onPress={handleSaveITP} />
            <OpacityButton title="Delete" onPress={handleDeleteITP} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ITPScreen;
