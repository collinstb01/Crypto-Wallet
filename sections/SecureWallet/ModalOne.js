import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ButtonGradient from "../../components/ButtonGradient";
import { BlurView } from "@react-native-community/blur";
import ResuableModalCTN from "../../components/ResuableModalCTN";

const ModalOne = ({ navigation, active, setShow }) => {
  return (
    <ResuableModalCTN>
      {active == 1 ? (
        <Content1 navigation={navigation} setShow={setShow} active={active} />
      ) : active == 2 ? (
        <Content2 navigation={navigation} setShow={setShow} active={active} />
      ) : (
        ""
      )}
    </ResuableModalCTN>
  );
};

export default ModalOne;

const Content1 = ({ navigation, setShow, active }) => {
  return (
    <>
      <Text style={styles.text}>What is a "Seed Phrase"</Text>
      <Text style={styles.desc2}>
        A seed phrase is a set of twelve words that contains all the information
        about your wallet, including your funds. It's like a secret code used to
        access your entire wallet.
      </Text>
      <Text style={styles.desc2}>
        You must keep your seed phrase secret and safe. If someone gets your
        seed phrase, they'll gain control over your accounts.
      </Text>
      <Text style={styles.desc2}>
        Save it in a place where only you can access it. If you lose it, not
        even MetaMask can help you recover it.
      </Text>
      <View style={{ marginTop: 10 }}>
        <ButtonGradient
          text={"Understood"}
          route={"modal"}
          setShow={setShow}
          navigation={navigation}
          active={active}
        />
      </View>
    </>
  );
};
const Content2 = ({ navigation, setShow, active }) => {
  return (
    <>
      <Text style={styles.text}>Skip Account Security?</Text>
      <View>
        <View style={styles.ctn}>
          <Text style={styles.desc2}>
            Save it in a place where only you can access it. If you lose it, not
            even MetaMask can help you recover it.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("secure-your-wallet-two")}
          >
            <View
              style={{
                backgroundColor: "#1c1924",
                padding: 15,
                borderRadius: 25,
                marginRight: 30,
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
                Secure Now
              </Text>
            </View>
          </TouchableOpacity>
          <ButtonGradient
            text={"Skip"}
            route={"modal"}
            navigation={navigation}
            setShow={setShow}
            active={active}
            widthSp={130}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    borderRadius: 25,
    width: 50,
    height: 6,
    backgroundColor: "#ffffffb3",
    position: "relative",
    top: -33,
  },
  desc2: {
    lineHeight: 25,
    color: "white",
    fontWeight: "400",
    marginTop: 20,
    fontSize: 17,
  },
  ctn: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 21,
    fontWeight: "700",
  },
  container: {
    padding: 20,
    // backgroundColor: "blue",
    backgroundColor: "#131118",
    fontWeight: "600",
    position: "absolute",
    width: Dimensions.get("window").width,
    // height: 400,
    bottom: 0,
    borderTopRightRadius: 25,
    zIndex: 22,
    borderTopLeftRadius: 25,
  },
});
