import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { _formatAddr } from "../../constants/HelperFunctions";
import { ethers } from "ethers";
import { Fontisto } from "@expo/vector-icons";

const TokenHistory = ({ DATA, setShow, setTXDepth }) => {
  const handleShowTXDepth = async ({
    status,
    date,
    from,
    to,
    nounce,
    amount,
    networkFee,
    contractAddress,
    hash,
    symbol,
    type,
    network,
    total,
    messageId,
    destinationChain,
    sourceChainSelector,
  }) => {
    let _to = await _formatAddr({ addr: to, notEncrypted: true });
    let _from = await _formatAddr({ addr: from, notEncrypted: true });

    console.log(from, _from);
    setTXDepth((prev) => ({
      ...prev,
      status,
      date,
      from: _from,
      to: _to,
      nounce,
      amount,
      networkFee,
      contractAddress,
      hash,
      symbol,
      type,
      network,
      total,
      destinationChain,
      sourceChainSelector,
      messageId,
    }));
    setShow(true);
  };
  return (
    <View>
      <View style={styles.container}>
        {DATA?.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              if (item.status == "pending") return;
              handleShowTXDepth({
                status: item?.status,
                date: item?.date,
                from: item?.from,
                to: item?.to,
                nounce: item?.nonce,
                amount: item?.value,
                networkFee:
                  item?.gasPrice && ethers?.formatEther(item.gasPrice),
                total:
                  (item?.type == "Send"
                    ? Number(ethers.parseEther(item?.value?.toString())) +
                      item?.gasPrice
                    : Number(item?.value)) + item?.gasPrice,
                contractAddress: item?.contractAddress,
                hash: item?.hash,
                symbol: item?.symbol,
                type: item?.type,
                network: item?.network,
                messageId: item?.messageId,
                destinationChain: item?.destinationChain,
                sourceChainSelector: item?.sourceChainSelector,
              });
            }}
            key={index}
          >
            <View style={styles.item} key={index}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 10 }}>
                  {item.type != "Receive" ? (
                    <FontAwesome name="send-o" size={24} color="white" />
                  ) : (
                    <Fontisto name="wallet" size={24} color="white" />
                  )}
                </View>
                <View>
                  <Text style={[styles.text1]}>
                    #{item.nonce} {item.date}
                  </Text>
                  <Text style={[styles.text2, styles.text]}>
                    {item.type} {item.symbol.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      color:
                        item.status == "success"
                          ? "#58b07e"
                          : item.status == "failed"
                          ? "#8a2234"
                          : "#dc9429",
                      fontWeight: "800",
                    }}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                  {item.status == "pending" && (
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <View style={styles.speed}>
                        <Text style={[styles.txText]}>Speed Up</Text>
                      </View>
                      <View style={styles.cancel}>
                        <Text style={[styles.txText]}>Cancel</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ alignItems: "flex-end", flexDirection: "column" }}>
                <Text style={[styles.text4, styles.text]}>
                  {item.type == "Send"
                    ? item.value
                    : ethers.formatEther(item.value.toString())}{" "}
                  {item.symbol.toUpperCase()}
                </Text>
                <Text style={[styles.text5, styles.text]}>$0.5588432</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TokenHistory;

const styles = StyleSheet.create({
  speed: {
    backgroundColor: "#febc5b",
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  cancel: {
    backgroundColor: "#ff7186",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  txText: {
    fontWeight: "900",
    color: "white",
  },
  text5: {
    fontWeight: "600",
  },
  text4: {
    fontWeight: "600",
    fontSize: 18,
  },
  text2: {
    fontSize: 18,
    fontWeight: "700",
  },
  text1: {
    color: "#817c92",
    marginBottom: 3,
    fontWeight: "700",
  },
  text: {
    color: "white",
  },
  container: {
    // marginHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
  },
});
