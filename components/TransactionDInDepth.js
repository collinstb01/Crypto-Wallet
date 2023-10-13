import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ButtonGradientTwo from "./ButtonGradientTwo";

const TransactionDInDepth = ({}) => {
  const routeToExplorer = () => {};

  return (
    <>
      <View style={{ marginTop: 30 }}>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Status</Text>
          <Text style={[styles.firstText, styles.text, styles.confirmed]}>
            Confirmed
          </Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Date</Text>
          <Text style={[styles.firstText, styles.text, styles.date]}>
            Mar 7,2021 at 12:14AM
          </Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>From</Text>
          <Text style={[styles.firstText, styles.text, styles.address]}>
            0x763D...fdF9
          </Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>To</Text>
          <Text style={[styles.firstText, styles.text, styles.address]}>
            0xBBB...fdF9
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Nounce</Text>
          <Text style={[styles.firstText, styles.text]}>#1</Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Amount</Text>
          <Text style={[styles.firstText, styles.text]}>2.5388 1INCH</Text>
        </View>
        <View style={[styles.first, styles.flex]}>
          <Text style={[styles.rightText, styles.text]}>Network Fee</Text>
          <Text style={[styles.firstText, styles.text]}>0.0012 1INCH</Text>
        </View>
        <View style={[styles.first, styles.flex2]}>
          <Text style={[styles.text, styles.TA]}>Total Amount</Text>
          <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
            <Text style={[styles.TA, styles.text]}>Confirmed</Text>
            <Text style={[styles.firstText, styles.text]}>$23.00</Text>
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
