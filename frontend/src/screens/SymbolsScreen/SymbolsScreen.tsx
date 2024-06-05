import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { styles } from "./SymbolsScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/app-navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import PictureInputField from "../../components/PictureInputField/PictureInputField";
import {
  getSymbolsDataApiCall,
  getSymbolsImageApiCall,
} from "../../api/api-service";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type SymbolsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SymbolsScreen"
>;

interface SymbolsScreenProps {
  navigation: SymbolsScreenNavigationProp;
}

const SymbolsScreen: React.FC<SymbolsScreenProps> = () => {
  const navigation = useNavigation<SymbolsScreenNavigationProp>();
  const [image, setImage] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
    null
  );
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageSelect = async (base64Image: string | null) => {
    if (base64Image) {
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("photo", {
          uri: `data:image/jpeg;base64,${base64Image}`,
          name: "dashboard.jpg",
          type: "image/jpeg",
        } as any);

        console.log("Calling getSymbolsDataApiCall");
        const response = await getSymbolsDataApiCall(formData);
        console.log(`Image response: ${JSON.stringify(response)}`);
        setProcessedImageUrl(response.imageUrl);
        setLabels(response.labels);

        console.log("Calling getSymbolsImageApiCall");
        const base64Url = await getSymbolsImageApiCall(response.imageUrl);
        setImage(base64Url);
      } catch (error) {
        console.error("Error processing the image:", error);
        Alert.alert("Error", "Failed to process the image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setProcessedImageUrl(null);
    setLabels([]);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.instructions}>
            Take a picture of your car dashboard and we will identify the issues
            for you.
          </Text>

          <PictureInputField
            iconName="camera"
            title="Select or Take a Picture"
            showDeleteButton={false}
            onImageSelect={handleImageSelect}
          />
          <View style={{ marginTop: 20 }}>
            {image ? (
              <View style={{ position: "relative" }}>
                <Image
                  source={{ uri: image }}
                  style={{
                    height: 300,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={handleDeleteImage}
                  style={styles.deleteButton}
                >
                  <FontAwesome5 name="times-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {labels.length > 0 ? (
            <View style={styles.labelsContainer}>
              <Text style={styles.labelsTitle}>Detected issues:</Text>
              {labels.map((label, index) => (
                <Text key={index} style={styles.label}>
                  {label}
                </Text>
              ))}
            </View>
          ) : image ? (
            <View style={styles.labelsContainer}>
              <Text style={styles.instructions}>
                No issues detected. Please take a clear picture of your car
                dashboard.
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>

      <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.loadingModal}>
          <ActivityIndicator size="large" color="#0080ff" />
          <Text style={styles.loadingText}>Loading... please wait</Text>
        </View>
      </Modal>
    </View>
  );
};

export default SymbolsScreen;
