import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  editField: {
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewImageButton: {
    backgroundColor: "#00817E",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    flexDirection: "row",
  },
  viewImageButtonText: {
    flex: 1,
    fontFamily: "OktahRound-Regular",
    color: "white",
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
