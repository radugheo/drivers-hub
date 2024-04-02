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
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
  },
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
  modalOption: {
    padding: 12,
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 18,
    color: "#007aff",
  },
  carTitle: {
    fontSize: 20,
  },
  carSubtitle: {
    fontSize: 14,
  },
});
