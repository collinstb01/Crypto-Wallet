import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Step from "../components/Step";
import Input from "../components/Input";
import FaceId from "../components/FaceId";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonGradient from "../components/ButtonGradient";
import { useSelector } from "react-redux";
import Contants from "../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
// import { ECRYPT__KEY } from "@env";

const encryptionKey = "thisiskey";

const CreateNewWallet = ({ navigation }) => {
  const { message } = useSelector((state) => state.storage);
  const [error, setErr] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loding, setLoading] = useState(false);
  const [agreed, setAgreedMent] = useState(false);

  const _changeAgreedment = () => {
    setAgreedMent((e) => !e);
  };
  const [passwordStrength, setPS] = useState({
    color: "red",
    stength: "Weak",
  });

  const _helperFunc = ({ error, loading }) => {
    setErr(error);
    setLoading(loading);

    setTimeout(() => {
      setErr("");
    }, 5000);
  };

  useEffect(() => {
    // number and special

    if (password.length <= 6) {
      return setPS((e) => ({ ...e, color: "red", stength: "Poor" }));
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
      return setPS((e) => ({ ...e, color: "green", stength: "strong" }));
    }

    // number and letter
    if (/[a-zA-Z].*\d|\d.*[a-zA-Z]/.test(password)) {
      return setPS((e) => ({ ...e, color: "#efa02c", stength: "Weak" }));
    }
    return setPS((e) => ({ ...e, color: "red", stength: "Poor" }));
  }, [password]);

  const _storeData = async () => {
    try {
      if (password == "" || confirmPassword == "") {
        return _helperFunc({
          error: "Please both fields are required.",
          loading: false,
        });
      }

      if (password.length <= 6) {
        return _helperFunc({
          error: "Password Length must be more than 6 characters",
          loading: false,
        });
      }

      if (password !== confirmPassword) {
        return _helperFunc({
          error: "Password Doesn't Match,Please try again.",
          loading: false,
        });
      }

      if (passwordStrength.stength == "Poor") {
        return _helperFunc({
          error: "Password Too Weak, Should contain both alphabets or numbers.",
          loading: false,
        });
      }

      if (agreed == false) {
        return _helperFunc({
          error: "Pleae Agreed to EllAssest Terms.",
          loading: false,
        });
      }
      const encryptedData = CryptoJS.AES.encrypt(
        password,
        encryptionKey
      ).toString();

      // hasing Password
      // const decryptedData = CryptoJS.AES.decrypt(
      //   encryptedData,
      //   encryptionKey
      // ).toString(CryptoJS.enc.Utf8);

      await AsyncStorage.setItem("password", encryptedData);

      navigation.navigate("SecureYourWallet");
    } catch (error) {
      console.log(error);
      setErr("An Error Occured");
      // Error saving data
    }
  };

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
            <Input text={"******"} setText={setPassword} />
            <Text style={styles.textDesc}>
              Password Strength:{" "}
              <Text style={{ color: passwordStrength.color }}>
                {passwordStrength.stength}
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 30,
              width: Dimensions.get("screen").width - 30,
            }}
          >
            <Input text={"******"} setText={setConfirmPassword} />
            <Text style={styles.textDesc}>Must be at least 8 characters</Text>
          </View>
        </View>
      </View>
      <FaceId />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <TouchableOpacity onPress={(e) => _changeAgreedment(e)}>
          <Ionicons
            name={agreed ? "md-checkbox" : "md-checkbox-outline"}
            size={20}
            color="#948fa8"
            style={{}}
          />
        </TouchableOpacity>
        <Text style={styles.understand}>
          I understand that ELLAsset cannot recover this password for me.
          <Text style={{ color: "#0a48a1" }}>Learmore</Text>
        </Text>
      </View>
      <Text style={Contants.error}>{error}</Text>
      <View
        style={{
          marginTop: 60,
        }}
      >
        <ButtonGradient
          route={"func"}
          func={_storeData}
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
