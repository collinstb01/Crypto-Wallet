import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Input = ({ text }) => {
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={() => console.log("text changing")}
        placeholder={text}
        placeholderTextColor={"#948fa8"}
      />
      <Ionicons
        name="md-eye"
        size={20}
        color="#948fa8"
        style={{ position: "absolute", right: 15, top: 17 }}
      />
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#1c1924",
    color: "#948fa8",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
});
