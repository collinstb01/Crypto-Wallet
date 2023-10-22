import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import constants from "../../constants/styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Keyboard from "../../components/Keyboard";
import { _getTokens } from "../../constants/HelperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setSendToken } from "../../features/StorageAuth/StorageAuth";
import { Pressable } from "react-native";
import { ethers } from "ethers";
const Amount = ({ navigation }) => {
  function backFunc() {
    navigation.goBack();
  }
  const { sendToken } = useSelector((state) => state.storage);
  const [valueArr, setValueArr] = useState([0]);
  const [tokensArr, setTokens] = useState(null);
  const [selectedToken, setSelectedToken] = useState({
    address: "",
    name: "",
    network: "",
    symbol: "",
    amount: null,
  });
  const [show, setShow] = useState();

  const dispatch = useDispatch();

  console.log(selectedToken);
  const handleRoute = () => {
    dispatch(
      setSendToken({
        amount: valueArr.join(" "),
        tokenAddress: selectedToken.address,
        id: selectedToken.network,
        to: sendToken.to,
        from: sendToken.from,
        symbol: selectedToken.symbol,
      })
    );
    navigation.navigate("send-token/confirm");
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
  ``;

  useEffect(() => {
    getUserTokens();
  }, []);

  function setShowFunc() {
    setShow((e) => !e);
  }
  return (
    <ScrollView>
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
                    ? ethers.formatEther(selectedToken?.amount.toString())
                    : selectedToken?.amount}
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
              {valueArr.length == 0 ? 0 : parseFloat(valueArr.join(""))}
              <Text style={[{ color: "#8124e6" }]}>|</Text>{" "}
              {selectedToken.symbol.toUpperCase()}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
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
