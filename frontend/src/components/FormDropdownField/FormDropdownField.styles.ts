import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    marginBottom: 20,
    padding: 10,
    flex: 2,
  },
  pickerContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  pickerButton: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  picker: {
    backgroundColor: "white",
  },
});
