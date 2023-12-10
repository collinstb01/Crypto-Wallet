import {
  BackHandler,
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import StatusBarForScreens from "../../components/StatusBarForScreens";
import { Ionicons, FontAwesome5, Fontisto } from "@expo/vector-icons";
import Tabs from "../../components/Tabs";
import ButtonGradient from "../../components/ButtonGradient";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import ButtonGradientTwo from "../../components/ButtonGradientTwo";
import Network from "../../components/Network";
import contantStyles from "../../constants/styles";
import TabstwoContents from "../../components/TabstwoContents";
import Collectibles from "../../sections/Collectibles";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import QRCodeReceiveToken from "../../components/QRCodeReceiveToken";
import NameAndNetwork from "../../components/NameAndNetwork";
import {
  _addTokens,
  _createWallet,
  _formatAddr,
  _getActiveNetwork,
  _getActiveWallet,
  _getNetworks,
  _getTokens,
  _getWallets,
  _setNetworks,
  _setWallets,
  eventListening,
  listenForTransactions,
  refreshUserBalance,
} from "../../constants/HelperFunctions";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import Constants from "../../constants/styles";
import { Platform } from "react-native";

const Home = ({ route, navigation }) => {
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const [showSendEth, setshowSendEth] = useState(false);
  const [showAddToken, setshowAddToken] = useState(false);
  const [text, setText] = useState("");
  const [wallets, setWallets] = useState(null);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [networks, setNetworks] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [activeWallet, setActiveWallet] = useState(null);
  const [walletName, setWalletName] = useState("");
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [activeCTN, setActiveCTN] = useState(1);

  const { madeChangesMessage } = useSelector((state) => state.storage);

  const funcOne = () => {
    setActiveCTN(1);
  };

  const funcTwo = () => {
    setActiveCTN(2);
  };

  // BackHandler.addEventListener("hardwareBackPress", () => {
  //   navigation.navigate("home");
  // });

  const funcThree = () => {
    setActiveCTN(3);
  };

  const data = [
    {
      name: "Send",
      iconName: "send",
      route: "send-token",
      pakage: Ionicons,
    },

    {
      name: "Receive",
      iconName: "wallet",
      route: "receive",
      pakage: Fontisto,
    },
    {
      name: "Buy Eth",
      iconName: "ethereum",
      route: "buy-eth",
      pakage: FontAwesome5,
    },
  ];

  const func = () => {
    setshowAddToken(true);
  };

  const addTokens = async () => {
    navigation.navigate("add-token");
    // setLoading(true);
    // await _addTokens({ addr: text });
    setshowAddToken(false);
    // setLoading(false);
  };

  const importAccount = () => {};

  const setNetworkToBeActiveFunc = async ({ id }) => {
    await _setNetworks({ id });
    setShowPerson(false);
  };

  const getWalets = async () => {
    setLoading(true);
    const data = await _getWallets();
    setWallets(JSON.parse(data));
    setLoading(false);
  };

  const getActiveWalets = async () => {
    setLoading(true);
    const data = await _getActiveWallet();
    setActiveWallet(JSON.parse(data));
    setLoading(false);
  };

  const getActiveNetwork = async () => {
    setLoading(true);
    const data2 = await _getActiveNetwork();
    setActiveNetwork(JSON.parse(data2));
    setLoading(false);
  };
  const getNetworks = async () => {
    setLoading(true);
    const data3 = await _getNetworks();
    setNetworks(JSON.parse(data3));
    setLoading(false);
  };
  const getTokens = async () => {
    setLoading(true);
    const data3 = await _getTokens();
    setTokens(JSON.parse(data3));
    setLoading(false);
  };

  const createNewWallet = async () => {
    setLoading(true);
    await _createWallet({
      walletName: walletName,
      setLoading,
      setError,
      setShow,
      privateKey: text,
    });
    setText("");
  };

  useEffect(() => {
    getWalets();
  }, [show]);

  useEffect(() => {
    getActiveNetwork();
  }, [showPerson]);

  useEffect(() => {
    getNetworks();
  }, [showPerson]);

  useEffect(() => {
    getActiveWalets();
  }, [showSendEth]);

  useEffect(() => {
    getTokens();
  }, [showAddToken, showPerson, show, refreshing]);

  const [isScrolling, handleScroll] = useHandleScrollFunc();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshUserBalance();
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    console.log("isScrolling");
  }, [isScrolling]);

  const height = Platform.OS == "ios" ? 60 : 20;

  return (
    <View style={[contantStyles.container2Home]}>
      {!isScrolling && <Tabs navigation={navigation} route={route} />}
      {show == true && <View style={contantStyles.overlay}></View>}
      {showPerson == true && <View style={contantStyles.overlay}></View>}
      {showSendEth == true && <View style={contantStyles.overlay}></View>}
      {showAddToken == true && <View style={contantStyles.overlay}></View>}
      <StatusBarForScreens />
      {refreshing && (
        <View
          style={{
            position: "absolute",
            marginTop: height,
            left: Dimensions.get("window").width / 2,
          }}
        >
          <Text style={{ color: "white" }}>Refresing...</Text>
        </View>
      )}
      <ScrollView
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <StatusBarForScreens />
          <View style={styles.f}>
            <NameAndNetwork
              setShow={setShow}
              setShowPerson={setShowPerson}
              activeNetwork={activeNetwork}
              show={true}
            />
            <View>
              <Ionicons name="md-scan" size={20} color="white" />
            </View>
          </View>
          <View style={[styles2.container]}>
            <Text style={[styles2.text, styles2.textEth]}>
              {!tokens
                ? "0"
                : tokens[0]?.amount?.toString()?.slice(0, 6) + " ETH"}
            </Text>
            <Text style={[styles2.text, styles2.textTwo]}>
              $121,330 <Text style={styles2.textThree}> + 5,42%</Text>
            </Text>
          </View>
          <View style={[styles2.containerLogo]}>
            {data.map((val, index) => (
              <Pressable
                onPress={() => {
                  if (val.route == "buy-eth") {
                    return setshowSendEth(true);
                  }
                  navigation.navigate(val.route);
                }}
                key={index}
              >
                <View>
                  <View style={[styles2.icon]}>
                    <val.pakage
                      name={val.iconName}
                      color={"#66c0ff"}
                      size={25}
                    />
                  </View>
                  <Text style={[styles2.iconText]}>{val.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
          <View style={{ marginTop: 40 }}>
            <TabstwoContents
              active={active}
              setActive={setActive}
              text1={"Tokens"}
              text2={"Collectibles"}
            />
            {active == 1 ? (
              <View>
                {loading ? (
                  <Text
                    style={{
                      marginVertical: 20,
                      fontSize: 16,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Loading...
                  </Text>
                ) : (
                  tokens?.map((val, index) => (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("token-details", {
                          tokenName: val.name.replace("Token", ""),
                          amount: val.amount,
                          contractAddress: val.address,
                          symbol: val.symbol,
                        })
                      }
                      key={index}
                    >
                      <View style={[styles.f, styles3.token]}>
                        <View style={[styles.f]}>
                          <View style={[styles3.border]}>
                            <View style={styles.box}>
                              <Text style={styles.boxText}>
                                {val.name.charAt(0).toUpperCase()}
                              </Text>
                              <View style={styles.boxoverlay}>
                                <Text style={styles.boxoverlayText}>
                                  {val.name.charAt(0).toUpperCase()}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View>
                            <Text style={[styles3.text, styles3.tokenName]}>
                              {val.name}
                            </Text>
                            <Text
                              style={([styles3.text], { color: "#948fa7" })}
                            >
                              $3,77
                              <Text
                                style={{ color: "#57ad7d", fontWeight: "500" }}
                              >
                                + 3.22%
                              </Text>
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text style={[styles3.text, styles3.tokenName]}>
                            {val.amount.toString().length == 1
                              ? val.amount
                              : `${
                                  val.amount.toString().split(".")[0]
                                }.${val.amount
                                  ?.toString()
                                  ?.split(".")[1]
                                  ?.slice(0, 2)}`}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))
                )}
              </View>
            ) : (
              [1, 2, 3, 4].map((val, index) => (
                <Collectibles
                  navigation={navigation}
                  ImageNo={val}
                  key={index}
                />
              ))
            )}
            <ButtonGradient
              text={active == 1 ? "Add Token" : "Add Collectibles"}
              func={func}
              route={"func"}
            />
          </View>
        </View>
      </ScrollView>
      {show && (
        <ResuableModalCTN
          text={activeCTN == 1 ? "Account" : "Create Account"}
          setShow={setShow}
          showBackFunc={funcOne}
          showBack={activeCTN !== 1 && true}
        >
          <Account
            setShow={setShow}
            navigation={navigation}
            func2={funcTwo}
            func3={funcThree}
            activeCTN={activeCTN}
            activeNetwork={activeNetwork}
            wallets={wallets}
            loading={loading}
            importAccount={importAccount}
            setText={setText}
            createNewWallet={createNewWallet}
            setWalletName={setWalletName}
            error={error}
            text={text}
          />
        </ResuableModalCTN>
      )}
      {showPerson && (
        <ResuableModalCTN
          text={"Networks"}
          setShow={setShowPerson}
          showBack={false}
        >
          <Networks
            activeNetwork={activeNetwork}
            networks={networks}
            setNetworkToBeActiveFunc={setNetworkToBeActiveFunc}
          />
        </ResuableModalCTN>
      )}
      {showAddToken && (
        <ResuableModalCTN
          text={"Add Token"}
          setShow={setshowAddToken}
          showBack={false}
        >
          <ImportAccount
            setShow={setshowAddToken}
            placeholder={"Paste your Token Address Here"}
            warning={
              "Imported token are viewable in your wallet, symbol, balance, and others."
            }
            learnMore={"Learn more about imported Tokens "}
            header={"Add Token"}
            buttonText={"Proceed"}
            func={addTokens}
            setText={setText}
            createNewWallet={createNewWallet}
            setWalletName={setWalletName}
            error={error}
          />
        </ResuableModalCTN>
      )}
      {showSendEth && (
        <ResuableModalCTN text={"Receive"} setShow={setshowSendEth}>
          <QRCodeReceiveToken
            navigation={navigation}
            text={"text"}
            activeWallet={activeWallet}
          />
        </ResuableModalCTN>
      )}
    </View>
  );
};

const Networks = ({
  networks,
  activeNetwork,
  setShow,
  setNetworkToBeActiveFunc,
}) => {
  const [id, setId] = useState(null);

  return (
    <>
      <View style={[styles.f, { marginTop: 10, marginBottom: 30 }]}>
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <Network
            underline={false}
            fontSize={17}
            text={activeNetwork?.name}
            bg={activeNetwork?.color}
          />
        </View>
        <Image
          source={require("../../assets/check-select.png")}
          style={{ width: 24, height: 24 }}
        />
      </View>

      <Text style={styles3.otherNetwork}>Other Networks</Text>
      <View>
        {networks?.map((val, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => setNetworkToBeActiveFunc({ id: val.id })}
          >
            <View style={[styles.f, { marginTop: 10, marginBottom: 20 }]}>
              <Network
                text={val?.name}
                bg={val?.color}
                underline={false}
                fontSize={17}
                id={val?.id}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const Account = ({
  activeCTN,
  func2,
  func3,
  activeNetwork,
  wallets,
  setShow,
  importAccount,
  setText,
  createNewWallet,
  setWalletName,
  error,
  loading,
  text,
}) => {
  return (
    <>
      {activeCTN == 1 ? (
        <AccountMain
          func2={func2}
          func3={func3}
          activeNetwork={activeNetwork}
          wallets={wallets}
          setShow={setShow}
        />
      ) : activeCTN == 2 ? (
        <CreatAccount
          setShow={setShow}
          createNewWallet={createNewWallet}
          setWalletName={setWalletName}
          loading={loading}
        />
      ) : activeCTN == 3 ? (
        <ImportAccount
          setShow={setShow}
          placeholder={
            "Paste your private key string e.g 4xhd83jsjkjjsj98383mnxjyuyrjal38374929"
          }
          warning={
            "Imported accounts are viewable in your wallet but are not recoverable with your EllAsset seed phrase"
          }
          learnMore={"Learn more about imported accounts"}
          header={"Import Account"}
          buttonText={loading ? "Importing..." : "Import Account"}
          func={importAccount}
          setText={setText}
          createNewWallet={createNewWallet}
          setWalletName={setWalletName}
          text={text}
          error={error}
        />
      ) : (
        ""
      )}
    </>
  );
};

const AccountMain = ({ func2, func3, activeNetwork, wallets, setShow, z }) => {
  const handleChangeAccount = ({ addr }) => {
    setShow(false);
    _setWallets({ walletAddress: addr });
  };
  return (
    <>
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Network
          text={activeNetwork?.name}
          bg={activeNetwork?.color}
          underline={true}
        />
      </View>
      <View>
        {wallets?.map((val, index) => {
          const [addr, setAddr] = useState("");

          useEffect(() => {
            d();
          }, []);

          async function d() {
            let d = await _formatAddr({ addr: val.walletAddress });
            setAddr(d);
          }
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeAccount({ addr: val.walletAddress })}
            >
              <View
                style={[styles.f, { marginTop: 10, marginBottom: 10 }]}
                key={index}
              >
                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                  <Image
                    source={require("../../assets/face1.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text style={[styles.text, styles3.accountName]}>
                    {`Account ${index + 1} (${addr})`}
                  </Text>
                </View>
                {val.active == 1 && (
                  <Image
                    source={require("../../assets/check-select.png")}
                    style={{ width: 24, height: 24 }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ marginTop: 10 }}>
        <ButtonGradientTwo text={"Creat New Account"} func={func2} />
        <ButtonGradientTwo text={"Import Account"} func={func3} />
      </View>
    </>
  );
};

const CreatAccount = ({
  setShow,
  createNewWallet,
  setWalletName,
  loading,
  error,
}) => {
  return (
    <>
      <Text style={[createAccountImportAccountStyle.text]}>
        Create New Account
      </Text>
      <View style={createAccountImportAccountStyle.inputCTN}>
        <TextInput
          placeholder="Account Name"
          style={[createAccountImportAccountStyle.input, { color: "white" }]}
          placeholderTextColor={"#a49eb9"}
          onChangeText={(text) => setWalletName(text)}
        />
      </View>
      <ButtonGradientTwo
        text={loading ? "Creating..." : "Create"}
        func={createNewWallet}
      />
      <Text style={contantStyles.error}>{error}</Text>
    </>
  );
};

const ImportAccount = ({
  header,
  placeholder,
  warning,
  learnMore,
  buttonText,
  func,
  setText,
  createNewWallet,
  setWalletName,
  loading,
  error,
  text,
}) => {
  return (
    <>
      <>
        <Text style={[createAccountImportAccountStyle.text]}>{header}</Text>
        <View style={createAccountImportAccountStyle.CTN}>
          <Text style={[createAccountImportAccountStyle.importWarning]}>
            {warning}
          </Text>
          <Text style={[createAccountImportAccountStyle.importWarning]}>
            {learnMore}
            <Text
              style={{
                color: "blue",
                borderBottomColor: "blue",
                borderWidth: 2,
                fontWeight: "600",
              }}
            >
              {learnMore && "here."}
            </Text>
          </Text>
          {buttonText == "Import Account" && (
            <>
              <TextInput
                placeholder={placeholder}
                style={[contantStyles.input, { color: "white" }]}
                placeholderTextColor={"#a49eb9"}
                onChangeText={(text) => setText(text)}
              />
              <TextInput
                placeholder="Account Name"
                style={[contantStyles.input, { color: "white", marginTop: 20 }]}
                placeholderTextColor={"#a49eb9"}
                onChangeText={(text) => setWalletName(text)}
              />
              <Text style={Constants.error}>{error}</Text>
            </>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Ionicons name="md-scan" color={"white"} size={20} />
          <Text style={[createAccountImportAccountStyle.scanText, styles.text]}>
            Or Scan a QR Code
          </Text>
        </View>
        <ButtonGradient
          disabled={
            buttonText == "Import Account"
              ? text == ""
                ? true
                : false
              : loading
          }
          route={"func"}
          text={buttonText}
          func={buttonText == "Import Account" ? createNewWallet : func}
        />
      </>
    </>
  );
};

export default Home;

const createAccountImportAccountStyle = StyleSheet.create({
  scanText: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  importWarning: {
    color: "white",
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "400",
  },
  CTN: {
    marginTop: 20,
    marginBottom: 30,
  },
  inputCTN: {
    marginTop: 30,
    marginBottom: 100,
  },
  input: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#1c1924",
  },
  text: {
    color: "white",
    fontWeight: "600",
    // textAlign: "center",
    borderBottomColor: "#ffffff30",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingBottom: 15,
    marginTop: 30,
    fontSize: 19,
  },
});

const styles3 = StyleSheet.create({
  otherNetwork: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    color: "white",
  },
  accountName: {
    fontWeight: "600",
    marginLeft: 10,
    fontSize: 18,
  },
  desc2: {
    lineHeight: 25,
    color: "white",
    fontWeight: "400",
    marginTop: 20,
    fontSize: 15,
  },

  tokenName: {
    fontWeight: "700",
    fontSize: 18,
  },
  token: {
    marginTop: 20,
    marginBottom: 20,
  },
  border: {
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: "#1c1c1e",
    width: 40,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});

const styles2 = StyleSheet.create({
  icon: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1924",
  },
  iconText: {
    color: "#66c0ff",
    textAlign: "center",
    marginTop: 5,
  },
  containerLogo: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  textEth: {
    fontWeight: "900",
    fontSize: 40,
  },
  textTwo: {
    fontWeight: "500",
    fontSize: 16,
  },
  textThree: {
    color: "#6bd99b",
  },
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 35,
  },
});

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  network: {
    opacity: 0.8,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 10,
  },
  f: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  boxText: {
    color: "black",
  },
  box: {
    backgroundColor: "#f2f4f6",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "gray",
  },
  boxoverlay: {
    position: "absolute",
    left: 17,
    top: -11,
    fontWeight: "800",
    backgroundColor: "#cdb6ec",
    borderRadius: 50,
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  boxoverlayText: {
    fontWeight: "300",
    color: "white",
    fontSize: 13,
  },
});
