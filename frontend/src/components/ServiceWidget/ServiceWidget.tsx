import React from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { styles } from "./ServiceWidget.styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Car } from "../../models/Car.model";

type ServiceWidgetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ServiceScreen"
>;

export type RootStackParamList = {
  ServiceScreen: { item: Car };
};

interface ServiceWidgetProps {
  item: Car;
}

const ServiceWidget: React.FC<ServiceWidgetProps> = ({ item }) => {
  const navigation = useNavigation<ServiceWidgetNavigationProp>();

  const calculateProgress = () => {
    const start = new Date(item.lastService!).getTime();
    const end = new Date(item.nextService!).getTime();
    const now = new Date().getTime();
    const totalDuration = end - start;
    const timeElapsedSinceStart = now - start;
    const progress = (timeElapsedSinceStart / totalDuration) * 100;
    return progress > 100 ? 100 : progress;
  };

  const calculateDaysLeft = () => {
    const end = new Date(item.nextService!).getTime();
    const now = new Date().getTime();
    const totalDuration = end - now;
    const daysLeft = Math.floor(totalDuration / (1000 * 60 * 60 * 24));
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
    navigation.navigate("ServiceScreen", { item });
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
        {item.nextServiceMileageInterval ? (
          <Text>
            {item.nextServiceMileageInterval} km or {calculateDaysLeft()}
            {" days left"}
          </Text>
        ) : (
          <Text>
            {calculateDaysLeft()}
            {" days left"}
          </Text>
        )}

        <Text>{formatDate(new Date(item.nextService!).toDateString()!)}</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarForeground,
            { width: `${progress}%`, backgroundColor: progressBarColor },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ServiceWidget;
