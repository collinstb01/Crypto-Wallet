import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StatusBarForScreens from "../../components/StatusBarForScreens";
import Constants from "../../constants/styles";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TextAndBackIcon from "../../components/TextAndBackIcon";

const Preferences = ({ navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();

  const data = [
    {
      title: "General",
      desc: "Currency conversion,primary currency, language and search engine",
      route: "settings/general",
    },
    {
      title: "Security & Privacy",
      desc: "Privacy settings,private key and wallet seed phrase",
      route: "settings/security-privacy",
    },
    ,
    {
      title: "Advanced",
      desc: "Access developer features, reset account, setup tesnets,sync extension,state logs.",
      route: "",
    },
    {
      title: "Contacts",
      desc: "Add, edit, remove, and manage your accounts.",
      route: "",
    },
    {
      title: "Networks",
      desc: "Add and edit custom RPC networks",
      route: "",
    },
    {
      title: "Experimental",
      desc: "About DefiWB",
      route: "",
    },
  ];

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
                </View>
                <View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="white"
                    style={styles.settingIcon}
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  desc: {
    color: "white",
    fontSize: 17,
    fontWeight: "300",
    width: 300,
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
