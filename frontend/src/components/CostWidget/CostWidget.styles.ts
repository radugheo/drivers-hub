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
  boldText: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
  },
  progressBarBackground: {
    height: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    overflow: "hidden",
  },
  progressBarSegment: {
    height: "100%",
  },
  costContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  costItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 12,
    fontFamily: "OktahRound-Regular",
  },
  textValue: {
    fontSize: 12,
    fontFamily: "OktahRound-Regular",
  },
});
