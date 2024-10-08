import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./CarScreen.styles";
import { RouteProp, useNavigation } from "@react-navigation/native";
import FormInputField from "../../components/FormInputField/FormInputField";
import { Car } from "../../models/Car.model";
import { retrieveString } from "../../utils/storage-handler";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import { deleteCarApiCall, updateCarApiCall } from "../../api/api-service";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/app-navigator";
import TopBar from "../../components/TopBar/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import FormDropdownField from "../../components/FormDropdownField/FormDropdownField";
import NumberInputField from "../../components/NumberInputField/NumberInputField";
import { formatLicensePlate } from "../../utils/format-text";
import FormAuthField from "../../components/FormAuthField/FormAuthField";

type CarScreenRouteProp = RouteProp<RootStackParamList, "CarScreen">;
type CarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CarScreen"
>;

interface CarScreenProps {
  route: CarScreenRouteProp;
  navigation: CarScreenNavigationProp;
}

const CarScreen: React.FC<CarScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [car, setCar] = useState<Car>(item);

  const handleSaveCar = async () => {
    try {
      const token = await retrieveString("userToken");
      car.licensePlate = formatLicensePlate(car.licensePlate);
      const result = await updateCarApiCall(car, token);
      if (result) {
        Alert.alert("Success", "Car updated successfully.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating the car:", error);
    }
  };

  const handleDeleteCar = async () => {
    try {
      const token = await retrieveString("userToken");
      const result = await deleteCarApiCall(car.id!, token);
      if (result) {
        Alert.alert("Success", "Car has been deleted.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the car:", error);
    }
  };

  const years = Array.from(
    new Array(new Date().getFullYear() - 1970),
    (val, index) => 1970 + index + 1,
  );

  return (
    <View style={styles.mainContainer}>
      <TopBar title={`${car.make} ${car.model}`} />
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.editField}>Make</Text>
          <FormInputField
            iconName="car"
            placeholder={car.make}
            value={car.make}
            onChangeText={(make) => setCar((prev) => ({ ...prev, make }))}
          />

          <Text style={styles.editField}>Model</Text>
          <FormInputField
            iconName="car-side"
            placeholder="Model"
            value={car.model}
            onChangeText={(model) => setCar((prev) => ({ ...prev, model }))}
          />

          <Text style={styles.editField}>Year</Text>
          <FormDropdownField
            iconName="calendar"
            selectedValue={car.year.toString()}
            items={years.map((year) => ({
              label: year.toString(),
              value: year.toString(),
            }))}
            onValueChange={(year) =>
              setCar((prev) => ({ ...prev, year: parseInt(year) }))
            }
          />

          <Text style={styles.editField}>License Plate</Text>
          <FormAuthField
            iconName="window-maximize"
            placeholder="License Plate"
            value={car.licensePlate}
            onChangeText={(licensePlate) =>
              setCar((prev) => ({
                ...prev,
                licensePlate: licensePlate?.toUpperCase().replace(" ", "-"),
              }))
            }
          />

          <Text style={styles.editField}>Mileage</Text>
          <NumberInputField
            iconName="tachometer-alt"
            placeholder="Mileage"
            value={car.mileage || null}
            onChangeText={(mileage) =>
              setCar((prev) => ({ ...prev, mileage: parseInt(mileage) }))
            }
          />

          <Text style={styles.editField}>Fuel</Text>
          <FormDropdownField
            iconName="gas-pump"
            selectedValue={car.fuel || ""}
            items={[
              { label: "Gasoline", value: "Gasoline" },
              { label: "Diesel", value: "Diesel" },
              { label: "Electric", value: "Electric" },
              { label: "Hybrid", value: "Hybrid" },
            ]}
            onValueChange={(fuel) => setCar((prev) => ({ ...prev, fuel }))}
          />

          <Text style={styles.editField}>Transmission</Text>
          <FormDropdownField
            iconName="wrench"
            selectedValue={car.transmission || ""}
            items={[
              { label: "Manual", value: "Manual" },
              { label: "Automatic", value: "Automatic" },
            ]}
            onValueChange={(transmission) =>
              setCar((prev) => ({ ...prev, transmission }))
            }
          />

          <Text style={styles.editField}>Displacement</Text>
          <NumberInputField
            iconName="cog"
            placeholder="Displacement"
            value={car.displacement || null}
            onChangeText={(displacement) =>
              setCar((prev) => ({
                ...prev,
                displacement: parseInt(displacement),
              }))
            }
          />

          <Text style={styles.editField}>Horsepower</Text>
          <NumberInputField
            iconName="horse"
            placeholder="Horsepower"
            value={car.horsepower || null}
            onChangeText={(horsepower) =>
              setCar((prev) => ({
                ...prev,
                horsepower: parseInt(horsepower),
              }))
            }
          />

          <Text style={styles.editField}>VIN</Text>
          <FormInputField
            iconName="ticket-alt"
            placeholder="VIN"
            value={car.vin?.toString() || ""}
            onChangeText={(vin) => setCar((prev) => ({ ...prev, vin }))}
          />
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <OpacityButton title="Save car" onPress={handleSaveCar} />
          <OpacityButton title="Delete car" onPress={handleDeleteCar} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CarScreen;
