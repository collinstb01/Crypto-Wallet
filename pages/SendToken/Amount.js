import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import constants from "../../constants/styles";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Keyboard from "../../components/Keyboard";
import { _getTokens } from "../../constants/HelperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setSendToken } from "../../features/StorageAuth/StorageAuth";
import { Pressable } from "react-native";
import { ethers } from "ethers";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import { supportedNetworks } from "../../constants/CCIPconfig/CCIPconfig";

const Amount = ({ route, navigation }) => {
  function backFunc() {
    navigation.goBack();
  }
  const { sendToken } = useSelector((state) => state.storage);
  const [valueArr, setValueArr] = useState([0]);
  const [showSendTokenTOAnotherChain, setshowSendTokenTOAnotherChain] =
    useState(false);
  const [tokensArr, setTokens] = useState(null);
  const [selectedToken, setSelectedToken] = useState({
    address: "",
    name: "",
    network: "",
    symbol: "",
    amount: null,
  });
  const [selectedTokenChain, setSelectedTokenChain] = useState({
    name: "",
    sourceName: "",
    color: "",
  });
  const [show, setShow] = useState();

  const dispatch = useDispatch();

  console.log(selectedToken);
  const handleRoute = () => {
    dispatch(
      setSendToken({
        amount: parseFloat(valueArr.join("")),
        tokenAddress: selectedToken.address,
        id: selectedToken.network,
        to: sendToken.to,
        from: sendToken.from,
        symbol: selectedToken.symbol,
      })
    );
    navigation.navigate("send-token/confirm", {
      name: selectedTokenChain.name,
      sourceName: selectedTokenChain.sourceName,
      color: selectedTokenChain.color,
    });
    setValueArr([0]);
  };

  async function getUserTokens() {
    let tokens = await _getTokens();
    let parseTokens = JSON.parse(tokens);
    setTokens(parseTokens);
    setSelectedToken((prev) => ({
      ...prev,
      address: parseTokens[0].address,
      name: parseTokens[0].name.split(" ")[0],
      network: parseTokens[0].network,
      symbol: parseTokens[0].symbol,
      amount: parseTokens[0].amount,
    }));
  }

  const handleSetMAX = () => {
    setValueArr([selectedToken.amount]);
  };

  const handleSetTokenToSend = ({ address, name, network, symbol, amount }) => {
    setSelectedToken((prev) => ({
      ...prev,
      address: address,
      name: name?.split(" ")[0],
      network: network,
      symbol: symbol,
      amount: amount,
    }));
    setShow(false);
  };

  useEffect(() => {
    getUserTokens();
  }, []);

  function setShowFunc() {
    setShow((e) => !e);
  }

  const showSendTokenPopUp = () => {
    setshowSendTokenTOAnotherChain(true);
  };

  const handleSetDestinationChain = ({ name, sourceName, color }) => {
    setshowSendTokenTOAnotherChain(false);
    setSelectedTokenChain({
      name: name,
      sourceName: sourceName,
      color: color,
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#131118" }}>
      {showSendTokenTOAnotherChain && <View style={constants.overlay}></View>}

      <ReusableCard navigation={navigation} text={"Amount"} backFunc={backFunc}>
        <View style={constants.container}>
          <View style={[constants.flex]}>
            <Pressable onPress={(e) => setShowFunc()}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    {
                      color: "white",
                      marginRight: 10,
                      fontWeight: "700",
                      fontSize: 18,
                    },
                  ]}
                >
                  {selectedToken?.name}
                </Text>
                <AntDesign name="down" size={17} color="white" />
              </View>
            </Pressable>
            {show && (
              <View
                style={{
                  // flexDirection: "row",
                  // alignItems: "center",
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  position: "absolute",
                  backgroundColor: tokensArr.length > 1 && "white",
                  top: 40,
                  left: -10,
                  minHeight: 100,
                  borderRadius: 10,
                  width: 100,
                  zIndex: 2222,
                }}
              >
                {tokensArr
                  .filter((val) => val.address !== selectedToken.address)
                  .map((val, index) => (
                    <Pressable
                      onPress={() =>
                        handleSetTokenToSend({
                          address: val.address,
                          amount: val.amount,
                          name: val.name,
                          network: val.network,
                          symbol: val.symbol,
                        })
                      }
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          borderBottomColor: "gray",
                          borderBottomWidth: 1,
                        }}
                      >
                        <Text
                          style={[
                            {
                              color: "black",
                              marginRight: 10,
                              fontWeight: "700",
                              fontSize: 16,
                            },
                          ]}
                        >
                          {val?.name?.split(" ")[0]}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
              </View>
            )}

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text style={[styles.text1, { color: "white" }]}>
                  {selectedToken?.amount?.toString()?.length > 10
                    ? selectedToken?.amount.toString().slice(0, 4)
                    : selectedToken?.amount}{" "}
                  {selectedToken.symbol.toUpperCase()}
                </Text>
                <Text style={[styles.text2, { color: "white" }]}>$121,330</Text>
              </View>
              <Pressable onPress={() => handleSetMAX()}>
                <View style={styles.max}>
                  <Text style={[{ color: "white", fontWeight: "800" }]}>
                    Max
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          {!showSendTokenTOAnotherChain && (
            <TouchableOpacity
              onPress={showSendTokenPopUp}
              style={{
                // position: "",
                top: 30,
                zIndex: -22,
                backgroundColor: "#a88b72",
                width: "100",
                borderRadius: 20,
                padding: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  {
                    color: "white",
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 14,
                    marginRight: 20,
                    zIndex: -23,
                    // opacity: 0.8,
                  },
                ]}
              >
                {selectedTokenChain?.name
                  ? `You are able to send to ${selectedTokenChain.name}`
                  : "Send to Another Chain"}
              </Text>
              {selectedTokenChain?.name && (
                <Pressable onPress={handleSetDestinationChain}>
                  <MaterialIcons name="cancel" size={20} color="black" />
                </Pressable>
              )}
            </TouchableOpacity>
          )}
          <View
            style={[
              {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 60,
                marginBottom: 60,
              },
            ]}
          >
            <Text style={[styles.ethAmt, { color: "white" }]}>
              {valueArr.length == 0
                ? 0
                : parseFloat(
                    valueArr.join("").length > 10
                      ? valueArr.join("").slice(0, 4)
                      : valueArr.join("")
                  )}
              <Text style={[{ color: "#8124e6" }]}>|</Text>
              {selectedToken.symbol.toUpperCase()}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              <Ionicons name="swap-vertical" size={24} color="#8124e6" />
              <Text
                style={[{ color: "white", fontWeight: "800", marginLeft: 10 }]}
              >
                $229.82
              </Text>
            </View>
          </View>
          <Keyboard
            func={handleRoute}
            setValueArr={setValueArr}
            valueArr={valueArr}
            navigation={navigation}
          />
        </View>
      </ReusableCard>
      {showSendTokenTOAnotherChain && (
        <ResuableModalCTN
          text={"All Supported Chains"}
          setShow={setshowSendTokenTOAnotherChain}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              marginVertical: 10,
              opacity: 0.9,
            }}
          >
            Pick the chain you want to transfer to
          </Text>
          {supportedNetworks.map((val, index) => (
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              key={index}
              onPress={() =>
                handleSetDestinationChain({
                  name: val.name,
                  sourceName: val.sourceName,
                  color: val.color,
                })
              }
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: val.color,
                  borderRadius: 50,
                  marginRight: 10,
                  opacity: 0.8,
                }}
              ></View>
              <Text
                style={{ color: "white", marginVertical: 10, fontSize: 16 }}
              >
                {val?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ResuableModalCTN>
      )}
    </ScrollView>
  );
};

export default Amount;

const styles = StyleSheet.create({
  ethAmt: {
    fontWeight: "800",
    fontSize: 30,
  },
  max: {
    backgroundColor: "#ffffff36",
    marginLeft: 10,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
  },
  text1: {
    fontSize: 18,
    fontWeight: "600",
  },
  text2: {
    // fontSize: 18,
    opacity: 0.5,
  },
});
