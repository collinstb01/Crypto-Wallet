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
  _getTokenDetail,
  _addTokens,
  _getAllTokens,
} from "../../constants/HelperFunctions";
import { Pressable } from "react-native";
import ButtonGradient from "../../components/ButtonGradient";
import TabstwoContents from "../../components/TabstwoContents";
import { setMCMessage } from "../../features/StorageAuth/StorageAuth";
import { useDispatch } from "react-redux";
import AssestPrice from "../../components/AssestPrice";

const AddTokens = ({ navigation }) => {
  const [receiveingAddr, setReceivingAddr] = useState("");
  const [valid, setValid] = useState(false);
  const [active, setActive] = useState(1);
  const [allTokens, setAllTokens] = useState(null);
  const [data, setData] = useState({
    name: "",
    decimals: null,
    symbol: "",
    balance: "",
    addr: "",
    id: "",
    walletAddress: "",
  });
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const backFunc = () => {
    navigation.goBack();
  };

  const handleChange = async (e) => {
    setLoading(true);
    setdisabled(true);
    // let encrypt = await _encryotData({ data: e });
    // setReceivingAddr(encrypt);

    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(e)) {
      setErr("Enter Value Address");
      setTimeout(() => {
        setErr("");
      }, 5000);
      // Check if the address is 40 hexadecimal characters with or without the "0x" prefix.
      return setValid(false);
    }

    if (/^(0x)?[0]{40}$/.test(e)) {
      // Check if the address is not an empty address (40 zeros).
      return setValid(false);
    }

    Keyboard.dismiss(); // Close the keyboard

    const data = await _getTokenDetail({
      addr: e,
      setErr: setErr,
      setLoading: setLoading,
    });
    let parseData = JSON.parse(data);

    setData((prev) => ({
      ...prev,
      name: parseData.name,
      decimals: parseData.decimals.toString(),
      symbol: parseData.symbol,
      balance: parseData.balance,
      addr: parseData.addr,
      id: parseData.id,
      walletAddress: parseData.walletAddress,
    }));

    setdisabled(false);
    setLoading(false);

    return setValid(true);
  };

  const func = async () => {
    if (data.addr == "") {
      setErr("Enter Value Address");
      setTimeout(() => {
        setErr("");
      }, 5000);
      return setErr("Pleae Enter Token Address");
    }
    setLoading(true);
    await _addTokens({ ...data, setErr, navigation });
    dispatch(setMCMessage({ changes: "Added token" }));
    setLoading(false);
  };

  const getAllTokens = async () => {
    setLoading(true);
    const tokens = await _getAllTokens();
    setAllTokens(tokens);
    setLoading(false);
  };

  useEffect(() => {
    getAllTokens();
  }, []);

  console.log(allTokens);
  return (
    <ReusableCard
      navigation={navigation}
      text={"Add Token"}
      backFunc={backFunc}
    >
      <View style={styles.container}>
        <TabstwoContents
          active={active}
          setActive={setActive}
          text1={"Search"}
          text2={"Custom Tokens"}
        />
        <View
          style={{
            flex: 1,
            marginTop: 40,
          }}
        >
          {active == 1 ? (
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                flexDirection: "column",
              }}
            >
              <View>
                <TextInput
                  placeholder={valid ? "" : "Search For Tokens"}
                  style={[styles.input, constantStyle.input]}
                  placeholderTextColor={"#a49eb9"}
                  onChangeText={(e) => handleChange(e)}
                  value={valid ? "" : receiveingAddr}
                  // editable={valid == false && true}
                />
                {loading ? (
                  <Text style={constantStyle.loading}>Loaing....</Text>
                ) : (
                  [1, 2, 3].map((val, index) => (
                    <Pressable
                      onPress={() => {
                        setShow(true);
                        setText("0x558A03Ea3052620c34D12fA3A1500EbA7D135bE9");
                      }}
                      key={index}
                    >
                      <View key={index}>
                        <AssestPrice />
                      </View>
                    </Pressable>
                  ))
                )}
              </View>
              <View style={{ marginTop: 50 }}>
                <ButtonGradient
                  text={"Next"}
                  func={func}
                  route={"func"}
                  widthSp={200}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                flexDirection: "column",
              }}
            >
              <View>
                <TextInput
                  placeholder={valid ? "" : "Token Address"}
                  style={[styles.input, constantStyle.input]}
                  placeholderTextColor={"#a49eb9"}
                  onChangeText={(e) => handleChange(e)}
                  //   value={valid ? "" : receiveingAddr}
                  editable={valid == false && true}
                />
                <Text
                  style={{
                    color: "red",
                    fontSize: 13,
                    position: "absolute",
                    top: 64,
                    left: 20,
                    fontWeight: "700",
                  }}
                >
                  {err}
                </Text>
                <TextInput
                  placeholder={valid ? "" : "Token Symbol"}
                  style={[styles.input, constantStyle.input]}
                  placeholderTextColor={"#a49eb9"}
                  onChangeText={(e) =>
                    setData((prev) => ({
                      ...prev,
                      symbol: e,
                    }))
                  }
                  value={data.symbol}
                  // editable={data == false && true}
                />
                <TextInput
                  placeholder={valid ? "" : "Token Decimal"}
                  style={[styles.input, constantStyle.input]}
                  placeholderTextColor={"#a49eb9"}
                  onChangeText={(e) =>
                    setData((prev) => ({
                      ...prev,
                      decimals: e,
                    }))
                  }
                  value={data.decimals}
                  //   editable={valid == false && true}
                />
              </View>
              <View style={{ marginTop: 50 }}>
                <ButtonGradient
                  text={loading ? "Importing..." : "Import Token"}
                  func={func}
                  route={"func"}
                  disabled={disabled}
                  widthSp={200}
                />
              </View>
            </View>
          )}
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
    marginBottom: 30,
    color: "white",
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
