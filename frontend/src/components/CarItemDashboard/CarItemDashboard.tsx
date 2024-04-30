import { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";
import InsuranceWidget from "../InsuranceWidget/InsuranceWidget";
import ITPWidget from "../ITPWidget/ITPWidget";
import OpacityButton from "../OpacityButton/OpacityButton";
import ServiceWidget from "../ServiceWidget/ServiceWidget";
import { Car } from "../../models/Car.model";
import { styles } from "./CarItemDashboard.styles";
import { ActiveInsurance } from "../../models/Active-Insurance.model";
import { ActiveInspection } from "../../models/Active-Inspection.model";
import { ActiveService } from "../../models/Active-Service.model";
import CustomWidget from "../CustomWidget/CustomWidget";

interface CarItemDashboardProps {
  item: Car;
  carWidgets: { [key: string]: string[] };
  historyCarWidgets: { [key: string]: any[] };
  deleteHistoryWidget: (carId: string, widgetType: string) => Promise<void>;
  refreshing: boolean;
  refreshCarsAndWidgets: () => void;
  setSelectedCarId: (id: number) => void;
  setOptionsModalVisible: (visible: boolean) => void;
  carHasInsurance: (item: Car) => ActiveInsurance | undefined;
  carHasITP: (item: Car) => ActiveInspection | undefined;
  carHasService: (item: Car) => ActiveService | undefined;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

const CarItemDashboard: React.FC<CarItemDashboardProps> = ({
  item,
  carWidgets,
  historyCarWidgets,
  deleteHistoryWidget,
  refreshing,
  refreshCarsAndWidgets,
  setSelectedCarId,
  setOptionsModalVisible,
  carHasInsurance,
  carHasITP,
  carHasService,
}) => {
  const [viewMode, setViewMode] = useState("Active");

  const widgets = carWidgets[item.id!.toString()] || [];

  return (
    <View style={styles.carContainer}>
      <View style={styles.cardContainer}>
        <Text style={styles.carTitle}>
          {item.make} {item.model} {item.year}
        </Text>
        <Text style={styles.carSubtitle}>{item.licensePlate}</Text>
      </View>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Active" ? styles.activeSwitch : null,
          ]}
          onPress={() => setViewMode("Active")}
        >
          <Text style={styles.statusText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Expired" ? styles.activeSwitch : null,
          ]}
          onPress={() => setViewMode("Expired")}
        >
          <Text style={styles.statusText}>Expired</Text>
        </TouchableOpacity>
      </View>

      {viewMode === "Active" ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshCarsAndWidgets}
            />
          }
        >
          {widgets.map((widgetName, index) => {
            if (widgetName === "Insurance") {
              if (carHasInsurance(item)) {
                return <InsuranceWidget key={index} item={item} />;
              }
            } else if (widgetName === "ITP (Technical Inspection)") {
              if (carHasITP(item)) {
                return <ITPWidget key={index} item={item} />;
              }
            } else if (widgetName === "Service & Maintenance") {
              if (carHasService(item)) {
                return <ServiceWidget key={index} item={item} />;
              }
            }
          })}
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshCarsAndWidgets}
            />
          }
        >
          <View>
            {historyCarWidgets[item.id!] &&
              historyCarWidgets[item.id!].map((widget, index) => (
                <CustomWidget
                  title={widget.type === "Insurance" ? "RCA" : widget.type}
                  expiryDate={formatDate(widget.data.validUntil)}
                  deleteHistoryWidget={() => {
                    deleteHistoryWidget(item.id!.toString(), widget.data.id);
                  }}
                />
              ))}
          </View>
        </ScrollView>
      )}

      <OpacityButton
        title="Add new information"
        onPress={() => {
          setSelectedCarId(item.id!);
          setOptionsModalVisible(true);
        }}
      />
    </View>
  );
};

export default CarItemDashboard;
