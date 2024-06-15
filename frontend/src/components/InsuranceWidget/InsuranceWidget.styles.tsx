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
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "OktahRound-Regular",
  },
  progressBarBackground: {
    height: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "green",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "OktahRound-Regular",
  },
  boldText: {
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
  },
  daysText: {
    fontFamily: "OktahRound-Regular",
  },
  datesContainer: {
    paddingLeft: 10,
    paddingRight: 10,
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
