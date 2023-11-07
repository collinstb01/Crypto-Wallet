import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonGradient from "../../components/ButtonGradient";
import {
  _encryotData,
  _getrecentsAddressSentTo,
} from "../../constants/HelperFunctions";
import Empty from "../../components/Empty";
import { useDispatch } from "react-redux";
import { setSendToken } from "../../features/StorageAuth/StorageAuth";
import { Pressable } from "react-native";

const Recent = ({ navigation, valid, to, from, handleChange }) => {
  const [recents, setRecents] = useState(null);

  const dispatch = useDispatch();

  const func = async () => {
    navigation.navigate("send-token/amount");
    const _from = await _encryotData({ data: from });

    dispatch(setSendToken({ to, from: _from }));
  };

  const getrecentsAddressSentTo = async () => {
    const data = await _getrecentsAddressSentTo();
    let parseData = JSON.parse(data);
    setRecents(parseData);
  };
  useEffect(() => {
    getrecentsAddressSentTo();
  }, []);

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "column",
        },
        valid && { justifyContent: "space-between" },
      ]}
    >
      <Text
        style={[
          {
            color: "white",
            fontWeight: "600",
            fontSize: 20,
            marginBottom: 30,
          },
          valid && { marginTop: 20, fontSize: 12 },
        ]}
      >
        {valid ? "Click Next to Proceed" : "Recent"}
      </Text>
      {!valid &&
        (recents == "[]" ? (
          <Empty text={"No Recent Data Found"} />
        ) : (
          <>
            <View>
              {JSON.parse(recents)?.map((val, index) => (
                <Pressable onPress={() => handleChange(val.to)} key={index}>
                  <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <Image
                      source={require("../../assets/face1.png")}
                      style={styles.img}
                    />
                    <View>
                      <Text style={[styles.text1, { color: "white" }]}>
                        {"Account: "}
                        {`${val.from.slice(0, 4)}...${val.from.slice(-5)}`}
                      </Text>
                      <Text style={[styles.text2, { color: "white" }]}>
                        {`To: ${val.to.slice(0, 4)}...${val.to.slice(-5)}`}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        ))}
      {valid && (
        <View style={{ marginTop: 50 }}>
          <ButtonGradient
            text={"Next"}
            func={func}
            route={"func"}
            widthSp={200}
          />
        </View>
      )}
    </View>
  );
};

export default Recent;

const styles = StyleSheet.create({
  text1: {
    fontSize: 18,
    fontWeight: "500",
  },
  text2: {},
  img: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
});
