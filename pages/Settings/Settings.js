import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import Tabs from "../../components/Tabs";
import Constants from "../../constants/styles";
import StatusBarForScreens from "../../components/StatusBarForScreens";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Share } from "react-native";
import { Alert } from "react-native";
import {
  _decryotData,
  _getActiveWallet,
} from "../../constants/HelperFunctions";
import { useState } from "react";
import { useEffect } from "react";

const Settings = ({ route, navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();
  const [activeWallet, setActiveWallet] = useState(null);

  const settings = [
    {
      icon: MaterialIcons,
      iconname: "account-circle",
      name: "Account",
      route: "",
    },
    {
      icon: FontAwesome,
      iconname: "share-square-o",
      name: "Share My Public Address",
      route: "share",
    },
    {
      icon: MaterialCommunityIcons,
      iconname: "eye-settings",
      name: "View on Etherscan",
      route: "",
    },
    {
      icon: MaterialIcons,
      iconname: "room-preferences",
      name: "Peferences",
      route: "",
    },
    {
      icon: AntDesign,
      iconname: "logout",
      name: "Log out",
      route: "SetUpWallet",
    },
  ];

  const getActiveWalets = async () => {
    const data = await _getActiveWallet();
    let parseData = JSON.parse(data);
    let decryptDataWalletAddress = await _decryotData({
      encryptedData: parseData.walletAddress,
    });
    setActiveWallet(decryptDataWalletAddress);
  };

  console.log(activeWallet);
  const handleRoute = async ({ route }) => {
    if (route == "") return;
    if (route == "share") {
      onShare();
      return;
    }
    navigation.navigate(route);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: activeWallet,
        title: "Wallet Address",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getActiveWalets();
  }, []);

  return (
    <View style={[Constants.container2Home]}>
      {!isScrolling && <Tabs navigation={navigation} route={route} />}

      <StatusBarForScreens />

      <ScrollView onScroll={handleScroll}>
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.text}>Settings</Text>
          <View style={styles.settings}>
            {settings.map((val, index) => (
              <Pressable
                onPress={() => handleRoute({ route: val.route })}
                key={index}
              >
                <View style={styles.setting}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: val.iconname == "logout" ? 70 : 30,
                    }}
                  >
                    <val.icon name={val.iconname} size={24} color="white" />
                    <Text
                      style={[
                        styles.settingsText,
                        {
                          fontWeight: val.iconname == "logout" ? "600" : "400",
                        },
                      ]}
                    >
                      {val.name}
                    </Text>
                  </View>
                  <View>
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsText: {
    color: "white",
    fontSize: 20,
    marginLeft: 18,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settings: {
    marginTop: 30,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#09080d",
    padding: 15,
    paddingTop: 20,
  },
});
