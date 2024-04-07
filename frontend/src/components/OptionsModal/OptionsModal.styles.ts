import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 10,
    maxHeight: Dimensions.get("window").height / 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
