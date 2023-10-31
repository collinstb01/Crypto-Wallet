import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import StatusBarForScreens from "../../components/StatusBarForScreens";
import Constants from "../../constants/styles";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TextAndBackIcon from "../../components/TextAndBackIcon";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import ButtonGradient from "../../components/ButtonGradient";
import ButtonGradientTwo from "../../components/ButtonGradientTwo";

const SettingPrivacy = ({ navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();
  const boxHeigght = Platform.OS === "ios" ? 23 : 15;

  const handleRoute = ({ route }) => {
    navigation.navigate(route);
  };
  return (
    <View style={[Constants.container2Home]}>
      <StatusBarForScreens />

      <ScrollView onScroll={handleScroll}>
        <TextAndBackIcon text={"Security & Privacy"} navigation={navigation} />
        <Text style={styles.header}>Security</Text>
        <View style={styles.settingBox}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{}}>
              <Text style={[styles.title, { marginBottom: 0 }]}>
                Protect Your Wallet
              </Text>
            </View>
            <View style={styles.seedPhraseBackedUp}>
              <Image
                source={require("../../assets/check-select.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={styles.seedPhraseBackedUpText}>
                Seed phrase backed up
              </Text>
            </View>
          </View>
          <Text style={styles.desc}>
            Protect your wallet by saving your seed phrase in various places
            like a piece of paper, password manager and/or the cloud
          </Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View>
              <ButtonGradientTwo
                text={"Backup Again"}
                route={"func"}
                func={() =>
                  handleRoute({ route: "settings/reveal-seed-phrase" })
                }
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <ButtonGradient
                text={"Reveal Seed Phrase"}
                route={"func"}
                func={() =>
                  handleRoute({ route: "settings/reveal-seed-phrase" })
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.settingBox}>
          <View style={styles.setting}>
            <Text style={styles.title}>Password</Text>
            <Text style={styles.desc}>
              Choose a strong password to unlock ELLAsset app on your device. if
              you lose this password, you will need your seedphrase to re-import
              your wallet
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <ButtonGradientTwo
              text={"Change Password"}
              func={() => handleRoute({ route: "settings/change-password" })}
            />
          </View>
        </View>
        <View style={styles.settingBox}>
          <View style={styles.setting}>
            <Text style={styles.title}>Auto Lock</Text>
            <Text style={styles.desc}>
              CHoose the amount of time before the application automatically
              locks
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingPrivacy;

const styles = StyleSheet.create({
  seedPhraseBackedUpText: {
    fontWeight: "600",
    color: "white",
    marginLeft: 5,
  },
  seedPhraseBackedUp: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1924",
    // backgroundColor: "red",
    fontWeight: "500",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 10,
  },
  settingBox: {
    marginBottom: 30,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // flex: 1,
  },
  desc: {
    color: "white",
    fontSize: 17,
    fontWeight: "300",
    lineHeight: 24,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    width: 150,
    marginBottom: 10,
  },
  header: {
    fontWeight: "700",
    color: "white",
    fontSize: 30,
    marginVertical: 40,
  },
});
