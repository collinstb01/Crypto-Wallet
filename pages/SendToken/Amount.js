import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import constants from "../../constants/styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Keyboard from "../../components/Keyboard";
const Amount = ({ navigation }) => {
  function backFunc() {
    navigation.goBack();
  }
  const [valueArr, setValueArr] = useState([0]);

  console.log(valueArr);

  return (
    <ScrollView>
      <ReusableCard navigation={navigation} text={"Amount"} backFunc={backFunc}>
        <View style={constants.container}>
          <View style={[constants.flex]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  {
                    color: "white",
                    marginRight: 10,
                    fontWeight: "700",
                    fontSize: 18,
                  },
                ]}
              >
                Ethereum
              </Text>
              <AntDesign name="down" size={17} color="white" />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text style={[styles.text1, { color: "white" }]}>
                  70.42 ETH
                </Text>
                <Text style={[styles.text2, { color: "white" }]}>$121,330</Text>
              </View>
              <View style={styles.max}>
                <Text style={[{ color: "white", fontWeight: "800" }]}>Max</Text>
              </View>
            </View>
          </View>

          <View
            style={[
              {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 60,
                marginBottom: 60,
              },
            ]}
          >
            <Text style={[styles.ethAmt, { color: "white" }]}>
              {valueArr.length == 0 ? 0 : parseFloat(valueArr.join(""))}
              <Text style={[{ color: "#8124e6" }]}>|</Text> ETH
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Ionicons name="swap-vertical" size={24} color="#8124e6" />
              <Text
                style={[{ color: "white", fontWeight: "800", marginLeft: 10 }]}
              >
                $229.82
              </Text>
            </View>
          </View>

          <Keyboard
            setValueArr={setValueArr}
            valueArr={valueArr}
            navigation={navigation}
          />
        </View>
      </ReusableCard>
    </ScrollView>
  );
};

export default Amount;

const styles = StyleSheet.create({
  ethAmt: {
    fontWeight: "800",
    fontSize: 30,
  },
  max: {
    backgroundColor: "#ffffff36",
    marginLeft: 10,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
  },
  text1: {
    fontSize: 18,
    fontWeight: "600",
  },
  text2: {
    // fontSize: 18,
    opacity: 0.5,
  },
});
