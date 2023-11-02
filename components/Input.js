import {
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "../constants/styles";

const Input = ({ text, setText }) => {
  const [showText, setShowText] = useState(false);

  function func(e) {
    setShowText((e) => !e);
  }

  return (
    <>
      <TextInput
        style={Constants.input}
        onChangeText={(value) => setText(value)}
        placeholder={text}
        placeholderTextColor={"#948fa8"}
        secureTextEntry={showText ? false : true}
      />
      <View style={{ position: "absolute", right: 15, top: 17 }}>
        <TouchableOpacity onPress={(e) => func(e)}>
          <Ionicons
            name={showText ? "md-eye-off" : "md-eye"}
            size={20}
            color="#948fa8"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#1c1924",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
});
