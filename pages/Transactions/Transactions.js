import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StatusBarForScreens from "../../components/StatusBarForScreens";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import Tabs from "../../components/Tabs";
import NameAndNetwork from "../../components/NameAndNetwork";
import TokenHistory from "../../sections/TokenDetails/TokenHistory";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import Constants from "../../constants/styles";
import ButtonGradientTwo from "../../components/ButtonGradientTwo";
import TransactionDInDepth from "../../components/TransactionDInDepth";
import {
  _getActiveNetwork,
  _getUserTransactions,
} from "../../constants/HelperFunctions";

const Transactions = ({ route, navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();
  const [show, setShow] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(null);

  const getActiveNetwork = async () => {
    const data = await _getActiveNetwork();
    setActiveNetwork(JSON.parse(data));
  };
  useEffect(() => {
    getActiveNetwork();
  }, []);

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

  useEffect(() => {
    _getUserTransactions({
      walletAddress: "0x558A03Ea3052620c34D12fA3A1500EbA7D135bE9",
    });
  }, []);

  return (
    <View style={[Constants.container2Home]}>
      {!isScrolling && <Tabs navigation={navigation} route={route} />}
      {show && <View style={Constants.overlay}></View>}

      <StatusBarForScreens />

      <ScrollView onScroll={handleScroll}>
        <View style={{ marginBottom: 50 }}>
          <NameAndNetwork activeNetwork={activeNetwork} />
        </View>
        <TokenHistory DATA={DATATXHistory} setShow={setShow} />
      </ScrollView>
      {show && (
        <ResuableModalCTN text={"send 1INCH"} setShow={setShow}>
          <TransactionDInDepth />
        </ResuableModalCTN>
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09080d",
    padding: 15,
    paddingTop: 20,
  },
  flex2: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
});
