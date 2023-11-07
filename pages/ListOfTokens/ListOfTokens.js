import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import constantStyle from "../../constants/styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { _getTokens } from "../../constants/HelperFunctions";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setSwapReceiveToken,
  setSwapSendToken,
} from "../../features/StorageAuth/StorageAuth";

const ListOfTokens = ({ route, navigation }) => {
  const { type, symbol } = route.params;
  const dispatch = useDispatch();
  const [tokensList, setTokens] = useState(null);
  const backFunc = () => {
    navigation.goBack();
  };

  const getTokens = async () => {
    const data = await _getTokens();
    const parseData = JSON.parse(data);
    setTokens(parseData);
  };

  const handleSetToken = ({
    address,
    amount,
    chaindId,
    decimals,
    name,
    network,
    rpcURL,
    symbol,
    walletAddress,
  }) => {
    if (type == "receive") {
      dispatch(
        setSwapReceiveToken({
          address,
          amount,
          chaindId,
          decimals,
          name,
          network,
          rpcURL,
          symbol,
          walletAddress,
        })
      );
    } else {
      dispatch(
        setSwapSendToken({
          address,
          amount,
          chaindId,
          decimals,
          name,
          network,
          rpcURL,
          symbol,
          walletAddress,
        })
      );
    }
    navigation.goBack();
  };
  useEffect(() => {
    getTokens();
  }, []);
  console.log(type);
  return (
    <ReusableCard navigation={navigation} text={"Swap To"} backFunc={backFunc}>
      <ScrollView style={styles.container}>
        <View>
          <TextInput
            placeholder="        Search Token"
            style={constantStyle.input}
            placeholderTextColor={"#a49eb9"}
          />
          <Ionicons
            name="search"
            size={20}
            color="#948fa8"
            style={{ position: "relative", top: -41, left: 10 }}
          />
        </View>
        <View style={tokens.container}>
          {tokensList
            ?.filter((val) => val.symbol !== symbol)
            .map((val, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  handleSetToken({
                    address: val.address,
                    amount: val.amount,
                    chaindId: val.chaindId,
                    decimals: val.decimals,
                    name: val.name,
                    network: val.network,
                    rpcURL: val.rpcURL,
                    symbol: val.symbol,
                    walletAddress: val.walletAddress,
                  })
                }
              >
                <View style={tokens.token}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ marginRight: 15 }}>
                      <View style={constantStyle.box}>
                        <Text style={constantStyle.boxText}>
                          {val?.symbol?.charAt(0)?.toUpperCase()}
                        </Text>
                        <View style={constantStyle.boxoverlay}>
                          <Text style={constantStyle.boxoverlayText}>
                            {val?.symbol?.charAt(0)?.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={tokens.tokenText}>
                        {val.name.slice(0, 8).toUpperCase()}....{" "}
                        {val.name.slice(-3).toUpperCase()}
                      </Text>
                      {val.decimals && <Text style={tokens.erc20}>ERC20</Text>}
                    </View>
                  </View>
                  <View>
                    <Text style={tokens.tokenText}>
                      {val.amount.toString().slice(0, 6)}{" "}
                      {val.symbol.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </ReusableCard>
  );
};

export default ListOfTokens;

const tokens = StyleSheet.create({
  tokenText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  token: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    // marginTop: 30,
  },
  erc20: {
    color: "gray",
    fontSize: 12,
  },
});

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
