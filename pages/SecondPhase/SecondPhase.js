import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Step from "../../components/Step";
import ButtonGradient from "../../components/ButtonGradient";
import { ethers } from "ethers";
import { encryptionKey } from "../../constants/DATA";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
import "@ethersproject/shims";
import { useDispatch, useSelector } from "react-redux";
import { setSeed } from "../../features/StorageAuth/StorageAuth";
import Constants from "../../constants/styles";
import { _encryotData } from "../../constants/HelperFunctions";
import { usePreventScreenCapture } from "expo-screen-capture";

const SecondPhase = ({ navigation }) => {
  // usePreventScreenCapture();
  const [show, setshow] = useState(false);
  const [generating, setGenerating] = useState(true);
  const { seedPhrase, password } = useSelector((state) => state.storage);

  const dispatch = useDispatch();

  const words = [
    "apple",
    "banana",
    "cherry",
    "dog",
    "elephant",
    "fox",
    "grape",
    "horse",
    "igloo",
    "jellyfish",
    "kiwi",
    "lemon",
  ];

  // create seed

  const _saveWalletEncryptedData = async () => {
    console.log("----------generating---------------");
    setGenerating(true);
    const walletData = ethers.Wallet.createRandom();

    // create details
    let phrase = walletData.mnemonic.phrase;
    let arr = [...phrase.split(" ")];

    dispatch(setSeed({ seedPhrase: arr }));
    let privateKey = walletData.privateKey;
    let walletAddress = new ethers.Wallet(privateKey).address;

    // encrypt phrase
    const encryptedPhrase = CryptoJS.AES.encrypt(
      phrase,
      encryptionKey
    ).toString();

    const encryptPassword = await _encryotData({ data: password });
    let user = await AsyncStorage.getItem("user");
    let parseUser = JSON.parse(user);

    let newUser = {
      ...parseUser,
      password: encryptPassword,
      seedPrase: encryptedPhrase,
    };

    await AsyncStorage.setItem("user", JSON.stringify(newUser));

    const encryptedPrivateKey = CryptoJS.AES.encrypt(
      privateKey,
      encryptionKey
    ).toString();

    const encryptedWalletAddress = CryptoJS.AES.encrypt(
      walletAddress,
      encryptionKey
    ).toString();

    let wallet = {
      walletAddress: encryptedWalletAddress,
      privateKey: encryptedPrivateKey,
      name: "",
      active: 1,
      walletName: "",
    };

    const tokens = [
      {
        name: "Ethereum main Network",
        amount: 0,
        symbol: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        network: "eth",
        walletAddress: encryptedWalletAddress,
        chainId: 1,
        rpcURL:
          "https://eth-mainnet.g.alchemy.com/v2/XC3CF1s2-vjl609ZpkChVZywHbCzh-YI",
        sourceChainSelector: "ethereumMainnet",
      },

      {
        name: "Sepolia Test Network",
        amount: 0,
        symbol: "sepolia",
        address: "0x0000000000000000000000000000000000000000",
        network: "sepolia",
        walletAddress: encryptedWalletAddress,
        chainId: 11155111,
        rpcURL:
          "https://eth-sepolia.g.alchemy.com/v2/ZkFgCAUBdigtKoqowEjqdlyfjchhbvmg",
        sourceChainSelector: "ethereumSepolia",
      },
      {
        name: "Arbitrum Goerli",
        amount: 0,
        symbol: "arbitrumGoerli",
        address: "0x0000000000000000000000000000000000000000",
        network: "arbitrum",
        walletAddress: encryptedWalletAddress,
        chainId: 421613,
        rpcURL:
          "https://arb-goerli.g.alchemy.com/v2/50I1kzCppaf9HooVWz_Z4jueJAPs1dAT",
        sourceChainSelector: "avalancheFuji",
      },
      {
        name: "Polygon Mumbai",
        amount: 0,
        symbol: "polygonMumbai",
        address: "0x0000000000000000000000000000000000000000",
        network: "polygonMumbai",
        walletAddress: encryptedWalletAddress,
        chainId: 80001,
        rpcURL:
          "https://polygon-mumbai.g.alchemy.com/v2/v5XGTeB99ScNm1Kr5N7y_GsR0hT2NOsZ",
        sourceChainSelector: "polygonMumbai",
      },
    ];

    await AsyncStorage.setItem("tokens", JSON.stringify(tokens));
    await AsyncStorage.setItem("wallets", JSON.stringify([wallet]));
    setGenerating(false);
    console.log("----------generated---------------");
  };

  useEffect(() => {
    _saveWalletEncryptedData();
  }, []);

  return (
    <View style={Constants.container2Home}>
      <StatusBar translucent={false} />
      <Step one={2} navigation={navigation} />
      <Text style={styles.textOne}>Write Down Your Seed Phrase</Text>
      <Text style={styles.textTwo}>
        This is your seed phrase. Write it down on a paper and keep it in a safe
        place. You'll be asked to re-enter this phrase (in order) on the next
        step.
      </Text>
      <View
        style={[styles.box, { backgroundColor: !show ? "#131118" : "#09080c" }]}
      >
        {!show ? (
          <>
            <TouchableOpacity onPress={() => setshow(true)}>
              <Text style={{ fontWeight: "600", color: "white", fontSize: 20 }}>
                Tap to reveal your seed phrase
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#ffffffa8",
                  marginTop: 10,
                }}
              >
                Make sure no one is watching your screen.
              </Text>
              <View style={styles.seedButtonView}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1c1924",
                    borderRadius: 25,
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  <Image source={require("../../assets/eyeg.png")} />
                  <Text style={styles.seedButtonText}>
                    {generating ? "Generating Seed Phrase" : "View"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {seedPhrase?.map((val, index) => (
                <View style={{ width: 100, height: "auto" }} key={index}>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      backgroundColor: "#1c1924",
                      padding: 10,
                      marginTop: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: "#a6a0bb" }}>{index + 1}.</Text> {val}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
      <View style={{ marginTop: 80 }}>
        <ButtonGradient
          text={"Continue"}
          disabled={show ? false : true}
          route={"third-phase"}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default SecondPhase;

const styles = StyleSheet.create({
  seedButtonText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 18,
  },
  seedButtonView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    marginTop: 60,
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  textOne: {
    marginTop: 30,
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  textTwo: {
    marginTop: 20,
    letterSpacing: 0.4,
    textAlign: "center",
    lineHeight: 27,
    fontSize: 17,
    color: "white",
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#09080c",
  },
});
