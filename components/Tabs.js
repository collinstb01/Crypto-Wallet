import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tabs = ({ route, navigation }) => {
  const { index } = route.params;

  console.log(index);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <View style={{ alignItems: "center" }}>
          <Ionicons
            name="md-wallet-sharp"
            size={20}
            color={index == 1 ? "white" : "#ffffff3d"}
            style={[styles.icon]}
          />
          <Text style={[styles.text]}>Wallet</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("swap-tokens", {
            index: 2,
          })
        }
      >
        <View style={{ alignItems: "center" }}>
          <Ionicons
            name="md-swap-horizontal"
            size={20}
            color={index == 2 ? "white" : "#ffffff3d"}
            style={[styles.icon]}
          />
          <Text style={[styles.text]}>Swap</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("transactions", {
            index: 3,
          })
        }
      >
        <View style={{ alignItems: "center" }}>
          <Ionicons
            name="list"
            size={20}
            color={index == 3 ? "white" : "#ffffff3d"}
            style={[styles.icon]}
          />
          <Text style={[styles.text]}>Transaction</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("settings", {
            index: 4,
          })
        }
      >
        <View style={{ alignItems: "center" }}>
          <Ionicons
            name="md-settings"
            size={20}
            color={index == 4 ? "white" : "#ffffff3d"}
            style={[styles.icon]}
          />
          <Text style={[styles.text]}>Settings</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    backgroundColor: "#121117",
    width: Dimensions.get("screen").width,
    position: "absolute",
    zIndex: 2222,
    bottom: 0,
    left: 0,
    flexDirection: "row",
    height: 70,
    justifyContent: "space-around",
    paddingTop: 13,
  },
});
