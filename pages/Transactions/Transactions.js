import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StatusBarForScreens from "../../components/StatusBarForScreens";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import Tabs from "../../components/Tabs";
import NameAndNetwork from "../../components/NameAndNetwork";
import TokenHistory from "../../sections/TokenDetails/TokenHistory";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import Constants from "../../constants/styles";
import TransactionDInDepth from "../../components/TransactionDInDepth";
import {
  _getActiveNetwork,
  _getUserTransactions,
} from "../../constants/HelperFunctions";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Empty from "../../components/Empty";

const Transactions = ({ route, navigation }) => {
  const { loadingAfterSendToken } = useSelector((state) => state.storage);

  const [isScrolling, handleScroll] = useHandleScrollFunc();
  const [show, setShow] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [transactions, setTransactions] = useState("");
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
  });

  // AsyncStorage.setItem("TXhistory", JSON.stringify([]));

  const getActiveNetwork = async () => {
    const data = await _getActiveNetwork();
    setActiveNetwork(JSON.parse(data));
  };
  useEffect(() => {
    getActiveNetwork();
  }, []);

  const getTransactions = async () => {
    let txs = await _getUserTransactions();
    let data = JSON.parse(txs);
    setTransactions(data);
  };
  useEffect(() => {
    getTransactions();
  }, [loadingAfterSendToken]);

  return (
    <View style={[Constants.container2Home]}>
      {!isScrolling && <Tabs navigation={navigation} route={route} />}
      {show && <View style={Constants.overlay}></View>}

      <StatusBarForScreens />

      <ScrollView onScroll={handleScroll}>
        <View style={{ marginBottom: 40 }}>
          <NameAndNetwork
            activeNetwork={activeNetwork}
            setShow={() => console.log("")}
            setShowPerson={() => console.log("")}
            show={false}
          />
        </View>
        {transactions.length == 0 ? (
          <Empty text={"No Transaction Data"} />
        ) : (
          <TokenHistory
            DATA={transactions}
            setShow={setShow}
            setTXDepth={setTXDepth}
          />
        )}
      </ScrollView>
      {show && (
        <ResuableModalCTN
          text={`${txDepth.type} ${txDepth.symbol.toUpperCase()}`}
          setShow={setShow}
        >
          <TransactionDInDepth txDepth={txDepth} />
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
