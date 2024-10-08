import React from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { styles } from "./ServiceWidget.styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Car } from "../../models/Car.model";
import { RootStackParamList } from "../../navigation/app-navigator";
import { ActiveService } from "../../models/Active-Service.model";

type ServiceWidgetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ServiceScreen"
>;

interface ServiceWidgetProps {
  item: Car;
}

const ServiceWidget: React.FC<ServiceWidgetProps> = ({ item }) => {
  const carService: ActiveService = item.activeService!;
  const navigation = useNavigation<ServiceWidgetNavigationProp>();

  const calculateProgress = () => {
    const start = new Date(carService.validFrom!).getTime();
    const end = new Date(carService.validUntil!).getTime();
    const now = new Date().getTime();
    const totalDuration = end - start;
    const timeElapsedSinceStart = now - start;
    const progress = (timeElapsedSinceStart / totalDuration) * 100;
    return progress > 100 ? 100 : progress;
  };

  const calculateDaysLeft = () => {
    const end = new Date(carService.validUntil!).getTime();
    const now = new Date().getTime();
    const totalDuration = end - now;
    const daysLeft = Math.floor(totalDuration / (1000 * 60 * 60 * 24)) + 1;
    return daysLeft;
  };

  const getProgressBarColor = (progress: number) => {
    if (progress > 90) {
      return "red";
    } else if (progress > 75) {
      return "orange";
    }
    return "green";
  };

  const formatDate = (date: string) => {
    return `${date.split(" ")[2]} ${date.split(" ")[1]} ${date.split(" ")[3]}`;
  };

  const navigateToServiceScreen = () => {
    navigation.navigate("ServiceScreen", {
      carItem: item,
      serviceItem: item.activeService!,
    });
  };

  const progress = calculateProgress();
  const progressBarColor = getProgressBarColor(progress);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToServiceScreen}
    >
      <Text style={styles.title}>Maintainance (Technical Service)</Text>

      <View style={styles.datesContainer}>
        {carService.mileageInterval ? (
          <Text style={styles.daysText}>
            {carService.mileageInterval} km or {calculateDaysLeft()}
            {" days left"}
          </Text>
        ) : (
          <Text style={styles.daysText}>
            {calculateDaysLeft()}
            {" days left"}
          </Text>
        )}

        <Text style={styles.daysText}>
          {formatDate(new Date(carService.validUntil!).toDateString()!)}
        </Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarForeground,
            { width: `${progress}%`, backgroundColor: progressBarColor },
          ]}
        />
      </View>
      <Text style={styles.text}>
        Cost: <Text style={styles.boldText}>{carService.price} ron</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceWidget;
