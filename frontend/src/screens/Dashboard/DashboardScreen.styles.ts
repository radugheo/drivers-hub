import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  sliderWidth: {
    width: width,
  },
  itemWidth: {
    width: width,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  carTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  carSubtitle: {
    fontSize: 14,
  },
});
