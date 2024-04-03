import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { styles } from "./DashboardScreen.styles";
import { getCarsApiCall } from "../../api/api-service";
import { Car } from "../../models/Car.model";
import {
  retrieveCarWidgets,
  retrieveString,
  saveCarWidgets,
  storeString,
} from "../../utils/storage-handler";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import CustomWidget from "../../components/CustomWidget/CustomWidget";

const DashboardScreen: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [carWidgets, setCarWidgets] = useState<{ [carId: string]: string[] }>(
    {},
  );

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = await retrieveString("userToken");
        if (token) {
          const fetchedCars: Car[] = await getCarsApiCall(token);
          setCars(fetchedCars);
          fetchedCars.forEach(async (car) => {
            const widgets = await retrieveCarWidgets(car.id!.toString());
            setCarWidgets((prevWidgets) => ({
              ...prevWidgets,
              [car.id!.toString()]: widgets,
            }));
          });
        } else {
          console.log("Unable to retrieve user token");
          Alert.alert("Error", "Unable to retrieve user token");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Unable to retrieve cars");
      }
    };

    fetchCars();
  }, []);

  const options = ["Insurance", "Service", "Accident", "Mileage"];

  const addWidgetToCar = async (carId: string, widgetName: string) => {
    const currentWidgets = carWidgets[carId] || [];
    if (currentWidgets.includes(widgetName)) {
      Alert.alert("Duplicate Widget", "This widget has already been added.");
      return;
    }
    const updatedWidgets = [...currentWidgets, widgetName];
    setCarWidgets({ ...carWidgets, [carId]: updatedWidgets });
    await saveCarWidgets(carId, updatedWidgets);
  };

  const renderOption = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        if (selectedCarId) {
          addWidgetToCar(selectedCarId.toString(), item);
          setModalVisible(false);
        }
      }}
      style={styles.modalOption}
    >
      <Text style={styles.modalOptionText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Car }) => {
    const widgets = carWidgets[item.id!.toString()] || [];
    return (
      <View style={styles.carContainer}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Text style={styles.carTitle}>
              {item.make} {item.model} {item.year}
            </Text>
            <Text style={styles.carSubtitle}>{item.licensePlate}</Text>
          </View>
          {widgets.map((widgetName, index) => (
            <CustomWidget key={index} title={widgetName} progress={30} />
          ))}
        </ScrollView>
        <OpacityButton
          title="Add new information"
          onPress={() => {
            setSelectedCarId(item.id!);
            setModalVisible(true);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={cars}
        renderItem={renderItem}
        sliderWidth={styles.sliderWidth.width}
        itemWidth={styles.itemWidth.width}
        layout={"default"}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DashboardScreen;
