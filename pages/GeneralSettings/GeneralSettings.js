import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import StatusBarForScreens from "../../components/StatusBarForScreens";
import Constants from "../../constants/styles";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TextAndBackIcon from "../../components/TextAndBackIcon";
import ResuableModalCTN from "../../components/ResuableModalCTN";

const GeneralSettings = ({ navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();
  const [showModal, setshowModal] = useState(false);
  const [show, setShow] = useState(null);
  const [arr, setArr] = useState([]);
  const [dropDownTitle, setdropDownTitle] = useState("...");

  const data = [
    {
      title: "Currency Conversion",
      desc: "DIsplay fiat values in using a specific currency throughout the application.",
      route: "settings/general",
      array: [
        {
          text: "USD - United State Dollar",
          active: 1,
        },
        {
          text: "XLM - Stellar Lumen",
          active: 0,
        },
        {
          text: "PAY - TenX",
          active: 0,
        },
        {
          text: "TKN - TokenCard",
          active: 0,
        },
        {
          text: "ZEC - Zcash",
          active: 0,
        },
      ],
      dropDownTitle: "Base Currency",
    },
    {
      title: "Privacy Currency",
      desc: "Privacy settings,private key and wallet seed phrase",
      route: "",
      array: [
        {
          text: " Native",
          active: 1,
        },
        {
          text: "Fiat",
          active: 0,
        },
      ],
      dropDownTitle: "Base Currency",
    },
    {
      title: "Current Language",
      desc: "Access developer features, reset account, setup tesnets,sync extension,state logs.",
      route: "",
      array: [
        {
          text: "English",
          active: 1,
        },
        {
          text: "French",
          active: 0,
        },
        {
          text: "Dansk",
          active: 0,
        },
        {
          text: "Filipino",
          active: 0,
        },
        {
          text: "Estonian",
          active: 0,
        },
      ],
      dropDownTitle: "Language",
    },
    {
      title: "Search Engine",
      desc: "Add, edit, remove, and manage your accounts.",
      route: "",
      array: [
        {
          text: " Google",
          active: 1,
        },
        {
          text: "DuckDuckGo",
          active: 0,
        },
      ],
      dropDownTitle: "Search Engine",
    },
    {
      title: "Account Identification",
      desc: "You can customize your account",
      route: "",
      array: [
        {
          text: "Custom Account",
          active: 1,
        },
        {
          text: "USD - United State Dollar",
          active: 0,
        },
      ],
      dropDownTitle: "Base Currency",
    },
  ];

  const boxHeigght = Platform.OS === "ios" ? 23 : 15;

  const handleSetShowDropDown = ({ index, arr, title }) => {
    if (index == show) {
      setshowModal(false);
      setArr([]);
      setdropDownTitle("");
      return setShow(null);
    }
    setArr(arr);
    setShow(index);
    setshowModal(true);
    setdropDownTitle(title);
  };

  return (
    <View style={[Constants.container2Home]}>
      <StatusBarForScreens />
      {showModal == true && <View style={Constants.overlay}></View>}

      <ScrollView onScroll={handleScroll}>
        <TextAndBackIcon text={"General"} navigation={navigation} />
        <View style={{ marginTop: 40 }}>
          {data.map((val, index) => (
            <Pressable
              onPress={() => navigation.navigate(val.route)}
              key={index}
            >
              <View style={styles.settingBox}>
                <View style={styles.setting}>
                  <Text style={styles.title}>{val.title}</Text>
                  <Text style={styles.desc}>{val.desc}</Text>
                  <Pressable
                    style={{ marginTop: 20 }}
                    onPress={() =>
                      handleSetShowDropDown({
                        index: index,
                        arr: val.array,
                        title: val.dropDownTitle,
                      })
                    }
                  >
                    <View
                      style={[styles.input, { paddingVertical: boxHeigght }]}
                    >
                      {val.array
                        .filter((item) => item.active == 1)
                        .map((active, index) => (
                          <Text key={index} style={styles.selectText}>
                            {active.text}
                          </Text>
                        ))}
                      <View>
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={24}
                          color="white"
                          style={styles.settingIcon}
                        />
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {showModal && (
        <ResuableModalCTN text={dropDownTitle} setShow={setshowModal}>
          {Array.isArray(arr) &&
            arr.map((val, index) => (
              <View
                style={[
                  {
                    paddingVertical: boxHeigght,
                    marginTop: 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
                key={index}
              >
                <Text style={styles.selectText}>{val.text}</Text>
                {val.active == 1 && (
                  <Image
                    source={require("../../assets/check-select.png")}
                    style={{ width: 24, height: 24 }}
                  />
                )}
              </View>
            ))}
        </ResuableModalCTN>
      )}
    </View>
  );
};

export default GeneralSettings;

const styles = StyleSheet.create({
  selectText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  inputDropDown: {
    width: Dimensions.get("window").width - 50,
    padding: 15,
    backgroundColor: "#1c1924",
    color: "#948fa8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#1c1924",
    color: "#948fa8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width - 50,
  },
  desc: {
    color: "white",
    fontSize: 17,
    fontWeight: "300",
    lineHeight: 24,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  settingIcon: {
    // maxWidth: Dimensions.get("window").width,
  },
  setting: {},
  settingBox: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // flex: 1,
  },
});
