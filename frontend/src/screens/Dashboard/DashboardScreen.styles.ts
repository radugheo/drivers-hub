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
  widgetOption: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxHeight: Dimensions.get("window").height / 3,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
  },
  flatListContentContainer: {
    padding: 10,
  },
  carTitle: {
    fontSize: 20,
  },
  carSubtitle: {
    fontSize: 14,
  },
  documentContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  documentText: {
    fontSize: 18,
  },
});
