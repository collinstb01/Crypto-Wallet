import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonGradient from "./ButtonGradient";
import ButtonGradientTwo from "./ButtonGradientTwo";
import { _decryotData, onShare } from "../constants/HelperFunctions";
import CopyToClipboard from "./CopyToClipboard";
import QRcode from "./QRcode";

const QRCodeReceiveToken = ({ navigation, setText, text, activeWallet }) => {
  const [ActiveWallet, setActiveWallet] = useState("");

  async function decrypt() {
    const walletAddress = await _decryotData({
      encryptedData: activeWallet.walletAddress,
    });
    setActiveWallet(walletAddress);
  }

  const handlePayment = () => {
    navigation.navigate("send-token");
  };

  const handleFuncShare = () => {
    onShare({ activeWallet: ActiveWallet });
  };
  useEffect(() => {
    decrypt();
  }, [activeWallet]);

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
          <QRcode text={ActiveWallet ? ActiveWallet : "Loading..."} />
        </View>

        <View>
          <Text style={styles.textAddress}>{ActiveWallet}</Text>
          <CopyToClipboard text={ActiveWallet} />
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
          <ButtonGradientTwo text={"Share"} func={handleFuncShare} />
        </View>
        <ButtonGradient
          // setShow={setShow}
          text={"Send Money"}
          route={"func"}
          // widthSp={200}
          func={handlePayment}
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
    maxWidth: 120,
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
