import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Car } from "../../models/Car.model";
import { addCarApiCall } from "../../api/auth-service";
import { useNavigation } from "@react-navigation/native";
import { retrieveString } from "../../utils/storage-handler";
import { styles } from "./AddCarScreen.styles";
import FormInputField from "../../components/FormInputField/FormInputField";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import OpacityButton from "../../components/OpacityButton/OpacityButton";

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

  return (
    <View style={styles.container}>
      <PageTitle title="Add Car" />
      <FormInputField
        iconName="car"
        placeholder="Make"
        value={newCar.make}
        onChangeText={(make) => setNewCar((prev) => ({ ...prev, make }))}
      />
      <FormInputField
        iconName="car"
        placeholder="Model"
        value={newCar.model}
        onChangeText={(model) => setNewCar((prev) => ({ ...prev, model }))}
      />
      <FormInputField
        iconName="calendar"
        placeholder="Year"
        value={newCar.year.toString()}
        onChangeText={(year) =>
          setNewCar((prev) => ({ ...prev, year: parseInt(year) }))
        }
      />
      <FormInputField
        iconName="id-card"
        placeholder="License Plate"
        value={newCar.licensePlate}
        onChangeText={(licensePlate) =>
          setNewCar((prev) => ({ ...prev, licensePlate }))
        }
      />
      <OpacityButton title="Save" onPress={handleSaveCar} />
    </View>
  );
};

export default AddCarScreen;
