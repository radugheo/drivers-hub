import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalFormContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    maxHeight: Dimensions.get("window").height / 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  editField: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
