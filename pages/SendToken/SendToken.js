import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import Recent from "../../sections/SendToken/Recent";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import constantStyle from "../../constants/styles";
import Valid from "../../components/Valid";

const SendToken = ({ navigation }) => {
  const [receiveingAddr, setReceivingAddr] = useState("");
  const [valid, setValid] = useState(false);

  const backFunc = () => {
    console.log("go");
    navigation.goBack();
  };
  console.log(valid);
  const handleChange = (e) => {
    setReceivingAddr(e);

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

  return (
    <ReusableCard navigation={navigation} text={"Send To"} backFunc={backFunc}>
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            // placeholder="Account Name"
            style={[styles.input]}
            placeholderTextColor={"#a49eb9"}
            editable={false}
          />
          <View style={{ position: "absolute", top: 5, left: 15 }}>
            <Text style={{ color: "#858096", marginBottom: 5 }}>From</Text>
            <Valid />
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color="#948fa8"
            style={constantStyle.inputIcon}
          />
        </View>
        <View>
          <TextInput
            placeholder={valid ? "" : "Search, public address (0x), or ENS"}
            style={[styles.input]}
            placeholderTextColor={"#a49eb9"}
            onChangeText={(e) => handleChange(e)}
            value={valid ? "" : receiveingAddr}
            editable={valid == false && true}
          />
          {valid && (
            <View style={{ position: "absolute", top: 5, left: 15 }}>
              <Text style={{ color: "#858096", marginBottom: 5 }}>To</Text>
              <Valid />
            </View>
          )}
          {!receiveingAddr && (
            <Ionicons
              name="md-scan"
              size={20}
              color="#948fa8"
              style={constantStyle.inputIcon}
            />
          )}
          {valid && (
            <MaterialIcons
              name="cancel"
              size={20}
              color="#948fa8"
              style={constantStyle.inputIcon}
              onPress={() => {
                setReceivingAddr("");
                setValid(false);
              }}
            />
          )}
        </View>
        {/* <Recent /> */}
        {!valid && (
          <>
            <Text style={styles.txBtwAcc}>Transfer Between My Accounts</Text>
          </>
        )}
        <Recent valid={valid} navigation={navigation} />
      </View>
    </ReusableCard>
  );
};

export default SendToken;

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
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#1c1924",
    color: "white",
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
