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
  TouchableOpacity,
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
import PictureModal from "../../components/PictureModal/PictureModal";
import PictureInputField from "../../components/PictureInputField/PictureInputField";
import { FontAwesome5 } from "@expo/vector-icons";

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
  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleServiceInputChange = (name: keyof Car, value: string | null) => {
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleImageSelect = (base64Image: string | null) => {
    if (base64Image === null) {
      Alert.alert("Image Removed", "Insurance picture has been removed.");
      handleServiceInputChange("insurancePicture", null);
      return;
    }
    handleServiceInputChange("insurancePicture", base64Image);
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

            <Text style={styles.editField}>Valid from</Text>
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

            <Text style={styles.editField}>Valid to</Text>
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
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.viewImageButton}
                >
                  <FontAwesome5 name="camera" size={24} color="white" />
                  <Text style={styles.viewImageButtonText}>View Image</Text>
                  <TouchableOpacity onPress={() => handleImageSelect(null)}>
                    <FontAwesome5 name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ) : (
              <PictureInputField
                iconName="camera"
                title="Select or Take a Picture"
                onImageSelect={handleImageSelect}
              />
            )}
          </ScrollView>
          <PictureModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            imageData={car.insurancePicture || ""}
          />
          <View style={styles.buttonsContainer}>
            <OpacityButton title="Save" onPress={handleSaveInsurance} />
            <OpacityButton title="Delete" onPress={handleDeleteInsurance} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default InsuranceScreen;
