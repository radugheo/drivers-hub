import React, { useState } from "react";
import { Modal, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

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
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalView}>
        <Image
          source={{ uri: `data:image/png;base64,${imageData}` }}
          style={styles.fullImage}
        />
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
