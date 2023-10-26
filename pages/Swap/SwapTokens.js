import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Tabs from "../../components/Tabs";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import NameAndNetwork from "../../components/NameAndNetwork";
import Constants from "../../constants/styles";
import { useState } from "react";
import { useEffect } from "react";
import { _getActiveNetwork } from "../../constants/HelperFunctions";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const Swap = ({ route, navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();
  const [activeNetwork, setActiveNetwork] = useState(null);

  const getActiveNetwork = async () => {
    const data = await _getActiveNetwork();
    setActiveNetwork(JSON.parse(data));
  };
  useEffect(() => {
    getActiveNetwork();
  }, []);
  return (
    <View style={[Constants.container2Home]}>
      {!isScrolling && <Tabs navigation={navigation} route={route} />}

      <ScrollView onScroll={handleScroll}>
        <View style={{ marginBottom: 50 }}>
          <NameAndNetwork
            show={false}
            activeNetwork={activeNetwork}
            setShow={() => console.log("")}
            setShowPerson={() => console.log("")}
          />
          <View style={[styles.swap_container]}>
            <View style={[styles.containerOne, styles.border]}>
              <View>
                <Text style={[styles.text, styles.swapFrom]}>Swap from</Text>
                <Text style={[styles.text, styles.amount]}>0</Text>
                <Text style={[styles.text, styles.balance]}>
                  Balance: 70.42
                </Text>
              </View>
              <View style={[styles.left]}>
                <Image
                  source={require("../../assets/sym1.png")}
                  style={[styles.Image]}
                />
                <Text style={[styles.text, styles.tokenSymbol]}>ETH</Text>
                <AntDesign name="down" size={18} color="white" />
              </View>
              <View style={[styles.changeTOken]}>
                <Ionicons name="ios-swap-vertical" size={24} color="#91a4fd" />
              </View>
            </View>
            <View style={[styles.containerOne]}>
              <View>
                <Text style={[styles.text, styles.swapFrom]}>Swap from</Text>
                <Text style={[styles.text, styles.amount]}>0</Text>
                <Text style={[styles.text, styles.balance]}>
                  Balance: 70.42
                </Text>
              </View>
              <View style={[styles.left]}>
                <Image
                  source={require("../../assets/sym2.png")}
                  style={[styles.Image]}
                />
                <Text style={[styles.text, styles.tokenSymbol]}>APY</Text>
                <AntDesign name="down" size={18} color="white" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Swap;

const styles = StyleSheet.create({
  changeTOken: {
    backgroundColor: "#323134",
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 50,
    top: 130,
    right: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#323134",
  },
  swapFrom: {
    fontSize: 16,
  },
  balance: {
    color: "#ffffff8a",
  },
  amount: {
    fontSize: 40,
    fontWeight: "800",
    marginVertical: 5,
    color: "#ffffff8a",
  },
  tokenSymbol: {
    marginRight: 10,
    fontWeight: "600",
    fontSize: 19,
  },
  Image: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
  },
  swap_container: {
    marginTop: 30,
    backgroundColor: "#ffffff14",
    borderRadius: 15,
  },
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#09080d",
    padding: 15,
    paddingTop: 20,
  },
});
