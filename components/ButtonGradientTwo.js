import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const ButtonGradientTwo = ({ text, widthSp, disabled, func }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        style={[
          styles.button,
          { width: widthSp ? widthSp : "auto", backgroundColor: "#1c1924" },
        ]}
      >
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            func();
          }}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonGradientTwo;

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "800",
    fontSize: 19,
    color: "white",
    textAlign: "center",
  },
  button: {
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
});
