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
  modalFormContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    maxHeight: Dimensions.get("window").height / 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  safeContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  editField: {
    fontSize: 14,
    fontWeight: "bold",
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
  },
  carSubtitle: {
    fontSize: 14,
  },
});
