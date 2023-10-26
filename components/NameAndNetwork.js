import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Network from "./Network";

const NameAndNetwork = ({ setShow, setShowPerson, activeNetwork, show }) => {
  const func = () => {};
  return (
    <>
      <View style={styles.f}>
        <Image source={require("../assets/face12.png")} style={styles.img} />
        <View>
          <Pressable onPress={() => setShow((e) => !e)}>
            <View style={[styles.f, { justifyContent: "flex-start" }]}>
              <Text style={[styles.text, styles.name]}>Account</Text>
              {show && <Ionicons name="caret-down" size={10} color="white" />}
            </View>
          </Pressable>
          <Pressable onPress={() => setShowPerson((e) => !e)}>
            <Network
              text={activeNetwork?.name}
              bg={activeNetwork?.color}
              func={func}
            />
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
    borderRadius: 50,
    backgroundColor: "white",
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
