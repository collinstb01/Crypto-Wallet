import {
  BackHandler,
  Image,
  Pressable,
  ScrollView,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  _getActiveNetwork,
  _getNetworks,
  _getWallets,
  _setNetworks,
} from "../../constants/HelperFunctions";

const Home = ({ route, navigation }) => {
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const [showSendEth, setshowSendEth] = useState(false);
  const [text, setText] = useState("");
  const [wallets, setWallets] = useState(null);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [networks, setNetworks] = useState(null);

  const [activeCTN, setActiveCTN] = useState(1);

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

  const data2 = [
    {
      name: "1inCH Token",
      icon: "sym1",
      amount: "10.059 1INCH",
    },

    {
      name: "APY Gover... Token",
      icon: "sym2",
      amount: "9,993.32 APY",
    },
    {
      name: "Basic Attention Token",
      icon: "sym3",
      amount: "84.444 BAT",
    },
  ];

  const func = () => {};

  const setNetworkToBeActiveFunc = async ({ id }) => {
    await _setNetworks({ id });
    setShowPerson(false);
  };

  const getAccountsNetworks = async () => {
    setLoading(true);

    const data = await _getWallets();
    const data2 = await _getActiveNetwork();
    const data3 = await _getNetworks();

    setWallets(JSON.parse(data));
    setActiveNetwork(JSON.parse(data2));
    setNetworks(JSON.parse(data3));

    setLoading(false);
  };

  useEffect(() => {
    getAccountsNetworks();
  }, [showPerson]);

  const [isScrolling, handleScroll] = useHandleScrollFunc();

  useEffect(() => {
    console.log(isScrolling);
  }, [isScrolling]);
  return (
    <View style={[styles.container]}>
      {!isScrolling && <Tabs navigation={navigation} route={route} />}
      {show == true && <View style={contantStyles.overlay}></View>}
      {showPerson == true && <View style={contantStyles.overlay}></View>}
      {showSendEth == true && <View style={contantStyles.overlay}></View>}

      <ScrollView onScroll={handleScroll}>
        <View>
          <StatusBarForScreens />
          <View style={styles.f}>
            <NameAndNetwork
              setShow={setShow}
              setShowPerson={setShowPerson}
              activeNetwork={activeNetwork}
            />
            <View>
              <Ionicons name="md-scan" size={20} color="white" />
            </View>
          </View>
          <View style={[styles2.container]}>
            <Text style={[styles2.text, styles2.textEth]}>70.42 ETH</Text>
            <Text style={[styles2.text, styles2.textTwo]}>
              $121,330 <Text style={styles2.textThree}> + 5,42%</Text>
            </Text>
          </View>
          <View style={[styles2.containerLogo]}>
            {data.map((val) => (
              <Pressable
                onPress={() => {
                  if (val.route == "buy-eth") {
                    console.log(true);
                    return setshowSendEth(true);
                  }
                  navigation.navigate(val.route);
                }}
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
                {data2.map((val, index) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("token-details", {
                        tokenName: val.name.replace("Token", ""),
                      })
                    }
                    key={index}
                  >
                    <View style={[styles.f, styles3.token]}>
                      <View style={[styles.f]}>
                        <View style={[styles3.border]}>
                          <Image
                            source={require(`../../assets/sym1.png`)}
                            style={{ width: 30, height: 30 }}
                          />
                        </View>
                        <View>
                          <Text style={[styles3.text, styles3.tokenName]}>
                            {val.name}
                          </Text>
                          <Text style={([styles3.text], { color: "#948fa7" })}>
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
                          {val.amount}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : (
              [1, 2, 3, 4].map((val) => (
                <Collectibles navigation={navigation} ImageNo={val} />
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
            func={func}
            setShow={setShowPerson}
            navigation={navigation}
            activeNetwork={activeNetwork}
            networks={networks}
            setNetworkToBeActiveFunc={setNetworkToBeActiveFunc}
          />
        </ResuableModalCTN>
      )}
      {showSendEth && (
        <ResuableModalCTN text={"Receive"} setShow={setshowSendEth}>
          <QRCodeReceiveToken navigation={navigation} text={text} />
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

const Account = ({ activeCTN, func2, func3, activeNetwork, wallets }) => {
  return (
    <>
      {activeCTN == 1 ? (
        <AccountMain
          func2={func2}
          func3={func3}
          activeNetwork={activeNetwork}
          wallets={wallets}
        />
      ) : activeCTN == 2 ? (
        <CreatAccount />
      ) : activeCTN == 3 ? (
        <ImportAccount />
      ) : (
        ""
      )}
    </>
  );
};

const AccountMain = ({ func2, func3, activeNetwork, wallets }) => {
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
        {wallets?.map((val, index) => (
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
                {`Account ${index + 1}`}
              </Text>
            </View>
            {val.active == 1 && (
              <Image
                source={require("../../assets/check-select.png")}
                style={{ width: 24, height: 24 }}
              />
            )}
          </View>
        ))}
      </View>
      <View style={{ marginTop: 10 }}>
        <ButtonGradientTwo text={"Creat New Account"} func={func2} />
        <ButtonGradientTwo text={"Import Account"} func={func3} />
      </View>
    </>
  );
};

const CreatAccount = ({}) => {
  const createNewWallet = () => {
    console.log("creating new wallet");
  };
  return (
    <>
      <Text style={[createAccountImportAccountStyle.text]}>
        Create New Account
      </Text>
      <View style={createAccountImportAccountStyle.inputCTN}>
        <TextInput
          placeholder="Account Name"
          style={createAccountImportAccountStyle.input}
          placeholderTextColor={"#a49eb9"}
        />
      </View>
      <ButtonGradientTwo text={"Create"} func={createNewWallet} />
    </>
  );
};

const ImportAccount = ({}) => {
  const importWallet = () => {
    console.log("creating new wallet");
  };
  return (
    <>
      <>
        <Text style={[createAccountImportAccountStyle.text]}>
          Import Account
        </Text>
        <View style={createAccountImportAccountStyle.CTN}>
          <Text style={[createAccountImportAccountStyle.importWarning]}>
            Imported accounts are viewable in your wallet but are not
            recoverable with your EllAsset seed phrase
          </Text>
          <Text style={[createAccountImportAccountStyle.importWarning]}>
            Learn more about imported accounts{" "}
            <Text
              style={{
                color: "blue",
                borderBottomColor: "blue",
                borderWidth: 2,
                fontWeight: "600",
              }}
            >
              here.
            </Text>
          </Text>
          <TextInput
            placeholder="Paste your private key string e.g 4xhd83jsjkjjsj98383mnxjyuyrjal38374929"
            style={createAccountImportAccountStyle.input}
            placeholderTextColor={"#a49eb9"}
          />
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
        <ButtonGradient route={"func"} text={"Import"} func={importWallet} />
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
});
