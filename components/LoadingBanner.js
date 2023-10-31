import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";

export default function LoadingBanner({ bg, text1, text2, type }) {
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Fontisto
        name={type == "success" ? "check" : "spinner"}
        size={38}
        color={"#feaa2e"}
      />
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  text2: {
    opacity: 0.6,
    marginTop: 3,
    color: "white",
  },
  container: {
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});
