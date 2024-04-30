import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Car } from "../../models/Car.model";
import { addCarApiCall } from "../../api/api-service";
import { useNavigation } from "@react-navigation/native";
import { retrieveString } from "../../utils/storage-handler";
import { styles } from "./AddCarScreen.styles";
import FormInputField from "../../components/FormInputField/FormInputField";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/TopBar/TopBar";
import FormDropdownField from "../../components/FormDropdownField/FormDropdownField";
import NumberInputField from "../../components/NumberInputField/NumberInputField";
import { formatLicensePlate } from "../../utils/format-text";
import FormAuthField from "../../components/FormAuthField/FormAuthField";

export const AddCarScreen: React.FC = () => {
  const navigation = useNavigation();
  const [newCar, setNewCar] = useState<Car>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    fuel: "",
    transmission: "",
    vin: "",
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
      carWithOwnerId.licensePlate = formatLicensePlate(
        carWithOwnerId.licensePlate,
      );
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
    <View style={styles.mainContainer}>
      <TopBar title="Add new car" />
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.editField}>Make</Text>
            <FormInputField
              iconName="car"
              placeholder="Make"
              value={newCar.make}
              onChangeText={(make) => setNewCar((prev) => ({ ...prev, make }))}
            />

            <Text style={styles.editField}>Model</Text>
            <FormInputField
              iconName="car-side"
              placeholder="Model"
              value={newCar.model}
              onChangeText={(model) =>
                setNewCar((prev) => ({ ...prev, model }))
              }
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
            <FormAuthField
              iconName="window-maximize"
              placeholder="License Plate"
              value={newCar.licensePlate}
              onChangeText={(licensePlate) =>
                setNewCar((prev) => ({
                  ...prev,
                  licensePlate: licensePlate,
                }))
              }
            />

            <Text style={styles.editField}>Mileage (km)</Text>
            <NumberInputField
              iconName="tachometer-alt"
              placeholder="Mileage"
              value={newCar.mileage?.toString() || ""}
              onChangeText={(mileage) =>
                setNewCar((prev) => ({ ...prev, mileage: parseInt(mileage) }))
              }
            />

            <Text style={styles.editField}>Fuel</Text>
            <FormDropdownField
              iconName="gas-pump"
              selectedValue={newCar.fuel || ""}
              items={[
                { label: "Gasoline", value: "Gasoline" },
                { label: "Diesel", value: "Diesel" },
                { label: "Electric", value: "Electric" },
                { label: "Hybrid", value: "Hybrid" },
              ]}
              onValueChange={(fuel) => setNewCar((prev) => ({ ...prev, fuel }))}
            />

            <Text style={styles.editField}>Transmission</Text>
            <FormDropdownField
              iconName="wrench"
              selectedValue={newCar.transmission || ""}
              items={[
                { label: "Manual", value: "Manual" },
                { label: "Automatic", value: "Automatic" },
              ]}
              onValueChange={(transmission) =>
                setNewCar((prev) => ({ ...prev, transmission }))
              }
            />

            <Text style={styles.editField}>Displacement (cc)</Text>
            <NumberInputField
              iconName="cog"
              placeholder="Displacement"
              value={newCar.displacement?.toString()!}
              onChangeText={(displacement) =>
                setNewCar((prev) => ({
                  ...prev,
                  displacement: parseInt(displacement),
                }))
              }
            />

            <Text style={styles.editField}>Horsepower (hp)</Text>
            <NumberInputField
              iconName="horse"
              placeholder="Horsepower"
              value={newCar.horsepower?.toString()!}
              onChangeText={(horsepower) =>
                setNewCar((prev) => ({
                  ...prev,
                  horsepower: parseInt(horsepower),
                }))
              }
            />

            <Text style={styles.editField}>VIN</Text>
            <FormInputField
              iconName="ticket-alt"
              placeholder="VIN"
              value={newCar.vin?.toString()!}
              onChangeText={(vin) => setNewCar((prev) => ({ ...prev, vin }))}
            />
          </ScrollView>
          <OpacityButton title="Save" onPress={handleSaveCar} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default AddCarScreen;
