import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const ReusableCard = ({ text, children, show }) => {
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
        <Text style={styles.import}>{text}</Text>
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
