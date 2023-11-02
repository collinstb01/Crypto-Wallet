import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState("");

  const copyToClipBoard = () => {
    console.log(text);
    if (text) {
      Clipboard.setString(text);
      setCopied(true);
    }
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <Pressable onPress={() => copyToClipBoard()}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <Ionicons
          name={copied ? "ios-checkmark" : "ios-copy"}
          size={24}
          color="#8d36e7"
        />
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            marginHorizontal: 10,
            fontSize: 16,
          }}
        >
          Copy
        </Text>
      </View>
    </Pressable>
  );
};

export default CopyToClipboard;

const styles = StyleSheet.create({});
