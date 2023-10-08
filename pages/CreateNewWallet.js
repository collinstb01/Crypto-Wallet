import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Step from "../components/Step";
import Input from "../components/Input";
import FaceId from "../components/FaceId";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonGradient from "../components/ButtonGradient";

const CreateNewWallet = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        // barStyle=""
        translucent={false}
        showHideTransition={true}
        hidden={false}
      />
      <Step one={1} />
      <View style={styles.containerTwo}>
        <Text style={styles.createPass}>Create Passowrd</Text>
        <Text style={[styles.desc]}>
          This password will unlock your ELLAsset wallet only on this service
        </Text>
        <View style={{ marginTop: 80 }}>
          <View style={{ width: Dimensions.get("screen").width - 30 }}>
            <Input text={"******"} />
            <Text style={styles.textDesc}>
              Password Strength: <Text style={{ color: "#efa02c" }}>Good</Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 30,
              width: Dimensions.get("screen").width - 30,
            }}
          >
            <Input text={"******"} />
            <Text style={styles.textDesc}>Must be at least 8 characters</Text>
          </View>
        </View>
      </View>
      <FaceId />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Ionicons name="md-checkbox" size={20} color="#948fa8" style={{}} />
        <Text style={styles.understand}>
          I understand that ELLAsset cannot recover this password for me.
          <Text style={{ color: "#0a48a1" }}>Learmore</Text>
        </Text>
      </View>
      <View
        style={{
          marginTop: 60,
        }}
      >
        <ButtonGradient
          route={"SecureYourWallet"}
          text={"Next"}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default CreateNewWallet;

const styles = StyleSheet.create({
  understand: {
    color: "white",
    marginLeft: 20,
    fontWeight: "400",
    fontSize: 16,
    letterSpacing: 0.4,
  },
  textDesc: {
    marginLeft: 20,
    color: "#6b6779",
    marginTop: 3,
    fontWeight: "700",
  },
  createPass: {
    fontSize: 23,
    textAlign: "center",
    color: "white",
    marginTop: 30,
    fontWeight: "600",
  },
  desc: {
    color: "white",
    textAlign: "center",
    maxWidth: Dimensions.get("window").width - 50,
    marginTop: 10,
    fontWeight: "600",
    fontSize: 15,
  },
  containerTwo: {
    alignItems: "center",
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#09080c",
  },
});
