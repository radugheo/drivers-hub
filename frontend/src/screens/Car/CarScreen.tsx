import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./CarScreen.styles";
import { RouteProp, useNavigation } from "@react-navigation/native";
import FormInputField from "../../components/FormInputField/FormInputField";
import { Car } from "../../models/Car.model";
import { retrieveString } from "../../utils/storage-handler";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import { deleteCarApiCall, updateCarApiCall } from "../../api/auth-service";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/app-navigator";
import TopBar from "../../components/TopBar/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import FormDropdownField from "../../components/FormDropdownField/FormDropdownField";

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

  const handleSave = async () => {
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

  const handleDelete = async () => {
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

  const handleServiceInputChange = (name: keyof Car, value: string) => {
    console.log("Name", name, "Value", value);
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const services = ["mileage"];
  const years = Array.from(
    new Array(new Date().getFullYear() - 1970),
    (val, index) => 1970 + index + 1
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar title="Driver's Hub" />
      <ScrollView style={styles.container}>
        <Text style={styles.editField}>Make</Text>
        <FormInputField
          iconName="car"
          placeholder={car.make}
          value={car.make}
          onChangeText={(text) => handleServiceInputChange("make", text)}
        />
        <Text style={styles.editField}>Model</Text>
        <FormInputField
          iconName="car"
          placeholder="Model"
          value={car.model}
          onChangeText={(text) => handleServiceInputChange("model", text)}
        />
        <Text style={styles.editField}>Year</Text>
        <FormDropdownField
          iconName="calendar"
          selectedValue={car.year.toString()}
          items={years.map((year) => ({
            label: year.toString(),
            value: year.toString(),
          }))}
          onValueChange={(year) => handleServiceInputChange("year", year)}
        />
        <Text style={styles.editField}>License Plate</Text>
        <FormInputField
          iconName="window-maximize"
          placeholder="License Plate"
          value={car.licensePlate}
          onChangeText={(text) =>
            handleServiceInputChange("licensePlate", text)
          }
        />

        {/* {services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={styles.serviceText}>{service}</Text>
            {car.services[service] === undefined ? (
              <OpacityButton
                title="Add"
                onPress={() => addServiceField(service)}
              />
            ) : (
              <FormInputField
                iconName="plus"
                placeholder={`Add ${service}`}
                value={car.services[service]}
                onChangeText={(text) => handleServiceInputChange(service, text)}
              />
            )}
          </View>
        ))} */}
        <View style={styles.buttonsContainer}>
          <OpacityButton title="Save car" onPress={handleSave} />
          <OpacityButton title="Delete car" onPress={handleDelete} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarScreen;
