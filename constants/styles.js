import { Dimensions } from "react-native";

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
};
