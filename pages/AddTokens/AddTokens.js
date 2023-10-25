import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import Recent from "../../sections/SendToken/Recent";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import constantStyle from "../../constants/styles";
import Valid from "../../components/Valid";
import {
  _decryotData,
  _getWallets,
  _setWallets,
  _encryotData,
} from "../../constants/HelperFunctions";
import { Pressable } from "react-native";
import ButtonGradient from "../../components/ButtonGradient";

const AddTokens = ({ navigation }) => {
  const [receiveingAddr, setReceivingAddr] = useState("");
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(false);

  const backFunc = () => {
    navigation.goBack();
  };

  const handleChange = async (e) => {
    let encrypt = await _encryotData({ data: e });
    setReceivingAddr(encrypt);

    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(e)) {
      // Check if the address is 40 hexadecimal characters with or without the "0x" prefix.
      return setValid(false);
    }

    if (/^(0x)?[0]{40}$/.test(e)) {
      // Check if the address is not an empty address (40 zeros).
      return setValid(false);
    }

    Keyboard.dismiss(); // Close the keyboard
    return setValid(true);
  };

  const func = () => {};

  useEffect(() => {}, []);

  return (
    <ReusableCard
      navigation={navigation}
      text={"Add Token"}
      backFunc={backFunc}
    >
      <View style={styles.container}>
        <TextInput
          placeholder={valid ? "" : "Search, public address (0x), or ENS"}
          style={[styles.input, constantStyle.input]}
          placeholderTextColor={"#a49eb9"}
          onChangeText={(e) => handleChange(e)}
          value={valid ? "" : receiveingAddr}
          editable={valid == false && true}
        />
        <View style={{ marginTop: 50 }}>
          <ButtonGradient
            text={"Next"}
            func={func}
            route={"func"}
            widthSp={200}
          />
        </View>
      </View>
    </ReusableCard>
  );
};

export default AddTokens;

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  txBtwAcc: {
    fontWeight: "600",
    color: "#0b6df6",
    marginTop: 20,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#0b6ef8",
    width: 168,
  },
  input: {
    color: "white",
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
