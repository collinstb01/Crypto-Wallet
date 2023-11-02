import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "../../constants/styles";
import ReusableCard from "../../components/ReusableCard";
import { _login, getSeedPhrase } from "../../constants/HelperFunctions";
import ButtonGradient from "../../components/ButtonGradient";
import TabstwoContents from "../../components/TabstwoContents";
import QRCodeReceiveToken from "../../components/QRCodeReceiveToken";
import QRcode from "../../components/QRcode";
import CopyToClipboard from "../../components/CopyToClipboard";

const RevealSeedPhrase = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState("");
  const backFunc = () => {
    navigation.goBack();
  };

  const verifyPassword = async () => {
    await _login({
      password,
      setErr,
      setLoading,
      navigation,
      setShowSeedPhrase,
      route: "show",
    });
    setLoading(false);

    // setTimeout(() => {
    //   setShowSeedPhrase(false);
    // }, 10000);
  };

  const getSP = async () => {
    const seedPhraseData = await getSeedPhrase();
    const seed = JSON.parse(seedPhraseData);
    setSeedPhrase(seed);
  };
  useEffect(() => {
    getSP();
  }, []);

  console.log(seedPhrase);
  return (
    <ReusableCard
      navigation={navigation}
      text={"Reveal Seed Phrase"}
      backFunc={backFunc}
    >
      <ScrollView style={[styles.container]}>
        <View>
          <Text style={styles.text}>
            If you ever change browser or move computers. you will need this
            seed phrase to access your accountns. Save them somwhere safe and
            secret
          </Text>
          <Text style={[styles.text, { marginTop: 20 }]}>
            <Text style={styles.warning}>DO NOT</Text> share this phrase with
            anyone! These words can be used to steal all your accounts
          </Text>
        </View>
        {showSeedPhrase ? (
          <ShowSeedPhrase seedPhrase={seedPhrase} />
        ) : (
          <>
            <View style={{ marginTop: 60 }}>
              <TextInput
                style={Constants.input}
                placeholder="Enter Password to continue"
                placeholderTextColor={"#666276"}
                onChangeText={(e) => setPassword(e)}
                textContentType="password"
                secureTextEntry={true}
              />
              <Text style={Constants.error}>{err}</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <ButtonGradient
                text={"Next"}
                func={verifyPassword}
                route={"func"}
                disabled={loading}
                widthSp={200}
              />
            </View>
          </>
        )}
      </ScrollView>
    </ReusableCard>
  );
};

export default RevealSeedPhrase;

const ShowSeedPhrase = ({ seedPhrase }) => {
  const [active, setActive] = useState(1);

  return (
    <View style={{ marginTop: 60 }}>
      <TabstwoContents
        text1={"Text"}
        text2={"QR Code"}
        active={active}
        setActive={setActive}
      />
      {active == 1 ? (
        <View style={styles.seedPhraseBox}>
          <Text style={styles.seedPhraseMsg}>Your Seed Phrase</Text>
          <Text style={styles.seedPhrase}>{seedPhrase}</Text>
          <CopyToClipboard text={seedPhrase} />
        </View>
      ) : (
        <View
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRcode text={seedPhrase} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  seedPhrase: {
    color: "white",
    fontSize: 30,
    fontWeight: "500",
  },
  seedPhraseMsg: {
    color: "white",
    opacity: 0.8,
    fontWeight: "700",
    marginBottom: 15,
  },
  seedPhraseBox: {
    marginTop: 40,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 15,
    backgroundColor: "#1c1924",
  },
  warning: {
    color: "red",
    fontWeight: "700",
  },
  text: {
    color: "white",
    lineHeight: 26,
    fontSize: 16,
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
