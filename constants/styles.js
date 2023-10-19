import { Dimensions, Platform } from "react-native";

const statusBarHeight = Platform.OS === "ios" ? 65 : 20;

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
    backgroundColor: "#1c1924",
  },
  inputIcon: { position: "absolute", right: 50, top: 17 },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: "#09080d",
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
};
