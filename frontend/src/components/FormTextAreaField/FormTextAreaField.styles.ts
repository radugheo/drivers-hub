import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start", // Align start for the icon to be at the top
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "OktahRound-Regular",
    textAlignVertical: "top", // Ensures text starts from the top
    height: 100, // Set a fixed height or make it dynamic based on content
  },
});
