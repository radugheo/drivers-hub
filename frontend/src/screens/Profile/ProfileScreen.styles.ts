import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius:25,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  safeContainer: {
    backgroundColor: "white",
    borderRadius:25,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },
  profileData: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    color: "grey",
    marginBottom: 5,
    marginLeft: 5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  carsNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 25,
  },
  lastActionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingLeft: 0,
  },
  actionText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
