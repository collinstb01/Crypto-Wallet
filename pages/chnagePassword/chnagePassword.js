import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "../../constants/styles";
import ReusableCard from "../../components/ReusableCard";
import {
  _changePassword,
  _login,
  getSeedPhrase,
} from "../../constants/HelperFunctions";
import ButtonGradient from "../../components/ButtonGradient";
import TabstwoContents from "../../components/TabstwoContents";
import QRCodeReceiveToken from "../../components/QRCodeReceiveToken";
import QRcode from "../../components/QRcode";

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const backFunc = () => {
    navigation.goBack();
  };

  const verifyPassword = async () => {
    await _changePassword({
      password,
      newPassword,
      setSuccessMsg,
      setErr,
      setLoading,
      navigation,
      route: "show",
    });
    setLoading(false);
  };

  return (
    <ReusableCard
      navigation={navigation}
      text={"Change Password"}
      backFunc={backFunc}
    >
      <ScrollView style={[styles.container]}>
        <View>
          <Text style={styles.text}>
            If you ever get logout. you will need password to access your
            accountns. Save them somwhere safe and secret
          </Text>
          <Text style={[styles.text, { marginTop: 20 }]}>
            <Text style={styles.warning}>DO NOT</Text> share your password with
            anyone! The password can be used to steal all your accounts from
            this ELLAsset
          </Text>
        </View>

        <View style={{ marginTop: 60 }}>
          <TextInput
            style={Constants.input}
            placeholder="Enter Password"
            placeholderTextColor={"#666276"}
            onChangeText={(e) => setPassword(e)}
            textContentType="password"
            secureTextEntry={true}
          />
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={Constants.input}
              placeholder="Enter New Password"
              placeholderTextColor={"#666276"}
              onChangeText={(e) => setNewPassword(e)}
              textContentType="password"
              secureTextEntry={true}
            />
          </View>
          <Text style={Constants.error}>{err}</Text>
        </View>
        <Text style={Constants.success}>{successMsg}</Text>

        <View style={{ marginTop: 30 }}>
          <ButtonGradient
            text={"Next"}
            func={verifyPassword}
            route={"func"}
            disabled={loading}
            widthSp={200}
          />
        </View>
      </ScrollView>
    </ReusableCard>
  );
};

export default ChangePassword;

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
