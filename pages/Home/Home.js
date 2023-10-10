import {
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import StatusBarForScreens from "../../components/StatusBarForScreens";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tabs from "../../components/Tabs";
import ButtonGradient from "../../components/ButtonGradient";
import ResuableModalCTN from "../../components/ResuableModalCTN";
import ButtonGradientTwo from "../../components/ButtonGradientTwo";
import Network from "../../components/Network";
import contantStyles from "../../constants/styles";
const Home = ({ navigation }) => {
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("third-phase");
  });

  const func = () => {};

  return (
    <View style={[styles.container]}>
      <Tabs />
      {show && <View style={contantStyles.overlay}></View>}

      <ScrollView>
        <View>
          <StatusBarForScreens />
          <View style={styles.f}>
            <View style={styles.f}>
              <Image
                source={require("../../assets/face1.png")}
                style={styles.img}
              />
              <Pressable onPress={() => setShow((e) => !e)}>
                <View>
                  <View style={[styles.f, { justifyContent: "flex-start" }]}>
                    <Text style={[styles.text, styles.name]}>Floyd Miles</Text>
                    <Ionicons name="caret-down" size={10} color="white" />
                  </View>
                  <Network text={"Ethereum main network"} bg="0b6ffb" />
                </View>
              </Pressable>
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
            {[1, 2, 3].map((val) => (
              <View>
                <View style={[styles2.icon]}>
                  <Ionicons name="send" color={"#66c0ff"} size={25} />
                </View>
                <Text style={[styles2.iconText]}>Send</Text>
              </View>
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
              {[1, 2, 3].map((val, index) => (
                <View style={[styles.f, styles3.token]} key={index}>
                  <View style={[styles.f]}>
                    <View style={[styles3.border]}>
                      <Image
                        source={require("../../assets/sym1.png")}
                        style={{ width: 30, height: 30 }}
                      />
                    </View>
                    <View>
                      <Text style={[styles3.text, styles3.tokenName]}>
                        1inCH Token
                      </Text>
                      <Text style={([styles3.text], { color: "#948fa7" })}>
                        $3,77{" "}
                        <Text style={{ color: "#57ad7d", fontWeight: "500" }}>
                          + 3.22%
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={[styles3.text, styles3.tokenName]}>
                      10.059 1inCH
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <ButtonGradient text={"Add Token"} func={func} route={"func"} />
          </View>
        </View>
      </ScrollView>
      {show && (
        <ResuableModalCTN text={"Account"}>
          <Account func={func} setShow={setShow} navigation={navigation} />
        </ResuableModalCTN>
      )}
    </View>
  );
};

const Account = ({ func, navigation, setShow }) => {
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
        <ButtonGradientTwo
          text={"Creat New Account"}
          func={func}
          setShow={setShow}
          navigation={navigation}
        />
        <ButtonGradientTwo
          text={"Import Account"}
          func={func}
          setShow={setShow}
          navigation={navigation}
        />
      </View>
    </>
  );
};

export default Home;

const styles3 = StyleSheet.create({
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
    borderWidth: 1.5,
    borderStyle: "dashed",
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
    marginBottom: 50,
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
  },
});
