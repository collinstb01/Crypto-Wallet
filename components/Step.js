import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";

const Step = ({ one, navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* <StatusBar /> */}
      <Pressable style={{ justifyContent: "center" }} onPress={handleBack}>
        <Text style={{ marginRight: 30, marginTop: 2 }}>
          <Ionicons
            name="md-arrow-back"
            size={20}
            color="#948fa8"
            style={{
              fontWeight: "800",
            }}
          />
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {[1, 2, 3].map((val, index) => {
          return (
            <View key={index}>
              <>
                <View
                  key={index}
                  style={[
                    styles.line,
                    {
                      left: index == 0 ? 20 : index == 2 ? -100 : -100000,
                      backgroundColor:
                        one == 1
                          ? "#2f2a3c"
                          : one == 2
                          ? index == 0
                            ? "#65d2f2"
                            : "#2f2a3c"
                          : one == 3
                          ? "#65d2f2"
                          : "",
                    },
                  ]}
                ></View>
                {val <= one ? (
                  <LinearGradient
                    colors={["#85FFC4", "#5CC6FF", "#BC85FF"]}
                    end={{ x: 0.1, y: 0.2 }}
                    start={{ x: 1, y: 0 }}
                    style={styles.ball}
                  >
                    <View style={styles.ball}></View>
                  </LinearGradient>
                ) : (
                  <>
                    <View
                      style={[
                        styles.ball,
                        { backgroundColor: "#2f2a3c", borderRadius: 50 },
                      ]}
                    ></View>
                  </>
                )}
              </>
            </View>
          );
        })}
      </View>
      <Text
        style={{
          marginLeft: 30,
          color: "white",
          fontWeight: "700",
        }}
      >
        {one}/3
      </Text>
    </View>
  );
};

export default Step;

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    height: 5,
    width: 100,
    top: 8,
    zIndex: -1,
  },
  ball: {
    height: 20,
    width: 20,
    borderRadius: 50,
  },
  container: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 30,
  },
});
