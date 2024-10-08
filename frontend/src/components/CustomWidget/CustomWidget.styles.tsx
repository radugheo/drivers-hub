import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "OktahRound-Regular",
  },
  subtitle: {
    fontSize: 14,
    fontStyle: "italic",
  },
  allContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
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
