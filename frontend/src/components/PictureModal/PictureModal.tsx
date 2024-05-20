import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getImageFromS3 } from "../../utils/picture-handler";

interface PictureModalProps {
  isVisible: boolean;
  onClose: () => void;
  imageData: string;
}

const PictureModal: React.FC<PictureModalProps> = ({
  isVisible,
  onClose,
  imageData,
}) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const bucketName = "drivers-hub";

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageData || !isVisible) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        if (imageData.length > 300) {
          setBase64Image(imageData);
        } else {
          const base64 = await getImageFromS3(bucketName, imageData);
          setBase64Image(base64);
        }
      } catch (error) {
        console.error("Error fetching image from S3:", error);
        setBase64Image(null);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [isVisible, imageData]);

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalView}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          base64Image && (
            <Image
              source={{ uri: `data:image/png;base64,${base64Image}` }}
              style={styles.fullImage}
            />
          )
        )}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome5 name="times" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  fullImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
});

export default PictureModal;
