import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Empty = ({ text }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
        {text}
      </Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
