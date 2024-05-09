import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  carItem: {
    backgroundColor: "white",
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carTitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  carLicense: {
    fontSize: 14,
    fontFamily: "OktahRound-Regular",
    color: "gray",
    paddingLeft: 10,
  },
  carImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
