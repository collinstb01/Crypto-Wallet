import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReusableCard from "../../components/ReusableCard";
import constants from "../../constants/styles";
import Valid from "../../components/Valid";
import ButtonGradient from "../../components/ButtonGradient";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import { FontAwesome } from "@expo/vector-icons";
import TabstwoContents from "../../components/TabstwoContents";
import { useSelector } from "react-redux";
import { _getGas } from "../../constants/HelperFunctions";
import { ethers } from "ethers";

const Confrim = ({ navigation }) => {
  const { sendToken } = useSelector((state) => state.storage);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(1);

  const [address, setAddress] = useState("");
  const [amount, setamount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [totalAmount, settotalAmount] = useState("");
  const [gasData, setGasData] = useState({
    gasPrice: "",
    gasLEstimate: "",
    gasInEth: "",
    gasSlow: "",
    gasFast: "",
  });

  const backFunc = () => {
    navigation.goBack();
  };

  function func() {
    navigation.navigate("token-details", { tokenName: "1INCH" });
  }

  const getGas = async () => {
    const gas = await _getGas({
      address: sendToken.tokenAddress,
      amount: sendToken.amount,
      recipient: sendToken.to,
    });
    const parseGas = JSON.parse(gas);
    let totalGasInEth = parseGas.gasLEstimate * parseGas.gasPrice;

    setGasData((prev) => ({
      ...prev,
      gasPrice: parseGas.gasPrice,
      gasLEstimate: parseGas.gasLEstimate,
      gasInEth: ethers.formatEther(totalGasInEth),
    }));

    // let totalEth = Number(sendToken.amount) + Number(totalGasInEth);

    // settotalAmount(ethers.formatUnits(totalEth));
  };
  useEffect(() => {
    // getGasFee
    // getGasLimit
    if (sendToken) {
      setAddress(sendToken.tokenAddress);
      setamount(sendToken.amount);
      setRecipient(sendToken.to);
      getGas();
    }
  }, [sendToken]);

  return (
    <>
      <ScrollView>
        <ReusableCard
          navigation={navigation}
          text={"Confirm"}
          backFunc={backFunc}
          show={show}
        >
          {show && <View style={constants.overlay}></View>}
          <View style={{ minHeight: Dimensions.get("window").height - 120 }}>
            <View style={constants.container}>
              <View style={styles.texts}>
                <Text style={styles.text1}>
                  {sendToken.amount} {sendToken.symbol.toUpperCase()}
                </Text>
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
                  <Text style={{ color: "#858096", marginBottom: 5 }}>
                    From
                  </Text>
                  <Valid address={sendToken.from} />
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
                  <Valid address={sendToken.to} />
                </View>
              </View>
              <View style={styles.box}>
                <View style={styles.ctn}>
                  <Text style={[styles.amount]}>Amount</Text>
                  <Text style={[styles.amount]}>
                    {sendToken.amount} {sendToken.symbol.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.ctn}>
                  <Pressable onPress={() => setShow(true)}>
                    <Text style={[styles.amount]}>
                      Network Fee <Text style={styles.edit}>Edit</Text>
                    </Text>
                  </Pressable>
                  <Text style={[styles.amount]}>
                    {`${gasData.gasInEth.toString()} ${sendToken.symbol.toUpperCase()}`}
                  </Text>
                </View>
                <View style={styles.ctn}>
                  <Text style={[styles.toalAmount]}>Total Amount</Text>
                  <View>
                    <Text style={[styles.toalAmount]}>
                      {totalAmount} {sendToken.symbol.toUpperCase()}
                    </Text>
                    <Text style={[styles.amount]}>$0.558432</Text>
                  </View>
                </View>
              </View>
            </View>
            <ButtonGradient
              text={"Send"}
              func={func}
              route={"func"}
              widthSp={150}
            />
          </View>
        </ReusableCard>
      </ScrollView>
      {show && (
        <ResuableModalCTN setShow={setShow}>
          <TabstwoContents
            active={active}
            text1={"Basic"}
            text2={"Advance"}
            setActive={setActive}
          />
          <View style={{ marginBottom: 30, marginTop: 15 }}>
            {active == 1 ? <Basic /> : <Advance />}
          </View>
        </ResuableModalCTN>
      )}
    </>
  );
};

export default Confrim;

const Advance = () => {
  function func() {}
  return (
    <View>
      <Text style={[modalStyles.advannceAmt]}>Total 0.002496 1INCH</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Gas Limit"
          style={[constants.input, { color: "white" }]}
          placeholderTextColor={"white"}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Gas Price: (GWEI)"
          keyboardType="numeric"
          style={[constants.input, { color: "white" }]}
          placeholderTextColor={"white"}
        />
      </View>
      <View>
        <ButtonGradient text={"Save"} func={func} route={"route"} />
      </View>
    </View>
  );
};

const Basic = () => {
  return (
    <View>
      {[1, 2, 3].map((val) => (
        <View style={modalStyles.ctn}>
          <View
            style={{
              flexDirection: "row",
              width: 280,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[modalStyles.s, modalStyles.text]}>Slow</Text>
            <Text style={[modalStyles.s, modalStyles.text2]}>
              0.00125 1INCH
            </Text>
            <Text style={modalStyles.amount}>$0.005475</Text>
          </View>
          <View style={{}}>
            <FontAwesome name="check-circle" size={24} color="green" />
          </View>
        </View>
      ))}
    </View>
  );
};

const modalStyles = StyleSheet.create({
  advannceAmt: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
    marginBottom: 25,
  },
  amount: {
    color: "white",
    fontWeight: "700",
    marginLeft: 4,
    fontSize: 16,
  },
  text: {
    color: "white",
    marginRight: 40,
    fontSize: 20,
  },
  text2: {
    opacity: 0.4,
    fontSize: 18,
    color: "white",
    marginRight: 0,
  },
  ctn: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  toalAmount: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  edit: {
    fontWeight: "800",
    color: "blue",
    fontSize: 16,
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
