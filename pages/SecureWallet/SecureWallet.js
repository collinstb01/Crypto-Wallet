import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import ButtonGradient from "../../components/ButtonGradient";
import ModalOne from "../../sections/SecureWallet/ModalOne";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SecureWallet = ({ navigation }) => {
  const [show, setShow] = useState({
    show: false,
    active: 0,
  });

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("password");
      if (value !== null) {
        // Data found, use it
        console.log("Retrieved data:", value);
      } else {
        // Data does not exist
        console.log("No data found for key:", password);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <ReusableCard text={"Secure Your Wallet"} show={show.show}>
      {show.show && <View style={styles.overlay}></View>}
      <View style={styles.img}>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/img1.png")}
        />
        <Image style={styles.line} source={require("../../assets/line1.png")} />
      </View>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.warning, { marginTop: 50 }]}>
            Don't risk losing your funds. protect your wallet by saving your{" "}
            <Text style={{ color: "#0B6FFB" }}>Seed Phrase</Text> in a place you
            trust.
          </Text>
          <Text style={[styles.warning, { marginTop: 10 }]}>
            It's the only way to recover your wallet if you get locked out of
            the app or get a new device.
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("secure-your-wallet-two")}
        >
          <Text style={styles.text}>Remind Me Later</Text>
        </Pressable>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <ButtonGradient
            setShow={setShow}
            text={"Next"}
            route={"modal"}
            active={show.active}
            navigation={navigation}
          />
        </View>
      </View>
      {show.show && (
        <ModalOne
          navigation={navigation}
          active={show.active}
          show={show.show}
          setShow={setShow}
        />
      )}
    </ReusableCard>
  );
};

export default SecureWallet;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: -140,
    left: 0,
    zIndex: 3,
  },
  text: {
    fontWeight: "800",
    fontSize: 19,
    color: "white",
    marginTop: 30,
    textAlign: "center",
  },
  line: {
    position: "absolute",
    left: 0,
    width: Dimensions.get("window").width, // Set the desired width
    height: 500,
    zIndex: -2,
  },
  warning: {
    maxWidth: 300,
    textAlign: "center",
    fontSize: 15,
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
