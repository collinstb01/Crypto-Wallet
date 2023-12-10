import {
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import constants from "../../constants/styles";
import Network from "../../components/Network";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import TokenHistory from "../../sections/TokenDetails/TokenHistory";
import LoadingBanner from "../../components/LoadingBanner";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import TransactionDInDepth from "../../components/TransactionDInDepth";
import { TouchableOpacity } from "react-native";
import QRCodeReceiveToken from "../../components/QRCodeReceiveToken";
import {
  _getActiveWallet,
  _getUserTokenTransactions,
} from "../../constants/HelperFunctions";
import Empty from "../../components/Empty";

const TokenDetails = ({ route, navigation }) => {
  const [show, setShow] = useState(false);
  const [QRCode, setShowQRCode] = useState(false);
  const [activeWallet, setActiveWallet] = useState(null);
  const [tokenHistory, setTokenHistory] = useState(null);
  const [txDepth, setTXDepth] = useState({
    status: "",
    date: "",
    from: "",
    to: "",
    nounce: "",
    amount: "",
    networkFee: "",
    contractAddress: "",
    hash: "",
    symbol: "",
    type: "",
    network: "",
    total: "",
    messageId: "",
    destinationChain: "",
    sourceChainSelector: "",
  });
  const { tokenName, amount, contractAddress, symbol } = route.params;

  // BackHandler.addEventListener("hardwareBackPress", () => {
  //   navigation.navigate("home");
  // });

  const getActiveWalets = async () => {
    const data = await _getActiveWallet();
    setActiveWallet(JSON.parse(data));
  };

  const getTokenHistory = async () => {
    const data = await _getUserTokenTransactions({
      contractAddress: contractAddress,
      symbol,
    });
    setTokenHistory(JSON.parse(data));
  };
  useEffect(() => {
    getActiveWalets();
  }, [QRCode]);

  useEffect(() => {
    getTokenHistory();
  }, [QRCode]);

  const DATATXHistory = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
      tx: true,
      status: "Submitted",
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
      tx: false,
      status: "Confirmed",
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"],
      tx: false,
      status: "Failed",
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"],
      tx: false,
      status: "Failed",
    },
  ];

  const backFunc = () => {
    navigation.goBack();
  };

  console.log(tokenHistory, contractAddress, "ddddddddddddddddd");
  if (!tokenHistory) {
    return;
  }
  return (
    <>
      <ScrollView>
        <ReusableCard
          text={tokenName}
          show={show || QRCode}
          backFunc={backFunc}
        >
          {show && <View style={constants.overlay}></View>}

          <View style={{ minHeight: Dimensions.get("window").height - 130 }}>
            {QRCode == true && <View style={contantStyles.overlay}></View>}

            <View style={{ alignItems: "center" }}>
              <Network
                text={"Ethereum main Network"}
                underline={true}
                bg={"0b6ffb"}
              />
            </View>

            <View style={[styles.container]}>
              <View style={styles.prices}>
                <Text style={styles.priceText1}>
                  {amount.toString().slice(0, 5)}{" "}
                  {tokenName.split(" ")[0].toUpperCase()}
                </Text>
                <Text style={styles.priceText2}>$39.63</Text>
              </View>
              <View style={styles.icons}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("send-token")}
                >
                  <View>
                    <View style={styles.icon}>
                      <FontAwesome name="send-o" size={24} color="#64c1ff" />
                    </View>
                    <Text style={[styles.iconText]}>Send</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowQRCode(true)}>
                  <View>
                    <View style={styles.icon}>
                      <Fontisto name="wallet" size={24} color="#64c1ff" />
                    </View>
                    <Text style={[styles.iconText]}>Receive</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {!tokenHistory ? (
                <Empty text={"No Transaction Data"} />
              ) : (
                <>
                  <TokenHistory
                    DATA={tokenHistory}
                    setShow={setShow}
                    setTXDepth={setTXDepth}
                  />
                  {tokenHistory.find((val) => val.status == "pending") ? (
                    <LoadingBanner
                      text1={"A Transaction Submitted"}
                      text2={"Waiting for confirmation"}
                      bg={"#3d3125"}
                    />
                  ) : (
                    <LoadingBanner
                      text1={"Transactions Confirmed"}
                      text2={"All Transactions confirmation"}
                      bg={"#162921"}
                      type={"success"}
                    />
                  )}
                </>
              )}
            </View>
          </View>
        </ReusableCard>
      </ScrollView>
      {show && (
        <ResuableModalCTN
          text={`${txDepth?.type} ${txDepth?.symbol?.toUpperCase()}`}
          setShow={setShow}
        >
          <TransactionDInDepth txDepth={txDepth} />
        </ResuableModalCTN>
      )}
      {QRCode && (
        <ResuableModalCTN text={"Receive"} setShow={setShowQRCode}>
          <QRCodeReceiveToken
            navigation={navigation}
            text={"text"}
            activeWallet={activeWallet}
          />
        </ResuableModalCTN>
      )}
    </>
  );
};

export default TokenDetails;

const styles = StyleSheet.create({
  iconText: {
    color: "#66c0ff",
    textAlign: "center",
    marginTop: 5,
  },
  icon: {
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: "#1c1924",
    padding: 20,
    borderRadius: 50,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  priceText1: {
    color: "white",
    fontWeight: "800",
    fontSize: 35,
  },
  priceText2: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    marginTop: 5,
  },
  prices: {
    alignItems: "center",
    marginBottom: 25,
  },
  container: {
    marginTop: 45,
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
});
