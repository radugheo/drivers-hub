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
import { removeCarWidget, retrieveString } from "../../utils/storage-handler";
import { updateCarApiCall } from "../../api/api-service";
import DateInputField from "../../components/DateInputField/DateInputField";
import { Car } from "../../models/Car.model";
import { ActiveVignette } from "../../models/Active-Vignette.model";
import NumberInputField from "../../components/NumberInputField/NumberInputField";

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
  const { carItem, vignetteItem } = route.params;
  const [car, setCar] = useState<Car>(carItem);
  const [vignette, setVignette] = useState<ActiveVignette>(vignetteItem);

  const handleSaveVignette = async () => {
    try {
      for (const key in vignette) {
        if (vignette[key as keyof ActiveVignette] === null) {
          (vignette[key as keyof ActiveVignette] as
            | ActiveVignette[keyof ActiveVignette]
            | null) = null;
        }
      }
      console.log("Updating vignette with ID: ", vignette.id);
      console.log("Udating car with ID: ", car.id);
      const updatedCar = { ...car, activeVignette: vignette };
      const token = await retrieveString("userToken");
      const resultCarCall = await updateCarApiCall(updatedCar, token);
      if (resultCarCall) {
        Alert.alert("Success", "Car vignette updated successfully.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating the car vignette:", error);
    }
  };

  const handleDeleteVignette = async () => {
    try {
      const updatedCar = { ...car, activeVignette: null };
      const token = await retrieveString("userToken");
      const resultCarCall = await updateCarApiCall(updatedCar, token);
      if (resultCarCall) {
        Alert.alert("Success", "Vignette details have been deleted.");
        await removeCarWidget(car.id!.toString(), "Vignette");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the vignette details:", error);
    }
  };

  const handleServiceInputChange = (
    name: keyof ActiveVignette,
    value: string | null,
  ) => {
    setVignette((prevVignette) => ({ ...prevVignette, [name]: value }));
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
              value={new Date(vignette.validFrom || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("validFrom", date.toISOString())
              }
            />

            <Text style={styles.editField}>Valid to</Text>
            <DateInputField
              iconName="calendar"
              placeholder="End Date"
              value={new Date(vignette.validUntil || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("validUntil", date.toISOString())
              }
            />

            <Text style={styles.editField}>Cost</Text>
            <NumberInputField
              iconName="money-bill"
              placeholder={vignette.price?.toString() || "Cost"}
              value={vignette.price || null}
              onChangeText={(price) => handleServiceInputChange("price", price)}
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
