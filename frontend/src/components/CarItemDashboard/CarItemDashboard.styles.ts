import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  carContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  carTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  carSubtitle: {
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Non-active background
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  activeSwitch: {
    backgroundColor: "#dedede", // Active background
  },
  expiredContainer: {
    padding: 20,
    alignItems: "center",
  },
});
