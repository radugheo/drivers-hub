import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../CostWidget/CostWidget.styles";

interface CostWidgetProps {
  insuranceCost: number;
  inspectionCost: number;
  serviceCost: number;
  vignetteCost: number;
}

const CostWidget: React.FC<CostWidgetProps> = ({
  insuranceCost,
  inspectionCost,
  serviceCost,
  vignetteCost,
}) => {
  const totalCost = insuranceCost + inspectionCost + serviceCost + vignetteCost;

  const calculateProgress = (cost: number) => {
    return (cost / totalCost) * 100;
  };

  const getProgressBarColor = (cost: number) => {
    if (cost === insuranceCost) {
      return "blue";
    } else if (cost === inspectionCost) {
      return "green";
    } else if (cost === serviceCost) {
      return "orange";
    }
    return "red";
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>
        Current costs -{" "}
        <Text style={styles.boldText}>
          {insuranceCost + inspectionCost + serviceCost + vignetteCost} ron
        </Text>
      </Text>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarSegment,
            {
              width: `${calculateProgress(insuranceCost)}%`,
              backgroundColor: getProgressBarColor(insuranceCost),
            },
          ]}
        />
        <View
          style={[
            styles.progressBarSegment,
            {
              width: `${calculateProgress(inspectionCost)}%`,
              backgroundColor: getProgressBarColor(inspectionCost),
            },
          ]}
        />
        <View
          style={[
            styles.progressBarSegment,
            {
              width: `${calculateProgress(serviceCost)}%`,
              backgroundColor: getProgressBarColor(serviceCost),
            },
          ]}
        />
        <View
          style={[
            styles.progressBarSegment,
            {
              width: `${calculateProgress(vignetteCost)}%`,
              backgroundColor: getProgressBarColor(vignetteCost),
            },
          ]}
        />
      </View>
      <View style={styles.costContainer}>
        <View style={styles.costItem}>
          <View style={[styles.colorCircle, { backgroundColor: "blue" }]} />
          <Text style={styles.text}>Insurance</Text>
        </View>
        <View style={styles.costItem}>
          <View style={[styles.colorCircle, { backgroundColor: "green" }]} />
          <Text style={styles.text}>Inspection</Text>
        </View>
        <View style={styles.costItem}>
          <View style={[styles.colorCircle, { backgroundColor: "orange" }]} />
          <Text style={styles.text}>Service</Text>
        </View>
        <View style={styles.costItem}>
          <View style={[styles.colorCircle, { backgroundColor: "red" }]} />
          <Text style={styles.text}>Vignette</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CostWidget;
