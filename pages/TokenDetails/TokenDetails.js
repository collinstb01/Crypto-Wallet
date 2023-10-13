import {
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import constants from "../../constants/styles";
import Network from "../../components/Network";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import TokenHistory from "../../sections/TokenDetails/TokenHistory";
import LoadingBanner from "../../components/LoadingBanner";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import TransactionDInDepth from "../../components/TransactionDInDepth";

const TokenDetails = ({ route, navigation }) => {
  const [show, setShow] = useState(false);
  const { tokenName } = route.params;

  // BackHandler.addEventListener("hardwareBackPress", () => {
  //   navigation.navigate("home");
  // });

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

  return (
    <>
      <ScrollView>
        <ReusableCard text={"1INCH Token"} show={show}>
          {show && <View style={constants.overlay}></View>}

          <View style={{ minHeight: Dimensions.get("window").height - 130 }}>
            <View style={{ alignItems: "center" }}>
              <Network
                text={"Ethereum main Network"}
                underline={true}
                bg={"0b6ffb"}
              />
            </View>

            <View style={[styles.container]}>
              <View style={styles.prices}>
                <Text style={styles.priceText1}>10.059 {tokenName}</Text>
                <Text style={styles.priceText2}>$39.63</Text>
              </View>
              <View style={styles.icons}>
                <View>
                  <View style={styles.icon}>
                    <FontAwesome name="send-o" size={24} color="#64c1ff" />
                  </View>
                  <Text style={[styles.iconText]}>Send</Text>
                </View>
                <View>
                  <View style={styles.icon}>
                    <Fontisto name="wallet" size={24} color="#64c1ff" />
                  </View>
                  <Text style={[styles.iconText]}>Receive</Text>
                </View>
              </View>
              <TokenHistory DATA={DATATXHistory} setShow={setShow} />
              <LoadingBanner
                text1={"Transaction Submitted"}
                text2={"Waiting for confirmation"}
                bg={"#3d3125"}
              />
            </View>
          </View>
        </ReusableCard>
      </ScrollView>
      {show && (
        <ResuableModalCTN text={"send 1INCH"} setShow={setShow}>
          <TransactionDInDepth />
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
