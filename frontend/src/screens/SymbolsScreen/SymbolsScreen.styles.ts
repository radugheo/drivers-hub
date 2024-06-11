import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  safeContainer: {
    flex: 1,
    paddingBottom: 30,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  instructions: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  labelsContainer: {
    marginTop: 20,
  },
  labelsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
