import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const ResuableModalCTN = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={styles.bar}></View>
      </View>
      {children}
    </View>
  );
};

export default ResuableModalCTN;

const styles = StyleSheet.create({
  bar: {
    borderRadius: 25,
    width: 50,
    height: 6,
    backgroundColor: "#ffffffb3",
    position: "relative",
    // left: 150,
    top: -33,
  },
  container: {
    padding: 20,
    // backgroundColor: "blue",
    backgroundColor: "#131118",
    fontWeight: "600",
    position: "absolute",
    width: Dimensions.get("window").width,
    // height: 400,
    bottom: 0,
    borderTopRightRadius: 25,
    zIndex: 22,
    borderTopLeftRadius: 25,
  },
});
