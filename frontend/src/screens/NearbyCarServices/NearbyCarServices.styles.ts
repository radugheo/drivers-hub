import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  calloutStyle: {
    minWidth: 200,
    maxWidth: 300,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calloutOpenInMaps: {
    flexDirection: "row",
    alignItems: "center",
  },
  openInMapsText: {
    color: "blue",
    fontSize: 14,
    marginRight: 5,
    fontFamily: "OktahRound-Regular",
  },
  travelTimeText: {
    fontSize: 14,
    paddingVertical: 4,
    fontFamily: "OktahRound-Regular",
  },
});
