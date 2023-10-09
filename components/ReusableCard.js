import { Dimensions, StyleSheet, Text, View, Navigation } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ReusableCard = ({ text, children, show, navigation, route }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          position: "relative",
          height: 10,
          width: Dimensions.get("window").width,
          top: 90,
          left: 0,
          zIndex: 22,
        }}
      >
        {!show && (
          <View
            style={{
              backgroundColor: "#1c1924",
              height: 20,
              width: Dimensions.get("window").width - 50,
              zIndex: 2,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          ></View>
        )}
      </View>
      <View style={styles.containerTwo}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            onPress={() => navigation.navigate(route)}
            name="md-arrow-back"
            size={20}
            color="#948fa8"
            style={{ position: "absolute", left: 30, top: 16 }}
          />
          <Text style={styles.import}>{text}</Text>
        </View>
        {children}
      </View>
    </View>
  );
};

export default ReusableCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#09080c",
    flex: 1,
  },
  containerTwo: {
    marginTop: 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#131118",
    flex: 1,
  },
  import: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 15,
    color: "white",
    fontWeight: "700",
  },
});
