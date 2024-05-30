import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  crosshair: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -5 }, { translateY: -5 }],
    alignItems: "center",
    justifyContent: "center",
  },
  crosshairLine: {
    position: "absolute",
    backgroundColor: "black",
  },
  verticalLine: {
    height: 20,
    width: 2,
  },
  horizontalLine: {
    width: 20,
    height: 2,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    paddingHorizontal: 10,
    zIndex: 2,
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#dedede",
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  recenterButton: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: 50
  },
  activeSwitch: {
    backgroundColor: "black", 
  },
  statusTextActive: {
    fontFamily: "OktahRound-Regular",
    color: "white"
  },
  statusTextInactive: {
    fontFamily: "OktahRound-Regular",
    color: "black"
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
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});
