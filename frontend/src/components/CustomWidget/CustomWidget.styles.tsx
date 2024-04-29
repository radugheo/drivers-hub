import { StyleSheet } from "react-native";

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
  subtitle: {
    fontSize: 14,

    fontStyle: "italic",
  },
  allContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBarBackground: {
    height: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "red",
    borderRadius: 10,
  },
  deleteIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
