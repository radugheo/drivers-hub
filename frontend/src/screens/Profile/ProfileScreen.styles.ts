import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
  },
  headerLeft: {
    flexDirection: "column",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "grey",
    marginBottom: 5,
    marginLeft: 5,
  },
  emailContainerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    alignItems: "center",
  },
  fieldAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fieldLabel: {
    fontSize: 16,
    color: "grey",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
  },
  actionText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
