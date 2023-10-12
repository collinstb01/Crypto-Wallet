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
const Home = ({ navigation }) => {
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);
  const [showPerson, setShowPerson] = useState(false);

  const [activeCTN, setActiveCTN] = useState(1);

  const funcOne = () => {
    setActiveCTN(1);
  };

  const funcTwo = () => {
    setActiveCTN(2);
  };

  const funcThree = () => {
    setActiveCTN(3);
  };

  //   BackHandler.addEventListener("hardwareBackPress", () => {
  //     navigation.navigate("third-phase");
  //   });

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
      route: "send-token",
      pakage: Fontisto,
    },
    {
      name: "Buy Eth",
      iconName: "ethereum",
      route: "send-token",
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

  return (
    <View style={[styles.container]}>
      <Tabs />
      {show == true && <View style={contantStyles.overlay}></View>}
      {showPerson == true && <View style={contantStyles.overlay}></View>}

      <ScrollView>
        <View>
          <StatusBarForScreens />
          <View style={styles.f}>
            <View style={styles.f}>
              <Image
                source={require("../../assets/face1.png")}
                style={styles.img}
              />

              <View>
                <Pressable onPress={() => setShow((e) => !e)}>
                  <View style={[styles.f, { justifyContent: "flex-start" }]}>
                    <Text style={[styles.text, styles.name]}>Floyd Miles</Text>
                    <Ionicons name="caret-down" size={10} color="white" />
                  </View>
                </Pressable>
                <Pressable onPress={() => setShowPerson((e) => !e)}>
                  <Network text={"Ethereum main network"} bg="0b6ffb" />
                </Pressable>
              </View>
            </View>
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
              <Pressable onPress={() => navigation.navigate(val.route)}>
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
          <View>
            <View style={styles2.tabs}>
              <TouchableOpacity>
                <Text style={[styles2.text, styles2.tabText]}>Tokens</Text>
                {active == 1 && <View style={styles3.active}></View>}
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles2.text, styles2.tabText]}>
                  Collectibles
                </Text>
                {active == 2 && <View style={styles3.active}></View>}
              </TouchableOpacity>
            </View>

            <View>
              {data2.map((val, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("token-details", {
                      tokenName: val.name.replace("Token", ""),
                    })
                  }
                >
                  <View style={[styles.f, styles3.token]} key={index}>
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
                          <Text style={{ color: "#57ad7d", fontWeight: "500" }}>
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
            <ButtonGradient text={"Add Token"} func={func} route={"func"} />
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
          />
        </ResuableModalCTN>
      )}
      {showPerson && (
        <ResuableModalCTN
          text={"Networks"}
          setShow={setShowPerson}
          showBack={false}
        >
          <Networks func={func} setShow={setShow} navigation={navigation} />
        </ResuableModalCTN>
      )}
    </View>
  );
};

const Networks = ({ func, navigation, setShow }) => {
  const data3 = [
    {
      name: "Ropsten Test Network",
      color: "6cda9d",
    },

    {
      name: "Kovan Test Network",
      color: "ffab2e",
    },
    {
      name: "Sepolia Test Network",
      color: "ff3a58",
    },
    {
      name: "Smart Network Chain",
      color: "a769ec",
    },
  ];
  return (
    <>
      <View style={[styles.f, { marginTop: 10, marginBottom: 30 }]}>
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <Network
            text={"Ethereum main network"}
            bg="0b6ffb"
            underline={false}
            fontSize={17}
          />
        </View>
        <Image
          source={require("../../assets/check-select.png")}
          style={{ width: 24, height: 24 }}
        />
      </View>

      <Text style={styles3.otherNetwork}>Other Networks</Text>
      <View>
        {data3.map((val, key) => (
          <View
            style={[styles.f, { marginTop: 10, marginBottom: 20 }]}
            key={key}
          >
            <Network
              text={val.name}
              bg={val.color}
              underline={false}
              fontSize={17}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const Account = ({ activeCTN, func2, func3 }) => {
  return (
    <>
      {activeCTN == 1 ? (
        <AccountMain func2={func2} func3={func3} />
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

const AccountMain = ({ func2, func3 }) => {
  return (
    <>
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Network text={"Ethereum main network"} bg="0b6ffb" underline={true} />
      </View>
      <View>
        {[1, 2, 3].map((val, key) => (
          <View
            style={[styles.f, { marginTop: 10, marginBottom: 10 }]}
            key={key}
          >
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <Image
                source={require("../../assets/face1.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={[styles.text, styles3.accountName]}>Miles14</Text>
            </View>
            <Image
              source={require("../../assets/check-select.png")}
              style={{ width: 24, height: 24 }}
            />
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

  active: {
    backgroundColor: "white",
    width: 60,
    height: 2.5,
    position: "absolute",
    top: 40,
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
  tabText: {
    color: "white",
    fontWeight: "700",
    fontSize: 22,
  },
  tabs: {
    marginTop: 40,
    paddingBottom: 15,
    borderBottomColor: "#ffffff30",
    borderBottomWidth: 1.5,
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-around",
  },
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
