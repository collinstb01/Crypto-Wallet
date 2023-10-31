import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

export default function QRcode() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image source={require("../assets/qrcode.png")} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    borderRadius: 15,
    width: 200,
    height: 200,
    backgroundColor: "white",
  },
});
