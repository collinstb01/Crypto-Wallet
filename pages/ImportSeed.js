import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Input from "../components/Input";
import FaceId from "../components/FaceId";
import ReusableCard from "../components/ReusableCard";

const ImportSeed = ({ navigation }) => {
  const [number, onChangeNumber] = React.useState("");
  const [text, onChangeText] = React.useState("Useless Text");

  return (
    <ReusableCard text={"Import From Seed"}>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Seed Phrase"
            placeholderTextColor={"#948fa8"}
          />
          <Ionicons
            name="md-scan"
            size={20}
            color="#948fa8"
            style={{ position: "absolute", right: 50, top: 17 }}
          />
          <Ionicons
            name="md-eye"
            size={20}
            color="#948fa8"
            style={{ position: "absolute", right: 15, top: 17 }}
          />
        </View>
        <View style={{ marginTop: 100 }}>
          <Input text="New Password" />
        </View>
        <View style={{ marginTop: 30 }}>
          <Input text="Confirm Password" />
        </View>
        <Text
          style={{
            marginLeft: 20,
            color: "#6b6779",
            marginTop: 3,
            fontWeight: "700",
          }}
        >
          Must be at least 8 characters
        </Text>
        <FaceId />
        <Text style={{ color: "white" }}>
          By proceeding, you agree to these{" "}
          <Text style={{ color: "#0c5dd0" }}>Term and Conditions.</Text>
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#201D29",
            borderRadius: 10,
            padding: 15,
            marginTop: 60,
          }}
          onPress={() => navigation.navigate("ImportSeed")}
        >
          <Text style={styles.buttonText}>Import</Text>
        </TouchableOpacity>
      </View>
    </ReusableCard>
  );
};

export default ImportSeed;

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "800",
    fontSize: 19,
    color: "white",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1c1924",
    color: "#948fa8",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
  },
});
