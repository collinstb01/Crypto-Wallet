import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import Recent from "../../sections/SendToken/Recent";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import constantStyle from "../../constants/styles";
import Valid from "../../components/Valid";
import {
  _decryotData,
  _getWallets,
  _setWallets,
  _encryotData,
} from "../../constants/HelperFunctions";
import { Pressable } from "react-native";
import UseBarCodeScanner from "../../components/useBarCodeScanner";

const SendToken = ({ navigation }) => {
  const [receiveingAddr, setReceivingAddr] = useState("");
  const [wallets, setWallets] = useState(null);
  const [show, setShow] = useState(false);
  const [activeWallet, setActiveWallet] = useState({
    WalletAddress: "",
    WalletName: "",
    WalletAddressNoFormat: "",
  });
  const [valid, setValid] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleChange = async (e) => {
    setReceivingAddr(e);
    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(e)) {
      // Check if the address is 40 hexadecimal characters with or without the "0x" prefix.
      return setValid(false);
    }

    if (/^(0x)?[0]{40}$/.test(e)) {
      // Check if the address is not an empty address (40 zeros).
      return setValid(false);
    }
    let encrypt = await _encryotData({ data: e });
    setReceivingAddr(encrypt);

    Keyboard.dismiss(); // Close the keyboard
    return setValid(true);
  };

  const getUserWallets = async () => {
    const data = await _getWallets();
    setWallets(JSON.parse(data));

    const active = JSON.parse(data).find((val) => val.active == 1);
    let address = await _decryotData({ encryptedData: active.walletAddress });

    setActiveWallet((prev) => ({
      ...prev,
      WalletAddress: `${address.split("").splice(0, 4).join("")}.....${address
        .split("")
        .splice(34)
        .join("")}`,
      WalletAddressNoFormat: address,
      WalletName: active.walletName,
    }));
  };

  const handleSetShow = () => {
    setShow((e) => !e);
  };

  const handleChangeActive = async ({ walletAddress }) => {
    await _setWallets({ walletAddress: walletAddress });
    setShow(false);
    getUserWallets();
  };

  const handleShowScanner = () => {
    setShowScanner((e) => !e);
  };

  const onBarCodeScanned = async ({ text: e }) => {
    handleChange(e);
  };

  const backFunc = () => {
    navigation.goBack();
  };

  const handleSetAcc = async () => {
    let encrypt = await _encryotData({ data: activeWallet.WalletAddress });
    setReceivingAddr(encrypt);
    setValid(true);
  };

  useEffect(() => {
    getUserWallets();
  }, []);

  return (
    <ReusableCard navigation={navigation} text={"Send To"} backFunc={backFunc}>
      {showScanner && (
        <UseBarCodeScanner
          onBarCodeScanned={onBarCodeScanned}
          setShow={setShowScanner}
        />
      )}

      <ScrollView style={styles.container}>
        <Pressable onPress={handleSetShow}>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              // placeholder="Account Name"
              style={[styles.input, constantStyle.input]}
              placeholderTextColor={"#a49eb9"}
              editable={false}
            />
            <View style={{ position: "absolute", top: 5, left: 15 }}>
              <Text style={{ color: "#858096", marginBottom: 5 }}>From</Text>
              <Valid addressTwo={activeWallet.WalletAddress} />
            </View>
            <Ionicons
              name="chevron-down"
              size={20}
              color="#948fa8"
              style={constantStyle.inputIcon}
            />
          </View>
        </Pressable>
        {show &&
          wallets
            ?.filter((val) => val.active == 0)
            ?.map((val, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  handleChangeActive({ walletAddress: val.walletAddress })
                }
              >
                <View style={{ marginBottom: 20 }} key={index}>
                  <TextInput
                    // placeholder="Account Name"
                    style={[styles.input, constantStyle.input]}
                    placeholderTextColor={"#a49eb9"}
                    editable={false}
                  />
                  <View style={{ position: "absolute", top: 5, left: 15 }}>
                    <Text style={{ color: "#858096", marginBottom: 5 }}></Text>
                    <Valid address={val.walletAddress} />
                  </View>
                </View>
              </Pressable>
            ))}
        <View>
          <TextInput
            placeholder={valid ? "" : "Search, public address (0x), or ENS"}
            style={[styles.input, constantStyle.input]}
            placeholderTextColor={"#a49eb9"}
            onChangeText={(e) => handleChange(e)}
            value={valid ? "" : receiveingAddr}
            editable={valid == false && true}
          />
          {valid && (
            <View style={{ position: "absolute", top: 5, left: 15 }}>
              <Text style={{ color: "#858096", marginBottom: 5 }}>To</Text>
              <Valid address={receiveingAddr} />
            </View>
          )}
          {!receiveingAddr && (
            <Pressable
              style={constantStyle.inputIcon}
              onPress={handleShowScanner}
            >
              {showScanner ? (
                <MaterialIcons name="cancel" size={20} color="#948fa8" />
              ) : (
                <Ionicons
                  name={showScanner ? "cancel" : "md-scan"}
                  size={20}
                  color="#948fa8"
                />
              )}
            </Pressable>
          )}
          {valid && (
            <MaterialIcons
              name="cancel"
              size={20}
              color="#948fa8"
              style={constantStyle.inputIcon}
              onPress={() => {
                setReceivingAddr("");
                setValid(false);
              }}
            />
          )}
          <Text style={constantStyle.warning}>
            Enter A valid Address to continue
          </Text>
        </View>
        {!valid && (
          <>
            <Pressable onPress={handleSetAcc}>
              <Text style={styles.txBtwAcc}>Transfer To Active Accounts</Text>
            </Pressable>
          </>
        )}
        <Recent
          valid={valid}
          navigation={navigation}
          to={receiveingAddr}
          from={activeWallet.WalletAddressNoFormat}
          handleChange={handleChange}
        />
      </ScrollView>
    </ReusableCard>
  );
};

export default SendToken;

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  txBtwAcc: {
    fontWeight: "600",
    color: "#0b6df6",
    marginTop: 20,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#0b6ef8",
    width: 168,
  },
  input: {
    color: "white",
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
