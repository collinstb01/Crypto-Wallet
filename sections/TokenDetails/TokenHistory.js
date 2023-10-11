import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const TokenHistory = () => {
  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"],
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"],
    },
  ];

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 10 }}>
                  <FontAwesome name="send-o" size={24} color="white" />
                </View>
                <View>
                  <Text style={[styles.text1]}>#4 Mar 8,2921 at 06:11AM</Text>
                  <Text style={[styles.text2, styles.text]}>Send 1INCH</Text>
                  <Text style={[styles.text3]}>Submitted</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", flexDirection: "column" }}>
                <Text style={[styles.text4, styles.text]}>0.127496 1INCH</Text>
                <Text style={[styles.text5, styles.text]}>$0.5588432</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default TokenHistory;

const styles = StyleSheet.create({
  text5: {
    fontWeight: "600",
  },
  text4: {
    fontWeight: "600",
    fontSize: 16,
  },
  text3: {
    color: "#f6a54c",
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
