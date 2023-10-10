import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tabs = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Ionicons
          name="md-wallet-sharp"
          size={20}
          color="white"
          style={[styles.icon]}
        />
        <Text style={[styles.text]}>Wallet</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Ionicons
          name="md-swap-horizontal"
          size={20}
          color="white"
          style={[styles.icon]}
        />
        <Text style={[styles.text]}>Swap</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Ionicons name="list" size={20} color="white" style={[styles.icon]} />
        <Text style={[styles.text]}>Transaction</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Ionicons
          name="md-settings"
          size={20}
          color="white"
          style={[styles.icon]}
        />
        <Text style={[styles.text]}>Wallet</Text>
      </View>
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
