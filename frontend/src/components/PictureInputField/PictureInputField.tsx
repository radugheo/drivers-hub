import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./PictureInputField.styles"; // Assuming you have a similar style file

interface PictureInputProps {
  iconName: string;
  title: string;
  onImageSelect: (imageBase64: string | null) => void;
}

const PictureInputField: React.FC<PictureInputProps> = ({
  iconName,
  title,
  onImageSelect,
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    base64: string;
    name: string;
  } | null>(null);

  const verifyPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== "granted" || galleryStatus !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera and photo library permissions to use this feature.",
        [{ text: "Okay" }],
      );
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      base64: true,
    });

    processImageResult(result);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      base64: true,
    });

    processImageResult(result);
  };

  const processImageResult = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets) {
      const imageBase64 = result.assets[0].base64!;
      const imageName = result.assets[0].fileName || "Selected Image";
      setSelectedImage({ base64: imageBase64, name: imageName });
      onImageSelect(imageBase64);
    }
  };

  const handleImageSelection = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    Alert.alert("Upload Photo", "Choose an Option", [
      { text: "Take a Photo", onPress: handleTakePhoto },
      { text: "Choose From Gallery", onPress: handlePickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onImageSelect(null);
  };

  return (
    <TouchableOpacity
      onPress={handleImageSelection}
      style={styles.inputContainer}
    >
      <FontAwesome5 name={iconName} size={24} color="black" />
      {selectedImage ? (
        <View style={styles.selectedImageContainer}>
          <Text style={styles.imageName} numberOfLines={1}>
            {selectedImage.name}
          </Text>
          <TouchableOpacity onPress={handleRemoveImage}>
            <FontAwesome5 name="times-circle" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PictureInputField;
