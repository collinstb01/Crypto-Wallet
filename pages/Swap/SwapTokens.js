import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Tabs from "../../components/Tabs";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import NameAndNetwork from "../../components/NameAndNetwork";
import Constants from "../../constants/styles";
import { useState } from "react";
import { useEffect } from "react";
import { _getActiveNetwork, _getTokens } from "../../constants/HelperFunctions";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ButtonGradient from "../../components/ButtonGradient";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setSwapReceiveToken,
  setSwapSendToken,
} from "../../features/StorageAuth/StorageAuth";
import { Pressable } from "react-native";
import ResuableModalCTN from "../../components/ResuableModalCTN";

const Swap = ({ route, navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();
  const [activeNetwork, setActiveNetwork] = useState(null);
  const { swapSendToken, swapReceiveToken } = useSelector(
    (state) => state.storage
  );
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const getActiveNetwork = async () => {
    const data = await _getActiveNetwork();
    setActiveNetwork(JSON.parse(data));
  };

  const getTokens = async () => {
    const data = await _getTokens();
    const parseData = JSON.parse(data);
    let obj = {
      address: parseData[0].address,
      amount: parseData[0].amount,
      chaindId: parseData[0].chaindId,
      decimals: parseData[0].decimals,
      name: parseData[0].name,
      network: parseData[0].network,
      rpcURL: parseData[0].rpcURL,
      symbol: parseData[0].symbol,
      walletAddress: parseData[0].walletAddress,
    };
    let obj2 = {
      address: parseData[1].address ? parseData[1].address : "",
      amount: parseData[1].amount ? parseData[1].amount : "",
      chaindId: parseData[1].chaindId ? parseData[1].chaindId : "",
      decimals: parseData[1].decimals ? arseData[1].decimals : "",
      name: parseData[1].name ? parseData[1].name : "",
      network: parseData[1].network ? parseData[1].network : "",
      rpcURL: parseData[1].rpcURL ? parseData[1].rpcURL : "",
      symbol: parseData[1].symbol ? parseData[1].symbol : "",
      walletAddress: parseData[1].walletAddress
        ? parseData[1].walletAddress
        : "",
    };
    dispatch(setSwapReceiveToken({ ...obj2 }));
    dispatch(setSwapSendToken({ ...obj }));
  };

  const handleChangePositions = () => {
    dispatch(setSwapReceiveToken({ ...swapSendToken }));
    dispatch(setSwapSendToken({ ...swapReceiveToken }));
  };

  const handleRoute = ({ type, symbol }) => {
    navigation.navigate("swap/list-tokens", { type: type, symbol: symbol });
  };

  const handleSetShow = () => {
    setShow(true);
  };
  useEffect(() => {
    getTokens();
    getActiveNetwork();
  }, []);

  return (
    <View style={[Constants.container2Home]}>
      {!isScrolling && <Tabs navigation={navigation} route={route} />}
      {show && <View style={Constants.overlay}></View>}

      <ScrollView onScroll={handleScroll}>
        <View style={{ marginBottom: 50 }}>
          <NameAndNetwork
            show={false}
            activeNetwork={activeNetwork}
            setShow={() => console.log("")}
            setShowPerson={() => console.log("")}
          />
          <View style={[styles.swap_container]}>
            <View style={[styles.containerOne, styles.border]}>
              <View>
                <Text style={[styles.text, styles.swapFrom]}>Swap from</Text>
                <Text style={[styles.text, styles.amount]}>0</Text>
                <Text style={[styles.text, styles.balance]}>
                  Balance: {swapSendToken?.amount?.toString()?.slice(0, 6)}
                </Text>
              </View>
              <View style={[styles.left]}>
                <View style={{ marginRight: 15 }}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>
                      {swapSendToken?.symbol?.charAt(0)?.toUpperCase()}
                    </Text>
                    <View style={styles.boxoverlay}>
                      <Text style={styles.boxoverlayText}>
                        {swapSendToken?.symbol?.charAt(0)?.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() =>
                    handleRoute({ type: "send", symbol: swapSendToken.symbol })
                  }
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text style={[styles.text, styles.tokenSymbol]}>
                    {swapSendToken?.symbol?.toUpperCase()}
                  </Text>
                  <AntDesign name="down" size={18} color="white" />
                </Pressable>
              </View>

              <TouchableOpacity
                onPress={handleChangePositions}
                style={[styles.changeTOken]}
              >
                <View>
                  <Ionicons
                    name="ios-swap-vertical"
                    size={24}
                    color="#91a4fd"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.containerOne]}>
              <View>
                <Text style={[styles.text, styles.swapFrom]}>Swap to</Text>
                <Text style={[styles.text, styles.amount]}>0</Text>
                <Text style={[styles.text, styles.balance]}>
                  Balance: {swapReceiveToken?.amount?.toString()?.slice(0, 6)}
                </Text>
              </View>
              <View style={[styles.left]}>
                <View style={{ marginRight: 15 }}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>
                      {swapReceiveToken?.symbol?.charAt(0)?.toUpperCase()}
                    </Text>
                    <View style={styles.boxoverlay}>
                      <Text style={styles.boxoverlayText}>
                        {swapReceiveToken?.symbol?.charAt(0)?.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() =>
                    handleRoute({
                      type: "receive",
                      symbol: swapReceiveToken.symbol,
                    })
                  }
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text style={[styles.text, styles.tokenSymbol]}>
                    {swapReceiveToken?.symbol?.toUpperCase()}
                  </Text>
                  <AntDesign name="down" size={18} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <Text style={[Constants.warning, { textAlign: "center" }]}>
          NOT WORKING
        </Text>
        <View style={{ marginTop: 20 }}>
          <ButtonGradient
            text={"Swap"}
            widthSp={200}
            func={handleSetShow}
            route={"func"}
          />
        </View>
      </ScrollView>
      {show && (
        <ResuableModalCTN
          showBackFunc={() => setShow(false)}
          text={"Verify Swap"}
          showBack={true}
          setShow={setShow}
        >
          <View>
            <View style={[styles.top, { marginVertical: 30 }]}>
              <View style={styles.s}>
                <View>
                  <Text style={[styles.text, styles.text1]}>You Swap</Text>
                  <Text style={[styles.text, styles.text2]}>0.22 ETH</Text>
                </View>
                <View>
                  <Text style={[styles.text, styles.text1]}>You Swap</Text>
                  <Text style={[styles.text, styles.text2]}>0.22 ETH</Text>
                </View>
              </View>
              <View>
                <Ionicons name="ios-swap-vertical" size={24} color="#91a4fd" />
              </View>
            </View>
            <View style={styles.boxs}>
              <View style={styles.boxDetail}>
                <Text style={[styles.boxText1]}>Slippage Tolerance</Text>
                <Text style={[styles.boxText2]}>0.25%</Text>
              </View>
              <View style={styles.boxDetail}>
                <Text style={[styles.boxText1]}>Deposit 1INCH To</Text>
                <Text style={[styles.boxText2]}>0.25%</Text>
              </View>
              <View style={styles.boxDetail}>
                <Text
                  style={[styles.boxText1, { fontSize: 20, fontWeight: "600" }]}
                >
                  Total Amount
                </Text>
                <Text
                  style={[styles.boxText2, { fontSize: 20, fontWeight: "600" }]}
                >
                  0.233333
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <ButtonGradient text={"Proceed with Swap"} />
            </View>
          </View>
        </ResuableModalCTN>
      )}
    </View>
  );
};

export default Swap;

const styles = StyleSheet.create({
  boxText1: {
    color: "white",
  },
  boxText2: {
    color: "white",
  },
  boxDetail: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  boxs: {
    padding: 20,
    backgroundColor: "#1c1924",
    borderRadius: 15,
  },
  text1: {
    color: "gray",
    marginBottom: 10,
  },
  text2: {
    fontSize: 20,
    marginBottom: 10,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  changeTOken: {
    backgroundColor: "#323134",
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 50,
    top: 130,
    right: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#323134",
  },
  swapFrom: {
    fontSize: 16,
  },
  balance: {
    color: "#ffffff8a",
  },
  amount: {
    fontSize: 40,
    fontWeight: "800",
    marginVertical: 5,
    color: "#ffffff8a",
  },
  tokenSymbol: {
    marginRight: 10,
    fontWeight: "600",
    fontSize: 19,
  },
  Image: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
  },
  swap_container: {
    marginTop: 30,
    backgroundColor: "#ffffff14",
    borderRadius: 15,
  },
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#09080d",
    padding: 15,
    paddingTop: 20,
  },
  boxText: {
    color: "black",
  },
  box: {
    backgroundColor: "#f2f4f6",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "gray",
  },
  boxoverlay: {
    position: "absolute",
    left: 17,
    top: -11,
    fontWeight: "800",
    backgroundColor: "#cdb6ec",
    borderRadius: 50,
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  boxoverlayText: {
    fontWeight: "300",
    color: "white",
    fontSize: 13,
  },
  text: {
    color: "white",
  },
  changeTOken: {
    backgroundColor: "#323134",
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 50,
    top: 130,
    right: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
