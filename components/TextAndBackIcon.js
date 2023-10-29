import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TextAndBackIcon = ({ text, navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.top}>
      <Pressable onPress={handleBack}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={24}
          color="white"
          style={styles.icon}
        />
      </Pressable>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TextAndBackIcon;

const styles = StyleSheet.create({
  icon: {
    position: "relative",
    top: 0,
    left: -100,
  },
  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
