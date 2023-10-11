import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import ReusableCard from "../../components/ReusableCard";
import constants from "../../constants/styles";
import Valid from "../../components/Valid";
import ButtonGradient from "../../components/ButtonGradient";

const Confrim = ({ navigation }) => {
  const backFunc = () => {
    navigation.goBack();
  };

  function func() {
    navigation.navigate("token-details");
  }

  return (
    <ScrollView>
      <ReusableCard
        navigation={navigation}
        text={"Confirm"}
        backFunc={backFunc}
      >
        <View style={{ minHeight: Dimensions.get("window").height - 130 }}>
          <View style={constants.container}>
            <View style={styles.texts}>
              <Text style={styles.text1}>0.125 1INCH</Text>
              <Text style={styles.text2}>Amount</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <TextInput
                // placeholder="Account Name"
                style={[constants.input]}
                placeholderTextColor={"#a49eb9"}
                editable={false}
              />
              <View style={{ position: "absolute", top: 5, left: 15 }}>
                <Text style={{ color: "#858096", marginBottom: 5 }}>From</Text>
                <Valid />
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                // placeholder="Account Name"
                style={[constants.input]}
                placeholderTextColor={"#a49eb9"}
                editable={false}
              />
              <View style={{ position: "absolute", top: 5, left: 15 }}>
                <Text style={{ color: "#858096", marginBottom: 5 }}>To</Text>
                <Valid />
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.ctn}>
                <Text style={[styles.amount]}>Amount</Text>
                <Text style={[styles.amount]}>0.125 !INCH</Text>
              </View>
              <View style={styles.ctn}>
                <Text style={[styles.amount]}>
                  Network Fee <Text style={styles.edit}>Edit</Text>
                </Text>
                <Text style={[styles.amount]}>0.125 !INCH</Text>
              </View>
              <View style={styles.ctn}>
                <Text style={[styles.toalAmount]}>Total Amount</Text>
                <View>
                  <Text style={[styles.toalAmount]}>0.125 !INCH</Text>
                  <Text style={[styles.amount]}>$0.558432</Text>
                </View>
              </View>
            </View>
          </View>
          <ButtonGradient text={"Send"} func={func} route={"func"} />
        </View>
      </ReusableCard>
    </ScrollView>
  );
};

export default Confrim;

const styles = StyleSheet.create({
  toalAmount: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  edit: {
    fontWeight: "800",
    opacity: 1,
  },
  amount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#a39db8",
  },
  text: {
    color: "#a39db8",
    fontSize: 16,
    fontWeight: "600",
  },
  ctn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  box: {
    width: "auto",
    height: "auto",
    borderRadius: 15,
    backgroundColor: "#1c1924",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  },
  text2: {
    marginTop: 15,
    opacity: 0.7,
    textAlign: "center",
    color: "white",
  },
  text1: {
    fontWeight: "800",
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  texts: {
    marginTop: 5,
    marginBottom: 45,
  },
});
