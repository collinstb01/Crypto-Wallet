import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const ButtonGradient = ({
  navigation,
  text,
  route,
  setShow,
  active,
  widthSp,
  disabled,
  func,
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View style={{ width: widthSp ? widthSp : "auto" }}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            if (route == "func") {
              func();
              return;
            }
            navigation.navigate(route);
            // setShow(true);
          }}
        >
          <LinearGradient
            colors={[
              disabled ? "gray" : "#85FFC4",
              disabled ? "gray" : "#5CC6FF",
              disabled ? "gray" : "#BC85FF",
            ]}
            end={{ x: 0.1, y: 0.2 }}
            start={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{text}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonGradient;

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
