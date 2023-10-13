import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ButtonGradient from "../components/ButtonGradient";

const Collectibles = () => {
  const func = () => {};

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text1]}>Collectibles</Text>
        <Text style={[styles.text2]}>Collectibles</Text>
      </View>
      <View style={styles.igg}>
        <Image
          source={require("../assets/ill2.png")}
          style={{ width: 160, height: 160 }}
        />
      </View>
    </View>
  );
};

export default Collectibles;

const styles = StyleSheet.create({
  igg: {
    width: 250,
    height: 250,
    right: -80,
    top: -35,
    position: "absolute",
  },
  text2: {
    color: "white",
    opacity: 0.7,
    marginTop: 10,
  },
  text1: {
    fontSize: 23,
    color: "white",
    fontWeight: "700",
  },
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "#121117",
    marginTop: 20,
    flexDirection: "row",
    padding: 30,
    justifyContent: "space-between",
    height: 100,
  },
});
