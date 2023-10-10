import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";

const ResuableModalCTN = ({ children, text }) => {
  const handlePanResponderMove = (event) => {
    if (event.nativeEvent.deltaY > 20) {
      console.log("sssssssssssssssss");
    }
  };

  return (
    <PanGestureHandler onPanResponderMove={handlePanResponderMove}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.bar}></View>
        </View>
        <Text style={styles.desc1}>{text}</Text>
        {children}
      </View>
    </PanGestureHandler>
  );
};

export default ResuableModalCTN;

const styles = StyleSheet.create({
  desc1: {
    textAlign: "center",
    color: "white",
    fontSize: 21,
    fontWeight: "700",
  },
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
    zIndex: 22333,
    borderTopLeftRadius: 25,
  },
});
