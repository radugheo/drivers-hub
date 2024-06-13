import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../VignetteWidget/VignetteWidget.styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Car } from "../../models/Car.model";
import { RootStackParamList } from "../../navigation/app-navigator";
import { ActiveVignette } from "../../models/Active-Vignette.model";

type VignetteWidgetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VignetteScreen"
>;

interface VignetteWidgetProps {
  item: Car;
}

const VignetteWidget: React.FC<VignetteWidgetProps> = ({ item }) => {
  const carVignette: ActiveVignette = item.activeVignette!;
  const navigation = useNavigation<VignetteWidgetNavigationProp>();

  const calculateProgress = () => {
    const start = new Date(carVignette.validFrom!).getTime();
    const end = new Date(carVignette.validUntil!).getTime();
    const now = new Date().getTime();
    const totalDuration = end - start;
    const timeElapsedSinceStart = now - start;
    const progress = (timeElapsedSinceStart / totalDuration) * 100;
    return progress > 100 ? 100 : progress;
  };

  const calculateDaysLeft = () => {
    const end = new Date(carVignette.validUntil!).getTime();
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

  const navigateToVignetteScreen = () => {
    navigation.navigate("VignetteScreen", {
      carItem: item,
      vignetteItem: item.activeVignette!,
    });
  };

  const progress = calculateProgress();
  const progressBarColor = getProgressBarColor(progress);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToVignetteScreen}
    >
      <Text style={styles.title}>Vignette</Text>
      <View style={styles.datesContainer}>
        <Text style={styles.daysText}>
          {calculateDaysLeft()}
          {" days left"}
        </Text>
        <Text style={styles.daysText}>
          {formatDate(new Date(carVignette.validUntil!).toDateString()!)}
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
    </TouchableOpacity>
  );
};

export default VignetteWidget;
