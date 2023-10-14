import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const TokenHistory = ({ DATA, setShow }) => {
  return (
    <View>
      <View style={styles.container}>
        {DATA.map((item, index) => (
          <TouchableOpacity onPress={() => setShow(true)} key={index}>
            <View style={styles.item} key={index}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 10 }}>
                  <FontAwesome name="send-o" size={24} color="white" />
                </View>
                <View>
                  <Text style={[styles.text1]}>#4 Mar 8,2921 at 06:11AM</Text>
                  <Text style={[styles.text2, styles.text]}>Send 1INCH</Text>
                  <Text
                    style={{
                      color:
                        item.status == "Confirmed"
                          ? "#58b07e"
                          : item.status == "Failed"
                          ? "#8a2234"
                          : "#dc9429",
                      fontWeight: "800",
                    }}
                  >
                    {item.status}
                  </Text>
                  {item.tx && (
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
                <Text style={[styles.text4, styles.text]}>0.127496 1INCH</Text>
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
    marginVertical: 15,
  },
  title: {
    fontSize: 24,
  },
});
