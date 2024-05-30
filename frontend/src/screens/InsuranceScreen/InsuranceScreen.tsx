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
import { removeCarWidget, retrieveString } from "../../utils/storage-handler";
import { updateCarApiCall } from "../../api/api-service";
import DateInputField from "../../components/DateInputField/DateInputField";
import { Car } from "../../models/Car.model";
import PictureModal from "../../components/PictureModal/PictureModal";
import PictureInputField from "../../components/PictureInputField/PictureInputField";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActiveInsurance } from "../../models/Active-Insurance.model";
import { uploadPictureToS3Bucket } from "../../utils/picture-handler";

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
  const { carItem, insuranceItem } = route.params;
  const [car, setCar] = useState<Car>(carItem);
  const [insurance, setInsurance] = useState<ActiveInsurance>(insuranceItem);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSaveInsurance = async () => {
    try {
      for (const key in insurance) {
        if (insurance[key as keyof ActiveInsurance] === "") {
          (insurance[key as keyof ActiveInsurance] as
            | ActiveInsurance[keyof ActiveInsurance]
            | null) = null;
        }
      }
      console.log("Updating insurance with ID:", insurance.id);
      console.log("Updating car with ID:", car.id);
      let pictureUrl: string = "";
      try {
        if (insurance.picture) {
          pictureUrl = await uploadPictureToS3Bucket(insurance.picture);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to upload insurance picture.");
        return;
      }
      const updatedCar = {
        ...car,
        activeInsurance: { ...insurance, picture: pictureUrl, carId: car.id },
      };
      const token = await retrieveString("userToken");
      const resultCarCall = await updateCarApiCall(updatedCar, token);
      if (resultCarCall) {
        Alert.alert("Success", "Car insurance updated successfully.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating the car insurance:", error);
    }
  };

  const handleDeleteInsurance = async () => {
    try {
      const updatedCar = { ...car, activeInsurance: null };
      const token = await retrieveString("userToken");
      const resultCarCall = await updateCarApiCall(updatedCar, token);
      if (resultCarCall) {
        Alert.alert("Success", "Insurance details have been deleted.");
        await removeCarWidget(car.id!.toString(), "Insurance");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the insurance details:", error);
    }
  };

  const handleServiceInputChange = (
    name: keyof ActiveInsurance,
    value: string | null,
  ) => {
    setInsurance((prevInsurance) => ({ ...prevInsurance, [name]: value }));
  };

  const handleImageSelect = (base64Image: string | null) => {
    if (base64Image === null) {
      Alert.alert("Image Removed", "Insurance picture has been removed.");
      handleServiceInputChange("picture", null);
      return;
    }
    handleServiceInputChange("picture", base64Image);
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
              placeholder={insurance.company || ""}
              value={insurance.company || ""}
              onChangeText={(company) =>
                handleServiceInputChange("company", company)
              }
            />

            <Text style={styles.editField}>Policy Number</Text>
            <FormInputField
              iconName="file"
              placeholder={insurance.policyNumber || ""}
              value={insurance.policyNumber || ""}
              onChangeText={(policyNumber) =>
                handleServiceInputChange("policyNumber", policyNumber)
              }
            />

            <Text style={styles.editField}>Valid from</Text>
            <DateInputField
              iconName="calendar"
              placeholder="Start Date"
              value={new Date(insurance.validFrom || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("validFrom", date.toISOString())
              }
            />

            <Text style={styles.editField}>Valid to</Text>
            <DateInputField
              iconName="calendar"
              placeholder="End Date"
              value={new Date(insurance.validUntil || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("validUntil", date.toISOString())
              }
            />

            <Text style={styles.editField}>Insurance Picture</Text>
            {insurance.picture ? (
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
                showDeleteButton={true}
                onImageSelect={handleImageSelect}
              />
            )}
          </ScrollView>
          <PictureModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            imageData={insurance.picture || ""}
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
