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
import { removeCarWidgets, retrieveString } from "../../utils/storage-handler";
import { updateCarApiCall } from "../../api/api-service";
import DateInputField from "../../components/DateInputField/DateInputField";
import { Car } from "../../models/Car.model";

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
  const { item } = route.params;
  const [car, setCar] = useState<Car>(item);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSaveITP = async () => {
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

  const handleDeleteITP = async () => {
    try {
      const token = await retrieveString("userToken");
      const result = await updateCarApiCall(
        {
          id: car.id,
          lastService: null,
          nextService: null,
        },
        token,
      );
      if (result) {
        Alert.alert("Success", "ITP details have been deleted.");
        await removeCarWidgets(car.id!.toString());
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting the ITP details:", error);
    }
  };

  const handleServiceInputChange = (name: keyof Car, value: string | null) => {
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
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
              value={new Date(car.lastService || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("lastService", date.toISOString())
              }
            />

            <Text style={styles.editField}>Valid to</Text>
            <DateInputField
              iconName="calendar"
              placeholder="End Date"
              value={new Date(car.nextService || new Date().toISOString())}
              onChange={(date) =>
                handleServiceInputChange("nextService", date.toISOString())
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
