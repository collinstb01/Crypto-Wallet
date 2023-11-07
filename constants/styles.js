import { Dimensions, Platform } from "react-native";

const statusBarHeight = Platform.OS === "ios" ? 65 : 20;
const InputHeight = Platform.OS === "ios" ? 23 : 15;

export default contantStyles = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: -140,
    left: 0,
    zIndex: 3,
  },
  input: {
    borderRadius: 10,
    padding: 15,
    paddingVertical: InputHeight,
    backgroundColor: "#1c1924",
    color: "#948fa8",
  },
  inputIcon: { position: "absolute", right: 50, top: 17 },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    paddingTop: statusBarHeight,
    // backgroundColor: "#09080d",
  },
  container2Home: {
    flex: 1,
    backgroundColor: "#09080d",
    padding: 15,
    paddingTop: statusBarHeight,
  },
  flex: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  flex2: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 20,
  },
  loading: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  success: {
    color: "green",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 19,
    marginTop: 10,
  },
  warning: {
    fontSize: 11,
    marginTop: 6,
    color: "orange",
    opacity: 0.6,
  },
  boxText: {
    color: "black",
  },
  box: {
    backgroundColor: "#f2f4f6",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "gray",
  },
  boxoverlay: {
    position: "absolute",
    left: 17,
    top: -11,
    fontWeight: "800",
    backgroundColor: "#cdb6ec",
    borderRadius: 50,
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  boxoverlayText: {
    fontWeight: "300",
    color: "white",
    fontSize: 13,
  },
  text: {
    color: "white",
  },
};
