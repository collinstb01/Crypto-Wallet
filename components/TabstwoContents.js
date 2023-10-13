import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const TabstwoContents = ({ active, text1, text2, setActive }) => {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={[styles.text, styles.tabText, active == 2 && { opacity: 0.5 }]}
        >
          {text1}
        </Text>
        {active == 1 && <View style={styles.active}></View>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(2)}>
        <Text
          style={[styles.text, styles.tabText, active == 1 && { opacity: 0.5 }]}
        >
          {text2}
        </Text>
        {active == 2 && <View style={styles.active}></View>}
      </TouchableOpacity>
    </View>
  );
};

export default TabstwoContents;

const styles = StyleSheet.create({
  tabText: {
    color: "white",
    fontWeight: "700",
    fontSize: 22,
  },
  tabs: {
    paddingBottom: 15,
    borderBottomColor: "#ffffff30",
    borderBottomWidth: 1.5,
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "white",
    width: 80,
    height: 2.5,
    position: "absolute",
    top: 40,
  },
  text: {
    color: "white",
    marginHorizontal: 20,
  },
});
