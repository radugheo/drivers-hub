import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  ActivityIndicator,
} from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./LocationsScreen.styles";
import { debounce } from "lodash";
import ReCenterButton from "../../components/ReCenterButton/ReCenterButton";
import MarkParkingButton from "../../components/MarkParkingButton/MarkParkingButton";
import DeleteParkingButton from "../../components/DeleteParkingButton/DeleteParkingButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapViewDirections from "react-native-maps-directions";
import { MaterialIcons } from "@expo/vector-icons";

const PARKING_SPOT_KEY = "PARKING_SPOT_KEY";

type Service = {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  vicinity: string;
};

type ServicesArray = Service[];

const LocationsScreen: React.FC = () => {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [parkingSpot, setParkingSpot] = useState<Region | undefined>(undefined);
  const [viewMode, setViewMode] = useState("Park");
  const mapRef = useRef<MapView | null>(null);

  const [locationServices, setLocationServices] = useState<Region | undefined>(
    undefined,
  );
  const [services, setServices] = useState<ServicesArray>([]);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [travelTimes, setTravelTimes] = useState<{ [key: string]: string }>({});

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

    const loadParkingSpot = async () => {
      const savedParkingSpot = await AsyncStorage.getItem(PARKING_SPOT_KEY);
      if (savedParkingSpot) {
        setParkingSpot(JSON.parse(savedParkingSpot));
      }
    };

    const fetchNearbyCarServices = async (region: Region) => {
      const { latitude, longitude } = region;
      const apiKey: string = process.env.GOOGLE_API_KEY!;
      const radius = 3000;
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=car_repair&key=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        console.log("Fetched nearby services");
        setServices(json.results);
      } catch (error) {
        Alert.alert("Failed to fetch", "Could not fetch nearby services");
        console.error(error);
      }
    };

    const fetchLocationAndServices = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Permission to access location was denied",
        );
        return;
      }
      console.log("Getting location");
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      console.log("Got location", currentLocation);
      const region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.065,
        longitudeDelta: 0.04,
      };
      setLocationServices(region);
      fetchNearbyCarServices(region);
    };

    requestAndSetLocation();
    loadParkingSpot();
    fetchLocationAndServices();

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

  const handleMarkerPress = async (
    latitude: number,
    longitude: number,
    name: string,
  ) => {
    setSelectedMarker(name);

    const userLocation = `${locationServices!.latitude},${locationServices!.longitude}`;
    const destination = `${latitude},${longitude}`;
    const apiKey = process.env.GOOGLE_API_KEY!;
    const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation}&destinations=${destination}&mode=driving&key=${apiKey}`;

    try {
      const response = await fetch(distanceMatrixUrl);
      const json = await response.json();
      if (json.rows[0].elements[0].status === "OK") {
        const duration = json.rows[0].elements[0].duration.text;
        setTravelTimes((prevTimes) => ({ ...prevTimes, [name]: duration }));
      } else {
        console.error(
          "Error fetching travel time: ",
          json.rows[0].elements[0].status,
        );
        setTravelTimes((prevTimes) => ({
          ...prevTimes,
          [name]: "Unavailable",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch distance matrix: ", error);
      setTravelTimes((prevTimes) => ({
        ...prevTimes,
        [name]: "Error fetching time",
      }));
    }

    const zoomRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    mapRef.current?.animateToRegion(zoomRegion, 1000);
  };

  const handleOpenDirections = (latitude: number, longitude: number) => {
    const url = Platform.select({
      ios: `maps://?q=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
    });

    Linking.openURL(url!).catch((err) =>
      console.error("An error occurred", err),
    );
  };

  const { width, height } = Dimensions.get("window");
  const apiKey: string = process.env.GOOGLE_API_KEY!;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Park" ? styles.activeSwitch : null,
          ]}
          onPress={() => setViewMode("Park")}
        >
          <Text
            style={
              viewMode === "Park"
                ? styles.statusTextActive
                : styles.statusTextInactive
            }
          >
            Park
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Services" ? styles.activeSwitch : null,
          ]}
          onPress={() => setViewMode("Services")}
        >
          <Text
            style={
              viewMode === "Services"
                ? styles.statusTextActive
                : styles.statusTextInactive
            }
          >
            Services
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recenterButton}>
        <ReCenterButton onPress={debouncedReCenter} />
      </View>
      {viewMode === "Park" ? (
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
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={locationServices || undefined}
            showsUserLocation={true}
            ref={mapRef}
          >
            {services.map((service, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: service.geometry.location.lat,
                  longitude: service.geometry.location.lng,
                }}
                title={service.name}
                description={service.vicinity}
                pinColor={selectedMarker === service.name ? "blue" : "red"}
                onPress={() =>
                  handleMarkerPress(
                    service.geometry.location.lat,
                    service.geometry.location.lng,
                    service.name,
                  )
                }
              >
                <Callout
                  style={styles.calloutStyle}
                  onPress={() =>
                    handleOpenDirections(
                      service.geometry.location.lat,
                      service.geometry.location.lng,
                    )
                  }
                >
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={styles.calloutTitle}>{service.name}</Text>
                    {travelTimes[service.name] && (
                      <Text style={styles.travelTimeText}>
                        Estimated driving time: {travelTimes[service.name]}
                      </Text>
                    )}
                    <View style={styles.calloutOpenInMaps}>
                      <Text style={styles.openInMapsText}>Open in maps</Text>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color="#000"
                      />
                    </View>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          {services.length === 0 && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
};

export default LocationsScreen;
