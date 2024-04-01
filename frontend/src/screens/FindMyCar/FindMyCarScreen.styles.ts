import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20,
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
});
