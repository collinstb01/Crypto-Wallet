import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Valid = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={require("../assets/face1.png")} style={styles.img} />
      <Text style={[styles.text2, { color: "white", fontWeight: "500" }]}>
        0x3Dc6...Dxe2
      </Text>
    </View>
  );
};
export default Valid;

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
