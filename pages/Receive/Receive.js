import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import AssestPrice from "../../components/AssestPrice";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import contantStyles from "../../constants/styles";
import QRCodeReceiveToken from "../../components/QRCodeReceiveToken";

const Receive = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const backFunc = () => {
    navigation.goBack();
  };
  return (
    <ReusableCard text={"Request Payment"} show={show} backFunc={backFunc}>
      {show == true && <View style={contantStyles.overlay}></View>}

      <View style={styles.container}>
        <Text style={styles.text}>Choose on Asses To Request</Text>
        {[1, 2, 3].map((val, index) => (
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
        ))}
        <Text
          style={{
            alignItems: "center",
            color: "white",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          COMING SOON
        </Text>
      </View>
      {/* {show && (
        <ResuableModalCTN text={"Receive"} setShow={setShow}>
          <QRCodeReceiveToken
            navigation={navigation}
            setText={setText}
            text={text}
          />
        </ResuableModalCTN>
      )} */}
    </ReusableCard>
  );
};

export default Receive;

const styles = StyleSheet.create({
  img: {
    borderRadius: 20,
    width: 200,
    height: 200,
  },
  textAddress: {
    color: "white",
    fontSize: 22,
    maxWidth: 100,
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 30,
  },
  container: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
});
