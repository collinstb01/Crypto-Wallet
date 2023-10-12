import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ButtonGradient from "../../components/ButtonGradient";

const Recent = ({ navigation, valid }) => {
  const func = () => {
    navigation.navigate("send-token/amount");
  };
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "column",
        },
        valid && { justifyContent: "space-between" },
      ]}
    >
      <Text
        style={[
          {
            color: "white",
            fontWeight: "600",
            fontSize: 20,
            marginBottom: 30,
          },
          valid && { marginTop: 20, fontSize: 12 },
        ]}
      >
        {valid ? "Click Next to Proceed" : "Recent"}
      </Text>
      {!valid && (
        <View>
          {[1, 2, 3].map((val, index) => (
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <Image
                source={require("../../assets/face1.png")}
                style={styles.img}
              />
              <View>
                <Text style={[styles.text1, { color: "white" }]}>Beexay</Text>
                <Text style={[styles.text2, { color: "white" }]}>
                  0x3Dc6...Dxe2
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
      {valid && (
        <View style={{ marginTop: 50 }}>
          <ButtonGradient text={"Next"} func={func} route={"func"} />
        </View>
      )}
    </View>
  );
};

export default Recent;

const styles = StyleSheet.create({
  text1: {
    fontSize: 18,
    fontWeight: "500",
  },
  text2: {},
  img: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
});