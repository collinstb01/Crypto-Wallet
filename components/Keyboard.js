import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ButtonGradient from "./ButtonGradient";

const Keyboard = ({ setValueArr, valueArr, navigation, func }) => {
  console.log(valueArr);

  const handleSetValue = ({ no, i }) => {
    if (no == ".") {
      if (valueArr.includes(".")) return;
    }
    if (no == "X") {
      let newArr = [...valueArr];
      newArr.pop();
      setValueArr(newArr);
      return;
    }
    setValueArr((val) => [...val, no]);
  };

  return (
    <View style={styles.ctn}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "X"].map((no, i) => (
        <TouchableOpacity onPress={() => handleSetValue({ no, i })} key={i}>
          <View key={i} style={styles.value}>
            <Text style={styles.text}>{no}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: 300,
        }}
      >
        <ButtonGradient
          text={"Next"}
          func={func}
          route={"func"}
          navigation={navigation}
          widthSp={200}
        />
      </View>
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  value: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 100,
  },
  ctn: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
