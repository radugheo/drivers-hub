import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  carContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  carTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    paddingLeft: 10,
  },
  carSubtitle: {
    fontSize: 14,
    fontFamily: "OktahRound-Regular",
    color: "gray",
    paddingLeft: 10,
  },
  statusText: {
    fontFamily: "OktahRound-Regular",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
    height: "100%",
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0", 
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  addButton: {
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "black",
  },
  activeSwitch: {
    backgroundColor: "#dedede", 
  },
  expiredContainer: {
    padding: 20,
    alignItems: "center",
  },
});
