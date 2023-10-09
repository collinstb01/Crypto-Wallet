import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonGradient from "../components/ButtonGradient";
import { StatusBar } from "expo-status-bar";

const WalletSetUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        // barStyle=""
        translucent={false}
        showHideTransition={true}
        hidden={false}
      />
      <Image style={styles.line2} source={require("../assets/line2.png")} />
      <Image style={styles.line3} source={require("../assets/line3.png")} />
      <View>
        <Image style={styles.tinyLogo} source={require("../assets/logo.png")} />

        {/* <Text style={styles.textOne}>ELLAsset</Text> */}
      </View>
      <View style={{ marginBottom: 40 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#201D29",
            borderRadius: 25,
            padding: 15,
            marginTop: 10,
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate("ImportSeed")}
        >
          <Text style={styles.buttonText}>Import Using Seed Phrase</Text>
        </TouchableOpacity>
        <ButtonGradient
          navigation={navigation}
          text={"Create New Wallet"}
          route={"CreateWallet"}
        />
      </View>
    </View>
  );
};

export default WalletSetUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09080c",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line3: {
    position: "absolute",
    left: -100,
    top: -86,
  },
  line2: {
    position: "absolute",
    left: 0,
    width: Dimensions.get("window").width,
  },
  tinyLogo: {
    marginTop: 200,
  },
  textOne: {
    color: "wheat",
    fontSize: 50,
    marginTop: 200,
    fontStyle: "italic",
    fontWeight: "700",
  },
  button: {
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  buttonText: {
    fontWeight: "800",
    fontSize: 19,
    color: "white",
    textAlign: "center",
  },
});
