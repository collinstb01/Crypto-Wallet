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
import StatusBarForScreens from "../../components/StatusBarForScreens";

const SecureWallet = ({ navigation }) => {
  const [active, setActive] = useState(0);
  const [showPU, setShowPU] = useState(false);

  // const _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("password");
  //     con
  //   } catch (error) {
  //     console.error("Error retrieving data:", error);
  //   }
  // };
  // useEffect(() => {
  //   _retrieveData();
  // }, []);

  useEffect(() => {
    if (showPU == false) {
      setActive(0);
    }
  }, [showPU]);

  const setActiveFunc = () => {
    if (active == 2) {
      setShowPU(false);
      setActive(0);
      navigation.navigate("secure-your-wallet-two");
    } else if (active == 1) {
      return setActive(2);
    } else {
      setShowPU(true);
      return setActive(1);
    }
  };

  const backFunc = () => {
    navigation.goBack();
  };
  return (
    <ReusableCard text={"Secure Your Wallet"} show={showPU} backFunc={backFunc}>
      {showPU && <View style={styles.overlay}></View>}
      <StatusBarForScreens />
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
            text={"Next"}
            route={"func"}
            func={setActiveFunc}
            widthSp={200}
            navigation={navigation}
          />
        </View>
      </View>
      {showPU && (
        <ModalOne
          navigation={navigation}
          active={active}
          setActive={setActive}
          showPU={showPU}
          setShowPU={setShowPU}
          setActiveFunc={setActiveFunc}
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
