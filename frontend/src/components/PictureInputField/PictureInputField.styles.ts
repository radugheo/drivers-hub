import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    padding: 10,
    justifyContent: "space-between",
  },
  selectedImageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageName: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "OktahRound-Regular",
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "OktahRound-Regular",
  },
});
