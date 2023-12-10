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
import { useDispatch, useSelector } from "react-redux";
import Contants from "../constants/styles";
import {
  _checkPasswordStrength,
  _createUserAccount,
} from "../constants/HelperFunctions";
import { setPasswordForNewWallet } from "../features/StorageAuth/StorageAuth";
import StatusBarForScreens from "../components/StatusBarForScreens";

const CreateNewWallet = ({ navigation }) => {
  const { message } = useSelector((state) => state.storage);
  const [error, setErr] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loding, setLoading] = useState(false);
  const [agreed, setAgreedMent] = useState(false);
  const dispatch = useDispatch();
  const _changeAgreedment = () => {
    setAgreedMent((e) => !e);
  };
  const [passwordStrength, setPS] = useState({
    color: "red",
    stength: "Weak",
  });

  useEffect(() => {
    _checkPasswordStrength({ password, setPS });
  }, [password]);

  const _storeData = async () => {
    try {
      // return navigation.navigate("SecureYourWallet");
      setLoading(true);
      await _createUserAccount({
        password,
        confirmPassword,
        setErr,
        setLoading,
        passwordStrength,
        agreed,
        navigation,
        route: "SecureYourWallet",
      });
      dispatch(setPasswordForNewWallet({ password: password }));
    } catch (error) {
      console.log(error);
      setErr("An Error Occured");
      // Error saving data
    }
  };

  return (
    <View style={Contants.container2Home}>
      <StatusBarForScreens />

      <Step one={1} navigation={navigation} />
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
          widthSp={200}
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
