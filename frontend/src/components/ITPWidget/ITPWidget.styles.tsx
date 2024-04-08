import { StyleSheet } from "react-native";

// Add to your CustomWidget.styles or create a new stylesheet
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  progressBarBackground: {
    height: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "green",
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  insuranceImage: {
    width: 300,
    height: 400,
    resizeMode: "contain",
  },
});
