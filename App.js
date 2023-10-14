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
import SendToken from "./pages/SendToken/SendToken";
import Confrim from "./pages/SendToken/Confrim";
import Amount from "./pages/SendToken/Amount";
import TokenDetails from "./pages/TokenDetails/TokenDetails";
import Receive from "./pages/Receive/Receive";
import Transactions from "./pages/Transactions/Transactions";
import Swap from "./pages/Swap/SwapTokens";
import { Provider } from "react-redux";
import { store } from "./features/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
            initialParams={{ index: 1 }}
          />
          <Stack.Screen
            name="send-token"
            component={SendToken}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="send-token/amount"
            component={Amount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="send-token/confirm"
            component={Confrim}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="token-details"
            component={TokenDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="receive"
            component={Receive}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="transactions"
            component={Transactions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="swap-tokens"
            component={Swap}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
