import { StyleSheet } from "react-native";
import WalletSetUp from "./pages/WalletSetUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImportSeed from "./pages/ImportSeed";
import CreateNewWallet from "./pages/CreateNewWallet";
import SecureWallet from "./pages/SecureWallet/SecureWallet";
import SecureWalletTwo from "./pages/SecureWallet/SecureWalletTwo";
import SecondPhase from "./pages/SecondPhase/SecondPhase";
import ThirdPhase from "./pages/ThirdPhase/ThirdPhase";
import Success from "./pages/Success/Success";
import Home from "./pages/Home/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SetUpWallet">
        <Stack.Screen
          name="SetUpWallet"
          component={WalletSetUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImportSeed"
          component={ImportSeed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateWallet"
          component={CreateNewWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SecureYourWallet"
          component={SecureWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="secure-your-wallet-two"
          component={SecureWalletTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="second-phase"
          component={SecondPhase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="third-phase"
          component={ThirdPhase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="success"
          component={Success}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
