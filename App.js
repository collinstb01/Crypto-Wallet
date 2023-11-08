import { Platform, StyleSheet } from "react-native";
import "react-native-get-random-values";
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
import Settings from "./pages/Settings/Settings";
import AddTokens from "./pages/AddTokens/AddTokens";
import Preferences from "./pages/Preferences/Preferences";
import GeneralSettings from "./pages/GeneralSettings/GeneralSettings";
import SecurityPrivacy from "./pages/SecurityPrivacy/SecurityPrivacy";
import RevealSeedPhrase from "./pages/RevealSeedPhrase/RevealSeedPhrase";
import chnagePassword from "./pages/chnagePassword/chnagePassword";
import ListOfTokens from "./pages/ListOfTokens/ListOfTokens";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { listenForEthAndERC20Transfer } from "./constants/HelperFunctions";
import React from "react";
import ApproveSendToken from "./pages/ApproveSendToken/ApproveSendToken";

const Stack = createNativeStackNavigator();
const BACKGROUND_FETCH_TASK = "background-fetch";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log("called background running");
  // listenForEthAndERC20Transfer();
  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  console.log("called2");
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 3 seconds
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}
export default function App() {
  const statusBarHeight = Platform.OS === "ios" ? 80 : 0;

  React.useEffect(() => {
    const register = async () => {
      await registerBackgroundFetchAsync();
    };
    register();
  }, []);

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
          <Stack.Screen
            name="settings"
            component={Settings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="add-token"
            component={AddTokens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="preferences"
            component={Preferences}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings/general"
            component={GeneralSettings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings/security-privacy"
            component={SecurityPrivacy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings/reveal-seed-phrase"
            component={RevealSeedPhrase}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings/change-password"
            component={chnagePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="swap/list-tokens"
            component={ListOfTokens}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="swap/list-tokens"
            component={ApproveSendToken}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
