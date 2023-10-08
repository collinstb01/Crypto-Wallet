import { StyleSheet } from "react-native";
import WalletSetUp from "./pages/WalletSetUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImportSeed from "./pages/ImportSeed";
import CreateNewWallet from "./pages/CreateNewWallet";
import SecureWallet from "./pages/SecureWallet/SecureWallet";
import SecureWalletTwo from "./pages/SecureWallet/SecureWalletTwo";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
