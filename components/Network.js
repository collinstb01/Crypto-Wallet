import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Network = ({ bg, text, underline, fontSize }) => {
  return (
    <View style={styles.f}>
      <View style={[styles.circle, { backgroundColor: `#${bg}` }]}></View>
      <View>
        <Text
          style={[
            styles.text,
            styles.network,
            fontSize && { fontSize: fontSize, fontWeight: "600" },
            underline && { borderWidth: 1, borderBottomColor: "white" },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default Network;

const styles = StyleSheet.create({
  circle: {
    height: 7,
    width: 7,
    borderRadius: 100,
    marginRight: 5,
    marginLeft: 5,
  },
  f: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
