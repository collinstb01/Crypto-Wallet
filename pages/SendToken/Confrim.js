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
import { useDispatch, useSelector } from "react-redux";
import {
  _decryotData,
  _getActiveNetwork,
  _getGas,
  approveSendToken,
  getBalance,
  getFeeToPay,
  transferNativeTokensOrERC20,
} from "../../constants/HelperFunctions";
import { ethers } from "ethers";
import { setLoadingAfterSendToken } from "../../features/StorageAuth/StorageAuth";

const Confrim = ({ route, navigation }) => {
  const { sendToken } = useSelector((state) => state.storage);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(1);

  const { name, sourceName } = route.params;

  const [address, setAddress] = useState("");
  const [amount, setamount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [totalAmount, settotalAmount] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [err, setError] = useState("");
  const [balance, setBalance] = useState(null);

  const [loading, setLoading] = useState(false);
  const [gasData, setGasData] = useState({
    gasPrice: "",
    gasLEstimate: "",
    gasInEth: "",
    gasSlow: "",
    gasFast: "",
  });
  const dispatch = useDispatch();

  const backFunc = () => {
    navigation.goBack();
  };

  async function func() {
    dispatch(setLoadingAfterSendToken({ loading: true }));
    setLoading(true);
    if (sourceName == "") {
      await transferNativeTokensOrERC20({
        gasPrice: gasData.gasPrice,
        gasLEstimate: gasData.gasLEstimate,
        recipient: sendToken.to,
        amount: sendToken.amount,
        contractAddress: sendToken.tokenAddress,
        symbol: sendToken.symbol,
        navigation: navigation,
        setErr: setError,
        setLoading: setLoading,
      });
      setLoading(false);
    } else {
      await approveSendToken({
        tokenAddress: sendToken.tokenAddress,
        feeTokenAddress: "",
        sourceName: sourceName,
        amount: Number(ethers.parseEther(sendToken?.amount.toString())),
        fees: Number(gasData.gasPrice),
        symbol: sendToken.symbol,
        navigation: navigation,
        setErr: setError,
        setLoading: setLoading,
        destinationAccount: sendToken.to,
      });
    }
    dispatch(setLoadingAfterSendToken({ loading: false }));
  }

  const getGas = async () => {
    const gas = await _getGas({
      address: sendToken.tokenAddress,
      amount: sendToken.amount,
      recipient: sendToken.to,
      setDisabled,
    });
    const parseGas = JSON.parse(gas);
    let totalGasInEth = parseGas.gasLEstimate * parseGas.gasPrice;

    setGasData((prev) => ({
      ...prev,
      gasPrice: parseGas.gasPrice,
      gasLEstimate: parseGas.gasLEstimate,
      gasInEth: ethers.formatEther(totalGasInEth).slice(0, 15),
    }));
  };

  useEffect(() => {
    if (!sourceName) {
      getGas();
    } else {
      getFee();
    }
    if (sendToken) {
      setAddress(sendToken.tokenAddress);
      setamount(sendToken.amount);
      setRecipient(sendToken.to);
      // getGas();
    }
  }, [sendToken]);

  const getActiveNetwork = () => {};
  const getUserBalance = async () => {
    const decryptAddress = await _decryotData({
      encryptedData: sendToken.from,
    });
    console.log("frof fkdmasdmvmv", decryptAddress);

    const activeNetwork = await _getActiveNetwork();
    const parseActiveNetwork = JSON.parse(activeNetwork);

    const balanceData = await getBalance({
      rpcURL: parseActiveNetwork.rpcURL,
      address: decryptAddress,
      tokenAddress: "",
    });
    setBalance(balanceData);
    if (balanceData) {
      if (address == "0x0000000000000000000000000000000000000000") {
        if (Number(balanceData) <= sendToken.amount) {
          setDisabled(true);
          setError("Insufficient Balance for this TX");
        } else {
          setDisabled(false);
          setError("");
        }
      }
    }
  };

  async function getFee() {
    let gasFee = await getFeeToPay({
      sourceChain: "ethereumSepolia",
      destinationChain: "polygonMumbai",
      destinationAccount: sendToken.to,
      tokenAddress: sendToken.tokenAddress,
      amount: sendToken.amount,
      feeTokenAddress: "",
      setDisabled,
      setError,
      setGasData,
    });
  }

  useEffect(() => {
    if (!sendToken) return;
    getUserBalance();
  }, [balance, sendToken]);

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
                  {sendToken?.amount?.length > 10
                    ? sendToken.amount.slice(0, 4)
                    : sendToken?.amount}{" "}
                  {sendToken?.symbol?.toUpperCase()}
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
                    {sendToken.amount} {sendToken?.symbol?.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.ctn}>
                  <Pressable onPress={() => setShow(true)}>
                    <Text style={[styles.amount]}>
                      Network Fee <Text style={styles.edit}>Edit</Text>
                    </Text>
                  </Pressable>
                  <Text style={[styles.amount]}>
                    {`${gasData.gasInEth.toString()} ${"ETH"}`}
                  </Text>
                </View>
                <View style={styles.ctn}>
                  <Text style={[styles?.toalAmount]}>Total Amount</Text>
                  <View>
                    <Text style={[styles.toalAmount]}>
                      {totalAmount} {sendToken?.symbol?.toUpperCase()}
                    </Text>
                    <Text style={[styles.amount]}>$0.558432</Text>
                  </View>
                </View>
              </View>
              <Text style={[constants.error, { textAlign: "center" }]}>
                {err}
              </Text>
            </View>
            <ButtonGradient
              text={loading ? "Sending..." : "Send"}
              func={func}
              route={"func"}
              widthSp={150}
              disabled={disabled}
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
