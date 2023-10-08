import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const Step = ({ one }) => {
  return (
    <View style={styles.container}>
      {/* <StatusBar /> */}
      <Text style={{ marginRight: 30 }}>
        <Ionicons
          name="md-arrow-back"
          size={20}
          color="#948fa8"
          style={{
            fontWeight: "800",
          }}
        />
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {[1, 2, 3].map((val, index) => {
          return (
            <>
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
                    key={index}
                    style={[styles.line, index == 2 && { right: 20 }]}
                  ></View>
                  <View
                    style={[
                      styles.ball,
                      { backgroundColor: "#2f2a3c", borderRadius: 50 },
                    ]}
                  ></View>
                </>
              )}
            </>
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
        1/3
      </Text>
    </View>
  );
};

export default Step;

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    backgroundColor: "#2f2a3c",
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
