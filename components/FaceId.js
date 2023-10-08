import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FaceId = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.signIn}>Sign In With Face ID?</Text>
      <Text>True</Text>
    </View>
  );
};

export default FaceId;

const styles = StyleSheet.create({
  signIn: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
