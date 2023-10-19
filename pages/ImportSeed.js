import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Input from "../components/Input";
import FaceId from "../components/FaceId";
import ReusableCard from "../components/ReusableCard";
import {
  _checkPasswordStrength,
  _createUserAccount,
  _encryotData,
  _helperFunc,
} from "../constants/HelperFunctions";
import Contants from "../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wallet, ethers } from "ethers";

const ImportSeed = ({ navigation }) => {
  const [seedPhrase, setSeedPhrase] = useState("");

  const [error, setErr] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);

  useEffect(() => {
    _checkPasswordStrength({ password, setPS });
  }, [password]);

  const [passwordStrength, setPS] = useState({
    color: "red",
    stength: "Weak",
  });

  const _storeData = async () => {
    try {
      await _createUserAccount({
        password,
        confirmPassword,
        setErr,
        setLoading,
        passwordStrength,
        agreed: true,
        navigation,
        route: "",
        seedPrase: seedPhrase,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      _helperFunc({
        setErr: setErr,
        loading: setLoading,
      });
      // Error saving data
    }
  };

  const func = (e) => {
    setShowSeedPhrase((e) => !e);
  };

  console.log(seedPhrase);
  return (
    <ReusableCard text={"Import From Seed"}>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(seed) => setSeedPhrase(seed)}
            placeholder="Seed Phrase"
            placeholderTextColor={"#948fa8"}
            secureTextEntry={showSeedPhrase ? false : true}
          />
          {seedPhrase == "" && (
            <>
              <Ionicons
                name="md-scan"
                size={20}
                color="#948fa8"
                style={{ position: "absolute", right: 50, top: 17 }}
              />
            </>
          )}
          <TouchableOpacity
            onPress={(e) => func(e)}
            style={{ position: "absolute", right: 15, top: 17 }}
          >
            <Ionicons
              name={showSeedPhrase ? "md-eye-off" : "md-eye"}
              size={20}
              color="#948fa8"
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 80 }}>
          <Input text="New Password" setText={setPassword} />
          <Text style={styles.textDesc}>
            Password Strength:
            <Text style={{ color: passwordStrength.color }}>
              {passwordStrength.stength}
            </Text>
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Input text="Confirm Password" setText={setConfirmPassword} />
        </View>
        <Text
          style={{
            marginLeft: 20,
            color: "#6b6779",
            marginTop: 3,
            fontWeight: "700",
          }}
        >
          Must be at least 6 characters
        </Text>
        <FaceId />
        <Text style={{ color: "white" }}>
          By proceeding, you agree to these
          <Text style={{ color: "#0c5dd0" }}> Term and Conditions.</Text>
        </Text>
        <Text style={Contants.error}>{error}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#201D29",
            borderRadius: 10,
            padding: 15,
            marginTop: 60,
          }}
          onPress={() => _storeData()}
        >
          <Text style={styles.buttonText}>
            {loading ? "Importing..." : "Import"}
          </Text>
        </TouchableOpacity>
      </View>
    </ReusableCard>
  );
};

export default ImportSeed;

const styles = StyleSheet.create({
  textDesc: {
    marginLeft: 20,
    color: "#6b6779",
    marginTop: 3,
    fontWeight: "700",
  },
  buttonText: {
    fontWeight: "800",
    fontSize: 19,
    color: "white",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1c1924",
    color: "#948fa8",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
  },
});
