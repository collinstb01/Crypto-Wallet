import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import Clipboard from "@react-native-clipboard/clipboard";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ButtonGradient from "./ButtonGradient";
import ButtonGradientTwo from "./ButtonGradientTwo";

const QRCodeReceiveToken = ({ navigation, setText, text }) => {
  const [copied, setCopied] = useState("");

  const copyToClipBoard = () => {
    // console.log(text);
    // if (text) {
    //   Clipboard.setString("text.toString()");
    //   setCopied(true);
    // }
    // setTimeout(() => {
    //   setCopied(false);
    // }, 4000);
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 25,
            marginRight: 20,
          }}
        >
          <Image source={require("../assets/qrcode.png")} style={styles.img} />
        </View>

        <View>
          <Text style={styles.textAddress}>
            0x558A03Ea3052620c34D12fA3A1500EbA7D135bE9
          </Text>
          <Pressable onPress={() => copyToClipBoard()}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Ionicons
                name={copied ? "ios-checkmark" : "ios-copy"}
                size={24}
                color="#8d36e7"
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  marginHorizontal: 10,
                  fontSize: 16,
                }}
              >
                Copy
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ marginRight: 20 }}>
          <ButtonGradientTwo text={"Share"} widthSp={true} />
        </View>
        <ButtonGradient
          // setShow={setShow}
          text={"Request Payment"}
          route={"func"}
          widthSp={true}
          // func={}
          navigation={navigation}
        />
      </View>
    </>
  );
};

export default QRCodeReceiveToken;

const styles = StyleSheet.create({
  img: {
    borderRadius: 20,
    width: 200,
    height: 200,
  },
  textAddress: {
    color: "white",
    fontSize: 22,
    maxWidth: 100,
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 30,
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
