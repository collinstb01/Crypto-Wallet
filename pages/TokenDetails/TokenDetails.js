import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ReusableCard from "../../components/ReusableCard";
import constants from "../../constants/styles";
import Network from "../../components/Network";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import TokenHistory from "../../sections/TokenDetails/TokenHistory";

const TokenDetails = ({ route, navigation }) => {
  const { tokenName } = route.params;
  return (
    <ScrollView>
      <ReusableCard text={"1INCH Token"}>
        <View style={{ minHeight: Dimensions.get("window").height - 130 }}>
          <View style={{ alignItems: "center" }}>
            <Network
              text={"Ethereum main Network"}
              underline={true}
              bg={"0b6ffb"}
            />
          </View>

          <View style={[styles.container]}>
            <View style={styles.prices}>
              <Text style={styles.priceText1}>10.059 1INCH</Text>
              <Text style={styles.priceText2}>$39.63</Text>
            </View>
            <View style={styles.icons}>
              <View>
                <View style={styles.icon}>
                  <FontAwesome name="send-o" size={24} color="#64c1ff" />
                </View>
                <Text style={[styles.iconText]}>Send</Text>
              </View>
              <View>
                <View style={styles.icon}>
                  <Fontisto name="wallet" size={24} color="#64c1ff" />
                </View>
                <Text style={[styles.iconText]}>Receive</Text>
              </View>
            </View>
            <TokenHistory />
          </View>
        </View>
      </ReusableCard>
    </ScrollView>
  );
};

export default TokenDetails;

const styles = StyleSheet.create({
  iconText: {
    color: "#66c0ff",
    textAlign: "center",
    marginTop: 5,
  },
  icon: {
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: "#1c1924",
    padding: 20,
    borderRadius: 50,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  priceText1: {
    color: "white",
    fontWeight: "800",
    fontSize: 35,
  },
  priceText2: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    marginTop: 5,
  },
  prices: {
    alignItems: "center",
    marginBottom: 30,
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
