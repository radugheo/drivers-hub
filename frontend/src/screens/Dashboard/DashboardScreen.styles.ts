import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderWidth: {
    width: width,
  },
  itemWidth: {
    width: width,
  },

  safeContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  modalOption: {
    padding: 12,
    alignItems: "center",
  },
  modalOptionDisabled: {
    opacity: 0.5,
  },
  modalOptionText: {
    fontSize: 18,
    color: "#007aff",
  },
});
