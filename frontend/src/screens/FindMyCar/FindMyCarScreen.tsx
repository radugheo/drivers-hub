import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert, Dimensions } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./FindMyCarScreen.styles";
import { debounce } from "lodash";
import ReCenterButton from "../../components/ReCenterButton/ReCenterButton";
import MarkParkingButton from "../../components/MarkParkingButton/MarkParkingButton";
import DeleteParkingButton from "../../components/DeleteParkingButton/DeleteParkingButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapViewDirections from "react-native-maps-directions";

const PARKING_SPOT_KEY = "PARKING_SPOT_KEY";

const FindMyCarScreen: React.FC = () => {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [parkingSpot, setParkingSpot] = useState<Region | undefined>(undefined);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const requestAndSetLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      });

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 1,
        },
        () => {},
      );
    };

    requestAndSetLocation();

    const loadParkingSpot = async () => {
      const savedParkingSpot = await AsyncStorage.getItem(PARKING_SPOT_KEY);
      if (savedParkingSpot) {
        setParkingSpot(JSON.parse(savedParkingSpot));
      }
    };

    loadParkingSpot();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const markParkingSpot = async () => {
    if (mapRef.current) {
      const camera = await mapRef.current.getCamera();
      const newParkingSpot = {
        latitude: camera.center.latitude,
        longitude: camera.center.longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      };
      setParkingSpot(newParkingSpot);
      await AsyncStorage.setItem(
        PARKING_SPOT_KEY,
        JSON.stringify(newParkingSpot),
      );
    }
  };

  const deleteParkingSpot = () => {
    setParkingSpot(undefined);
    AsyncStorage.removeItem(PARKING_SPOT_KEY);
  };

  const reCenterMap = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        },
        500,
      );
    }
  };

  const debouncedReCenter = debounce(reCenterMap, 1000, {
    leading: true,
    trailing: false,
  });

  const { width, height } = Dimensions.get("window");
  const apiKey: string = process.env.GOOGLE_API_KEY!;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={location || undefined}
        showsUserLocation={true}
        ref={mapRef}
      >
        {parkingSpot && (
          <Marker coordinate={parkingSpot} title="Parking Location" />
        )}
        {location && parkingSpot && (
          <MapViewDirections
            origin={location}
            destination={parkingSpot}
            apikey={apiKey}
            strokeWidth={4}
            strokeColor="hotpink"
            onReady={(result) => {
              mapRef.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
          />
        )}
      </MapView>
      <View style={styles.crosshair}>
        <View style={[styles.crosshairLine, styles.verticalLine]} />
        <View style={[styles.crosshairLine, styles.horizontalLine]} />
      </View>
      <View style={styles.buttonContainer}>
        <MarkParkingButton onPress={markParkingSpot} />
        <DeleteParkingButton onPress={deleteParkingSpot} />
        <ReCenterButton onPress={debouncedReCenter} />
      </View>
    </SafeAreaView>
  );
};

export default FindMyCarScreen;
