import React from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { styles } from "./ITPWidget.styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Car } from "../../models/Car.model";
import { RootStackParamList } from "../../navigation/app-navigator";
import { ActiveInspection } from "../../models/Active-Inspection.model";

type ITPWidgetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ITPScreen"
>;

interface ITPWidgetProps {
  item: Car;
}

const ITPWidget: React.FC<ITPWidgetProps> = ({ item }) => {
  const carInspection: ActiveInspection = item.activeInspection!;
  const navigation = useNavigation<ITPWidgetNavigationProp>();

  const calculateProgress = () => {
    const start = new Date(carInspection.validFrom!).getTime();
    const end = new Date(carInspection.validUntil!).getTime();
    const now = new Date().getTime();
    const totalDuration = end - start;
    const timeElapsedSinceStart = now - start;
    const progress = (timeElapsedSinceStart / totalDuration) * 100;
    return progress > 100 ? 100 : progress;
  };

  const calculateDaysLeft = () => {
    const end = new Date(carInspection.validUntil!).getTime();
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

  const navigateToITPScreen = () => {
    navigation.navigate("ITPScreen", {
      carItem: item,
      inspectionItem: item.activeInspection!,
    });
  };

  const progress = calculateProgress();
  const progressBarColor = getProgressBarColor(progress);

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToITPScreen}>
      <Text style={styles.title}>ITP (Technical Inspection)</Text>
      <View style={styles.datesContainer}>
        <Text style={styles.daysText}>
          {calculateDaysLeft()}
          {" days left"}
        </Text>
        <Text style={styles.daysText}>
          {formatDate(new Date(carInspection.validUntil!).toDateString()!)}
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
        Cost: <Text style={styles.boldText}>{carInspection.price} ron</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default ITPWidget;
