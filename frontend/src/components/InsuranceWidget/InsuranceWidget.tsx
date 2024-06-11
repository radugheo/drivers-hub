import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./InsuranceWidget.styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Car } from "../../models/Car.model";
import { ActiveInsurance } from "../../models/Active-Insurance.model";
import { RootStackParamList } from "../../navigation/app-navigator";

type InsuranceWidgetNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InsuranceScreen"
>;

interface InsuranceWidgetProps {
  item: Car;
}

const InsuranceWidget: React.FC<InsuranceWidgetProps> = ({ item }) => {
  const carInsurance: ActiveInsurance = item.activeInsurance!;
  const navigation = useNavigation<InsuranceWidgetNavigationProp>();

  const calculateProgress = () => {
    const start = new Date(carInsurance.validFrom!).getTime();
    const end = new Date(carInsurance.validUntil!).getTime();
    const now = new Date().getTime();
    const totalDuration = end - start;
    const timeElapsedSinceStart = now - start;
    const progress = (timeElapsedSinceStart / totalDuration) * 100;
    return progress > 100 ? 100 : progress;
  };

  const calculateDaysLeft = () => {
    const end = new Date(carInsurance.validUntil!).getTime();
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

  const navigateToInsuranceScreen = () => {
    navigation.navigate("InsuranceScreen", {
      carItem: item,
      insuranceItem: item.activeInsurance!,
    });
  };

  const progress = calculateProgress();
  const progressBarColor = getProgressBarColor(progress);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToInsuranceScreen}
    >
      <Text style={styles.title}>RCA - {carInsurance.company}</Text>
      <View style={styles.datesContainer}>
        <Text style={styles.daysText}>
          {calculateDaysLeft()}
          {" days left"}
        </Text>
        <Text style={styles.daysText}>
          {formatDate(new Date(carInsurance.validUntil!).toDateString()!)}
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
        Policy Number: {carInsurance.policyNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default InsuranceWidget;
