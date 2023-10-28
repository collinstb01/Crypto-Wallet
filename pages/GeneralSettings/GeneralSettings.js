import {
  Dimensions,
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

const GeneralSettings = ({ navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();
  const [show, setShow] = useState(null);

  const data = [
    {
      title: "Currency Conversion",
      desc: "DIsplay fiat values in using a specific currency throughout the application.",
      route: "settings/general",
      array: [
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 1,
        },
      ],
    },
    {
      title: "Privacy Currency",
      desc: "Privacy settings,private key and wallet seed phrase",
      route: "",
      array: [
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " NGN - Niggeria Naira",
          active: 1,
        },
      ],
    },
    {
      title: "Current Language",
      desc: "Access developer features, reset account, setup tesnets,sync extension,state logs.",
      route: "",
      array: [
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 1,
        },
      ],
    },
    {
      title: "Search Engine",
      desc: "Add, edit, remove, and manage your accounts.",
      route: "",
      array: [
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 1,
        },
      ],
    },
    {
      title: "Account Identification",
      desc: "Add and edit custom RPC networks",
      route: "",
      array: [
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 0,
        },
        {
          text: " USD - United State Dollar",
          active: 1,
        },
      ],
    },
  ];

  const boxHeigght = Platform.OS === "ios" ? 23 : 15;

  const handleSetShowDropDown = ({ index }) => {
    if (index == show) {
      return setShow(null);
    }
    setShow(index);
  };

  console.log(show);
  return (
    <View style={[Constants.container2Home]}>
      <StatusBarForScreens />

      <ScrollView onScroll={handleScroll}>
        <TextAndBackIcon text={"Preferences"} navigation={navigation} />
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
                    onPress={() => handleSetShowDropDown({ index: index })}
                  >
                    <View
                      style={[styles.input, { paddingVertical: boxHeigght }]}
                    >
                      {val.array
                        .filter((item) => item.active == 1)
                        .map((active) => (
                          <Text style={styles.selectText}>{active.text}</Text>
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
                    {show == index && (
                      <View style={{ backgroundColor: "gray" }}>
                        {val.array.map((val, index) => (
                          <View
                            style={[
                              styles.inputDropDown,
                              {
                                paddingVertical: boxHeigght,
                                marginTop: 10,
                              },
                            ]}
                            key={index}
                          >
                            <Text style={styles.selectText}>
                              USD - United State Dollar
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
