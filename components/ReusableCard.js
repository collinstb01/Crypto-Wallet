import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ReusableCard = ({
  text,
  children,
  show,
  navigation,
  route,
  backFunc,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          position: "relative",
          height: 10,
          width: Dimensions.get("window").width,
          top: 70,
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
            alignItems: "center",
          }}
        >
          <Pressable onPress={backFunc}>
            <Ionicons
              name="chevron-back"
              size={22}
              color="#948fa8"
              style={{
                marginTop: 0,
                marginLeft: 0,
                position: "relative",
                left: 20,
                top: 12,
              }}
            />
          </Pressable>

          <View
            style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}
          >
            <Text style={styles.import}>{text}</Text>
          </View>
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
    marginTop: 80,
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
