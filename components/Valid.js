import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { _formatAddr } from "../constants/HelperFunctions";

const Valid = ({ address, addressTwo }) => {
  const [addr, setAddr] = useState("");

  const getAddress = async () => {
    const d = await _formatAddr({ addr: address });
    setAddr(d);
  };
  useEffect(() => {
    if (!address) return;
    getAddress();
  }, [address]);

  console.log(address);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={require("../assets/face1.png")} style={styles.img} />
      <Text style={[styles.text2, { color: "white", fontWeight: "500" }]}>
        {addressTwo ? addressTwo : addr}
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
