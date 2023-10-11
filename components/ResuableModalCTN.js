import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const ResuableModalCTN = ({
  children,
  text,
  setShow,
  showBack,
  showBackFunc,
}) => {
  const handlePanResponderMove = (event) => {
    if (event.nativeEvent.translationY > 10) {
      setShow(false);
    }
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <PanGestureHandler onHandlerStateChange={handlePanResponderMove}>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={styles.bar}></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {showBack && (
                <Pressable onPress={showBackFunc}>
                  <View
                    style={{
                      paddingRight: 0,
                      position: "relative",
                      left: -100,
                    }}
                  >
                    <Ionicons name="chevron-back" size={18} color="white" />
                  </View>
                </Pressable>
              )}
              <Text style={styles.desc1}>{text}</Text>
            </View>
            {children}
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
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
