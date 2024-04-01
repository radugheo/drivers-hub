import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Car } from "../../models/Car.model";
import { addCarApiCall } from "../../api/auth-service";
import { useNavigation } from "@react-navigation/native";
import { retrieveString } from "../../utils/storage-handler";
import { styles } from "./AddCarScreen.styles";
import FormInputField from "../../components/FormInputField/FormInputField";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/TopBar/TopBar";
import FormDropdownField from "../../components/FormDropdownField/FormDropdownField";

export const AddCarScreen: React.FC = () => {
  const navigation = useNavigation();
  const [newCar, setNewCar] = useState<Car>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    licensePlate: "",
    ownerId: "",
  });

  const handleSaveCar = async () => {
    try {
      const token = await retrieveString("userToken");
      const ownerId = await retrieveString("userId");
      if (!ownerId) {
        console.log("Unable to retrieve user ID.");
        Alert.alert("Error", "Unable to retrieve user ID.");
        return;
      }
      console.log("Owner ID", ownerId);
      const carWithOwnerId = { ...newCar, ownerId: ownerId };
      console.log("New car", carWithOwnerId);
      const result = await addCarApiCall(carWithOwnerId, token);
      if (result) {
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const years = Array.from(
    new Array(new Date().getFullYear() - 1970),
    (val, index) => 1970 + index + 1,
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar title="Driver's Hub" />
      <ScrollView style={styles.container}>
        <Text style={styles.editField}>Make</Text>
        <FormInputField
          iconName="car"
          placeholder="Make"
          value={newCar.make}
          onChangeText={(make) => setNewCar((prev) => ({ ...prev, make }))}
        />
        <Text style={styles.editField}>Model</Text>
        <FormInputField
          iconName="car"
          placeholder="Model"
          value={newCar.model}
          onChangeText={(model) => setNewCar((prev) => ({ ...prev, model }))}
        />
        <Text style={styles.editField}>Year</Text>
        <FormDropdownField
          iconName="calendar"
          selectedValue={newCar.year.toString()}
          items={years.map((year) => ({
            label: year.toString(),
            value: year.toString(),
          }))}
          onValueChange={(year) =>
            setNewCar((prev) => ({ ...prev, year: parseInt(year) }))
          }
        />
        <Text style={styles.editField}>License Plate</Text>
        <FormInputField
          iconName="id-card"
          placeholder="License Plate"
          value={newCar.licensePlate}
          onChangeText={(licensePlate) =>
            setNewCar((prev) => ({ ...prev, licensePlate }))
          }
        />
        <OpacityButton title="Save" onPress={handleSaveCar} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCarScreen;
