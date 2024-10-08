import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginTop: -50,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    alignItems: "center",
  },
  serviceText: {
    fontSize: 16,
  },
  editField: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
