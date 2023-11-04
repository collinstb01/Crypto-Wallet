import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRcode({ text }) {
  return (
    <View
      style={[{ justifyContent: "center", alignItems: "center" }, styles.img]}
    >
      <QRCode value={text} color="#1c1c1e" size={150} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    // flex: 1,
    borderRadius: 15,
    width: 180,
    height: 180,
    backgroundColor: "white",
  },
});
