import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ReusableCard from "../../components/ReusableCard";
import ButtonGradient from "../../components/ButtonGradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const SecureWalletTwo = ({ navigation }) => {
  return (
    <ReusableCard text={"Secure Your Wallet"}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Secure your wallet's <Text style={styles.text2}>"Seed Phrase"</Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/i.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.text2}> Why is it important?</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.header}>Manual</Text>
              <Text style={styles.header}>
                Security Level:
                <Text style={{ color: "#62c28d" }}> very Strong</Text>
              </Text>
            </View>
            <Text style={styles.info}>
              Write down your seed phrase on a piece of paper and store in a
              safe place.
            </Text>
            <Text style={styles.info}>Risks are: </Text>
            <Text style={styles.info}>• You lose it </Text>
            <Text style={styles.info}>• Someone else finds it</Text>
            <Text style={styles.info}>• You forget where you put it</Text>
          </View>
          <View style={styles.box}>
            <View style={{}}>
              <Text style={styles.header}>
                Other options: Doesn't have to be paper!
              </Text>
            </View>
            <Text style={styles.info}>Tips</Text>
            <Text style={styles.info}>• Store in bank vault </Text>
            <Text style={styles.info}>• Store in safe</Text>
            <Text style={styles.info}>• Store in multiple secret places</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <ButtonGradient text={"Next"} route={""} navigation={navigation} />
        </View>
      </View>
    </ReusableCard>
  );
};

export default SecureWalletTwo;

const styles = StyleSheet.create({
  info: {
    color: "#a6a0bb",
    paddingTop: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  header: {
    color: "white",
    paddingTop: 5,
    fontSize: 17,
    fontWeight: "600",
  },
  box: {
    backgroundColor: "#a6a0bb42",
    width: Dimensions.get("screen").width - 30,
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  text: {
    fontWeight: "400",
    fontSize: 16,
    color: "white",
    marginTop: 30,
    textAlign: "center",
  },
  text2: {
    fontWeight: "800",
    marginTop: 10,
    fontSize: 16,
    color: "#0B6FFB",
  },
  line: {
    position: "absolute",
    left: 0,
    width: Dimensions.get("window").width, // Set the desired width
    height: 500,
    zIndex: -2,
  },
  warning: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
    color: "white",
  },
  img: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    paddingRight: 15,
    paddingLeft: 15,
  },
});
