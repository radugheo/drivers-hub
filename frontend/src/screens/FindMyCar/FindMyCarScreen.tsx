import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./FindMyCarScreen.styles";

type LocationState = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
} | null;

const FindMyCarScreen = () => {
  const [location, setLocation] = useState<LocationState>(null);
  const [parkingSpot, setParkingSpot] = useState<LocationState>(null);
  const [parkingMode, setParkingMode] = useState(false);
  const [parkingLocation, setParkingLocation] = useState(null);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const startWatchingLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000, // Update every second
          distanceInterval: 1, // Update every meter
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      );
    };

    startWatchingLocation();

    // Clean up
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const markParkingSpot = () => {
    if (location) {
      setParkingSpot(location);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={location ?? undefined}
        showsUserLocation={true}
        onPress={(e) => {
          if (parkingMode) {
            setParkingLocation(e.nativeEvent.coordinate);
            setParkingMode(false); // Optionally exit parking mode after marking
          }
        }}
      >
        {parkingLocation && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            // Optionally use a custom image for the marker
            image={require("path/to/your/custom/marker/image.png")}
          />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Mark Parking"
          onPress={() => setParkingMode(!parkingMode)}
        />
      </View>
    </SafeAreaView>
  );
};

export default FindMyCarScreen;
