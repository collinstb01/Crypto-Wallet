import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

const StatusBarForScreens = ({}) => {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#09080c"
        barStyle="light-content"
        translucent={false}
        showHideTransition={true}
        hidden={false}
      />
    </View>
  );
};

export default StatusBarForScreens;

const styles = StyleSheet.create({});
