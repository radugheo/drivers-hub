import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#092b3d",
    borderRadius: 25, // Make this half of width and height
    width: 50, // Set a specific width for the circle
    height: 50, // Set a specific height for the circle
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 30, // Adjust size as needed
    fontFamily: "OktahRound-Regular", // Ensure this font supports the size
    lineHeight: 35,
    paddingLeft: 2, // Adjust as needed
    includeFontPadding: false, // Android-specific option to reduce extra padding around text
  },
});
