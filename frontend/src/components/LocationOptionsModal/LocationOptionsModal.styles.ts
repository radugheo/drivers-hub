import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
  fabGroup: {
    marginBottom: 90,
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden",
  },
  fabContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    margin: 8,
    paddingVertical: 14,
    borderRadius: 25,
    width: (width - 40) / 5,
    height: 70,
  },
  fabText: {
    fontSize: 12,
    fontFamily: "OktahRound-Regular",
    color: "gray",
  },
});
