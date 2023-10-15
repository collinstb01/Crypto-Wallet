import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
import { encryptionKey } from "../constants/DATA";

export const _checkPasswordStrength = ({ password, setPS }) => {
  if (password.length <= 6) {
    return setPS((e) => ({ ...e, color: "red", stength: "Poor" }));
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    return setPS((e) => ({ ...e, color: "green", stength: "Strong" }));
  }

  // number and letter
  if (/[a-zA-Z].*\d|\d.*[a-zA-Z]/.test(password)) {
    return setPS((e) => ({ ...e, color: "#efa02c", stength: "Weak" }));
  }
  return setPS((e) => ({ ...e, color: "red", stength: "Poor" }));
};

export const _helperFunc = ({ error, loading, setErr, setLoading }) => {
  setErr(error);
  setLoading(loading);

  setTimeout(() => {
    setErr("");
  }, 5000);
};

export const _createUserAccount = async ({
  password,
  confirmPassword,
  setErr,
  setLoading,
  passwordStrength,
  agreed,
  navigation,
  route,
  seedPrase,
}) => {
  if (password == "" || confirmPassword == "") {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Please both fields are required.",
      loading: false,
    });
  }

  if (password.length <= 6) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password Length must be more than 6 characters",
      loading: false,
    });
  }

  if (password !== confirmPassword) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password Doesn't Match,Please try again.",
      loading: false,
    });
  }

  if (passwordStrength.stength == "Poor") {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password Too Weak, Should contain both alphabets or numbers.",
      loading: false,
    });
  }

  if (agreed == false) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Pleae Agreed to EllAssest Terms.",
      loading: false,
    });
  }
  const encryptedData = CryptoJS.AES.encrypt(
    password,
    encryptionKey
  ).toString();

  // hasing Password
  // const decryptedData = CryptoJS.AES.decrypt(
  //   encryptedData,
  //   encryptionKey
  // ).toString(CryptoJS.enc.Utf8);

  if (seedPrase) {
    const encryptedseedPrase = CryptoJS.AES.encrypt(
      seedPrase,
      encryptionKey
    ).toString();

    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ password: encryptedData, seedPrase: encryptedseedPrase })
    );
  } else {
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ password: encryptedData, seedPrase: "" })
    );
  }
  navigation.navigate(route);
};

export const _getActiveNetwork = async () => {
  const activeNetwork = await AsyncStorage.getItem("networks");
  const parseNetwork = JSON.parse(activeNetwork);
  let filterNetwork = parseNetwork.find((val) => val.active == 1);

  return JSON.stringify(filterNetwork);
};

export const _getNetworks = async () => {
  let _networks = await AsyncStorage.getItem("networks");
  let parseData = JSON.parse(_networks);
  let networks = parseData.filter((val) => val.active == 0);

  return JSON.stringify(networks);
};

export const _getActiveWallet = async () => {
  const activeWallet = await AsyncStorage.getItem("wallets");
  const parseWallet = JSON.parse(activeWallet);
  let filterWallet = parseWallet.find((val) => val.active == 1);

  return JSON.stringify(filterWallet);
};

export const _getWallets = async () => {
  let _wallet = await AsyncStorage.getItem("networks");

  return JSON.stringify(_wallet);
};
