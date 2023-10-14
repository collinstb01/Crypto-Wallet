import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Tabs from "../../components/Tabs";
import useHandleScrollFunc from "../../Hooks/handleScroll";
import NameAndNetwork from "../../components/NameAndNetwork";

const Swap = ({ route, navigation }) => {
  const [isScrolling, handleScroll] = useHandleScrollFunc();

  return (
    <View style={[styles.container]}>
      {!isScrolling && <Tabs navigation={navigation} route={route} />}

      <ScrollView onScroll={handleScroll}>
        <View style={{ marginBottom: 50 }}>
          <NameAndNetwork />
        </View>
      </ScrollView>
    </View>
  );
};

export default Swap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09080d",
    padding: 15,
    paddingTop: 20,
  },
});
