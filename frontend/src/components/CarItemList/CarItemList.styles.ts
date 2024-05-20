import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  carItem: {
    backgroundColor: "white",
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
    height: "100%",
  },
  carTitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  carYear: {
    fontSize: 14,
    fontFamily: "OktahRound-Regular",
    color: "gray",
    paddingLeft: 10,
  },
  carLicense: {
    fontSize: 14,
    fontFamily: "OktahRound-Regular",
    color: "gray",
    paddingLeft: 10,
  },
  carImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#5D5DFF",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontFamily: "OktahRound-Regular",
    fontSize: 16,
  },
});
