import {
  BackHandler,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Step from "../../components/Step";
import ButtonGradient from "../../components/ButtonGradient";

const Success = ({ navigation }) => {
  const func = () => {
    navigation.navigate("home");
  };

  //   useEffect(() => {
  //     BackHandler.addEventListener("hardwareBackPress", () => {
  //       // Return true to prevent the back button from going back to the previous screen
  //       return true;
  //     });

  //     return () => {
  //       BackHandler.removeEventListener("hardwareBackPress");
  //     };
  //   }, []);

  return (
    <View style={styles.continer}>
      <Step one={3} />
      <Image source={require("../../assets/line4.png")} style={styles.line} />
      <StatusBar translucent={false} />
      <View style={{ marginTop: 30, flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require("../../assets/check-select.png")}
              style={styles.check}
            />
          </View>
          <Text style={styles.congrats}>Congratulations</Text>
          <Text style={styles.text}>
            You've successfully protected your wallet. Remember to keep your
            seed phrase safe, it's your responsibility!
          </Text>
          <Text style={[[styles.text], { marginTop: 10 }]}>
            ELLAsset cannot recover your wallet should you lose it. You can find
            your seedphrase in Setings {">"} Security & Privacy
          </Text>
        </View>
        <View>
          <ButtonGradient text={"Done"} route={"func"} func={func} />
        </View>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  congrats: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 22,
    marginBottom: 20,
  },
  line: {
    position: "absolute",
  },
  check: {
    marginTop: 30,
    marginBottom: 30,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 25,
    fontSize: 16,
    opacity: 0.6,
  },
  continer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#09080c",
    padding: 15,
  },
});
