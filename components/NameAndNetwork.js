import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Network from "./Network";

const NameAndNetwork = ({ setShow, setShowPerson }) => {
  return (
    <>
      <View style={styles.f}>
        <Image source={require("../assets/face1.png")} style={styles.img} />
        <View>
          <Pressable onPress={() => setShow((e) => !e)}>
            <View style={[styles.f, { justifyContent: "flex-start" }]}>
              <Text style={[styles.text, styles.name]}>Floyd Miles</Text>
              <Ionicons name="caret-down" size={10} color="white" />
            </View>
          </Pressable>
          <Pressable onPress={() => setShowPerson((e) => !e)}>
            <Network text={"Ethereum main network"} bg="0b6ffb" />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default NameAndNetwork;

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  network: {
    opacity: 0.8,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 10,
  },
  f: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
