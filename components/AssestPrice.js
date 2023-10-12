import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const AssestPrice = ({ showTokenPrice }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={[styles.border]}>
          <Image
            source={require(`../assets/sym3.png`)}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <View style={{}}>
          <Text style={styles.text1}>Ethereum</Text>
          <Text style={styles.text2}>{"Eth".toLocaleUpperCase()}</Text>
        </View>
      </View>
      {showTokenPrice && (
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <Text style={styles.text1}>10.059</Text>
          <Text style={styles.text2}>$22,019</Text>
        </View>
      )}
    </View>
  );
};

export default AssestPrice;

const styles = StyleSheet.create({
  border: {
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: "#1c1c1e",
    width: 40,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    opacity: 0.7,
    color: "white",
  },
  text1: {
    fontWeight: "600",
    fontSize: 18,
    color: "white",
  },
});
