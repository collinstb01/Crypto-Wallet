import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ButtonGradientTwo from "./ButtonGradientTwo";
import { ethers } from "ethers";

const TransactionDInDepth = ({ txDepth }) => {
  const routeToExplorer = () => {};

  return (
    <>
      <View style={{ marginTop: 30 }}>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Status</Text>
          <Text style={[styles.firstText, styles.text, styles.confirmed]}>
            {txDepth.status}
          </Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Date</Text>
          <Text style={[styles.firstText, styles.text, styles.date]}>
            {txDepth.date}
          </Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>From</Text>
          <Text style={[styles.firstText, styles.text, styles.address]}>
            {txDepth?.from}
          </Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>To</Text>
          <Text style={[styles.firstText, styles.text, styles.address]}>
            {txDepth?.to}
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Nounce</Text>
          <Text style={[styles.firstText, styles.text]}>#{txDepth.nounce}</Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Amount</Text>
          <Text style={[styles.firstText, styles.text]}>
            {txDepth.amount} {txDepth.symbol}
          </Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Network Fee</Text>
          <Text style={[styles.firstText, styles.text]}>
            {txDepth.networkFee}{" "}
            {txDepth.network.charAt(0).toUpperCase() + txDepth.network.slice(1)}
          </Text>
        </View>
        <View style={[styles.first, styles.flex2]}>
          <Text style={[styles.text, styles.TA]}>Total Amount</Text>
          <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
            <Text style={[styles.TA, styles.text, { color: "green" }]}>
              {txDepth.status == "success" ? "Confirmed" : "Faile"}
            </Text>
            <Text style={[styles.firstText, styles.text]}>
              {ethers.formatEther(txDepth.total.toString())}
            </Text>
          </View>
        </View>
      </View>
      <ButtonGradientTwo text={"View On Ethersca"} func={routeToExplorer} />
    </>
  );
};

export default TransactionDInDepth;

const styles = StyleSheet.create({
  TA: {
    fontSize: 20,
    fontWeight: "600",
  },
  address: {
    fontWeight: "700",
  },
  date: {
    fontSize: 19,
    fontWeight: "600",
  },
  confirmed: {
    color: "#62c58e",
    fontWeight: "600",
    fontSize: 18,
  },
  box: {
    backgroundColor: "#1c1924",
    padding: 20,
    marginBottom: 30,
    borderRadius: 15,
  },
  text: {
    color: "white",
  },
  rightText: {
    color: "white",
    fontSize: 16,
    opacity: 0.6,
  },
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
