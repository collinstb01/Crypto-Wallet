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
      <View style={{ width: widthSp ? widthSp : 200 }}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            if (route == "func") {
              func();
              return;
            }
            if (route == "modal") {
              if (active == 2) {
                setShow((e) => ({
                  ...e,
                  show: false,
                  active: 0,
                }));
                navigation.navigate("secure-your-wallet-two");
              } else {
                return setShow((e) => ({
                  ...e,
                  show: true,
                  active: active + 1,
                }));
              }
            }
            navigation.navigate(route);
            // setShow(true);
          }}
        >
          <LinearGradient
            colors={["#85FFC4", "#5CC6FF", "#BC85FF"]}
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
