import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  carItem: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  carLicense: {
    fontSize: 14,
    color: "gray",
  },
  carImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
