import React from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { styles } from "./InsuranceWidget.styles"; // Assuming you'll extend or reuse styles from CustomWidget
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Car } from "../../models/Car.model";

type InsuranceWidgetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InsuranceScreen"
>;

export type RootStackParamList = {
  InsuranceScreen: { item: Car };
};

interface InsuranceWidgetProps {
  item: Car;
}

const InsuranceWidget: React.FC<InsuranceWidgetProps> = ({ item }) => {
  const navigation = useNavigation<InsuranceWidgetNavigationProp>();

  const calculateProgress = () => {
    const start = new Date(item.insuranceStartDate!).getTime();
    const end = new Date(item.insuranceExpiryDate!).getTime();
    const now = new Date().getTime();
    const totalDuration = end - start;
    const timeElapsedSinceStart = now - start;
    const progress = (timeElapsedSinceStart / totalDuration) * 100;
    return progress > 100 ? 100 : progress;
  };

  const calculateDaysLeft = () => {
    const end = new Date(item.insuranceExpiryDate!).getTime();
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

  const navigateToInsuranceScreen = () => {
    navigation.navigate("InsuranceScreen", { item });
  };

  const progress = calculateProgress();
  const progressBarColor = getProgressBarColor(progress);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToInsuranceScreen}
    >
      <Text style={styles.title}>RCA - {item.insuranceCompany}</Text>
      <View style={styles.datesContainer}>
        <Text>
          {calculateDaysLeft()}
          {" days left"}
        </Text>
        <Text>
          {formatDate(new Date(item.insuranceExpiryDate!).toDateString()!)}
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
        Policy Number: {item.insurancePolicyNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default InsuranceWidget;
