import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
import { encryptionKey } from "../constants/DATA";
import { ethers, Wallet, HDNodeWallet } from "ethers";
import axios from "axios";

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

export const _setNetworks = async ({ id }) => {
  let _network = await AsyncStorage.getItem("networks");
  // find active and set it to 0
  // find new active and change to 1
  let parseNetwork = JSON.parse(_network);
  const active = parseNetwork.find((val) => val.active == 1);
  const soonToBeactive = parseNetwork.find((val) => val.id == id);

  active.active = 0;
  soonToBeactive.active = 1;

  await AsyncStorage.setItem("networks", JSON.stringify(parseNetwork));
  return true;
};

export const _getActiveWallet = async () => {
  const activeWallet = await AsyncStorage.getItem("wallets");
  const parseWallet = JSON.parse(activeWallet);
  let filterWallet = parseWallet.find((val) => val.active == 1);

  return JSON.stringify(filterWallet);
};

export const _getWallets = async () => {
  let _wallet = await AsyncStorage.getItem("wallets");

  return _wallet;
};

export const _createWallet = async ({ walletName, setLoading, setError }) => {
  try {
    let wallets = await AsyncStorage.getItem("wallets");
    let parseWallets = JSON.parse(wallets);

    // if (parseWallets.find((val) => val.name == walletName)) {
    //   return setError("Name Already exist, use another Account Name.");
    // }

    let activeWallet = parseWallets.find((val) => val.active == 1);
    activeWallet.active = 0;

    let user = await AsyncStorage.getItem("user");
    let mnemonic = JSON.parse(user).seedPrase;

    let decryptMnemonic = await _decryotData({ encryptedData: mnemonic });

    const wallet = HDNodeWallet.fromPhrase(decryptMnemonic);

    const encryptedWalletAddress = await _encryotData({
      data: wallet.address,
    });
    const encryptedPrivateKey = await _encryotData({
      data: wallet.privateKey,
    });

    let walletObj = {
      walletAddress: encryptedWalletAddress,
      privateKey: encryptedPrivateKey,
      name: "",
      active: 1,
      walletName: walletName,
    };

    parseWallets.push(walletObj);

    await AsyncStorage.setItem("wallets", JSON.stringify(parseWallets));
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

export const _setWallets = async ({ walletAddress }) => {
  let _wallet = await AsyncStorage.getItem("wallets");
  // find active and set it to 0
  // find new active and change to 1

  let parseNetwork = JSON.parse(_wallet);
  const active = parseNetwork.find((val) => val.active == 1);
  const soonToBeactive = parseNetwork.find(
    (val) => val.walletAddress == walletAddress
  );

  console.log(active, soonToBeactive);
  active.active = 0;
  soonToBeactive.active = 1;

  await AsyncStorage.setItem("wallets", JSON.stringify(parseNetwork));
  return true;
};

const _encryotData = async ({ data }) => {
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();

  return encryptedData;
};

export const _decryotData = async ({ encryptedData }) => {
  const decryptedData = CryptoJS.AES.decrypt(
    encryptedData,
    encryptionKey
  ).toString(CryptoJS.enc.Utf8);

  return decryptedData;
};

/////TOKENS/////

export const _getTokens = async () => {
  const activeNetwork = await _getActiveNetwork();
  let parseActiveNetwork = JSON.parse(activeNetwork);

  const tokens = await AsyncStorage.getItem("tokens");

  let d = JSON.parse(tokens).filter(
    (val) => val.network == parseActiveNetwork.id
  );

  console.log("filter data", d, parseActiveNetwork);

  return JSON.stringify(d);
};

export const _addTokens = async ({ addr }) => {
  const activeNetwork = await _getActiveNetwork();
  const activeWallet = await _getActiveWallet();
  let parseActiveNetwork = JSON.parse(activeNetwork);
  let parseActiveWallet = JSON.parse(activeWallet);

  const tokens = await AsyncStorage.getItem("tokens");

  if (JSON.parse(tokens).find((val) => val.address == addr)) {
    return console.log("Already Listed");
  }
  const parseTokens = JSON.parse(tokens);

  let abi = await getContractAbi({
    contractAddress: addr,
  });

  // let API_KEY = "3d24b57ebfb8442bb83583ed476e0133";
  let provider;

  if (parseActiveNetwork.rpcURL == "https://mainnet.infura.io/v3/") {
    provider = new ethers.JsonRpcProvider(
      "https://eth-mainnet.g.alchemy.com/v2/XC3CF1s2-vjl609ZpkChVZywHbCzh-YI"
    );
  } else {
    provider = new ethers.JsonRpcProvider(parseActiveNetwork.rpcURL);
  }

  const contract = new ethers.Contract(addr, abi, provider);
  const userTokenBalance = await contract.balanceOf(addr);

  console.log(contract);
  const token = {
    name: await contract.name(),
    amount: ethers.formatUnits(userTokenBalance, 18),
    symbol: await contract.symbol(),
    address: addr,
    network: activeNetwork.network,
    userAddr: parseActiveWallet.walletAddress,
    // decimals: await contract.decimals(),
  };

  parseTokens.push(token);

  console.log(parseTokens);
  await AsyncStorage.setItem("tokens", JSON.stringify(parseTokens));
};

async function getContractAbi({ contractAddress }) {
  const response = await axios.get(
    `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=95GKUEVKANAKHD1J994RT2Z3415D4UI6ZY`
  );
  const abi = JSON.parse(response.data.result);

  return abi;
}

// const ethers = require("ethers");

// const provider = new ethers.providers.WebSocketProvider("ws://localhost:8546");

// const filter = {
//   to: "0x1234567890abcdef1234567890abcdef12345678",
// };

// provider.on("pending", async (txHash, event) => {
//   if (event.filter(filter)) {
//     const tx = await provider.getTransaction(txHash);
//     console.log(tx.hash);
//   }
// });
