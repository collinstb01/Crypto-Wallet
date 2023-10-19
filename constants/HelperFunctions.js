import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
import { encryptionKey } from "../constants/DATA";
import { ethers, Wallet, HDNodeWallet } from "ethers";
import axios from "axios";

let ETHERSCAN_API_KEY = "95GKUEVKANAKHD1J994RT2Z3415D4UI6ZY";

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
  setLoading(true);
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
  if (route == "") {
    if (seedPrase == "") {
      return _helperFunc({
        error: "Seed Phrase is required.",
        loading: false,
        setErr,
        setLoading,
      });
    }
    let seedPhraseVerification = seedPrase.split(" ");
    if (seedPhraseVerification.length != 12) {
      return _helperFunc({
        error: "Seed Phrase not correct, Please check and try again.",
        loading: false,
        setErr,
        setLoading,
      });
    }

    const path = "m/44'/60'/0'/0/0";

    const walletPhraseData = ethers.Wallet.fromPhrase(seedPrase, path);

    const encryptedPrivateKey = await _encryotData({
      data: walletPhraseData.privateKey,
    });

    const encryptedWalletAddress = await _encryotData({
      data: walletPhraseData.address,
    });

    let wallet = {
      walletAddress: encryptedWalletAddress,
      privateKey: encryptedPrivateKey,
      name: "",
      active: 1,
      walletName: "",
    };

    let networks = [
      {
        name: "Ethereum main Network",
        id: "eth",
        active: 1,
        color: "6c62c5",
        rpcURL: "https://mainnet.infura.io/v3/",
        chainId: 1,
      },
      {
        name: "Sepolia Test Network",
        id: "sepolia",
        active: 0,
        color: "ff3a58",
        rpcURL: "https://eth-sepolia.g.alchemy.com/v2/demo",
        chainId: 11155111,
      },
      {
        name: "Smart Chain - Testnet",
        id: "bscTestNet",
        active: 0,
        color: "a769ec",
        rpcURL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        chainId: 97,
      },
      {
        name: "Binance Smart Chain",
        id: "bsc",
        active: 0,
        color: "29d041",
        rpcURL: "https://bsc-dataseed.binance.org/",
        chainId: 56,
      },
    ];
    const tokens = [
      {
        name: "Ethereum main Network",
        amount: Number(
          await getBalance({
            rpcURL: networks[0].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        network: "eth",
        walletAddress: encryptedWalletAddress,
      },
      {
        name: "Sepolia Test Network",
        amount: Number(
          await getBalance({
            rpcURL: networks[1].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "sepolia",
        address: "0x0000000000000000000000000000000000000000",
        network: "sepolia",
        walletAddress: encryptedWalletAddress,
      },
      {
        name: "Smart Chain - Testnet",
        amount: Number(
          await getBalance({
            rpcURL: networks[2].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "bscTestNet",
        address: "0x0000000000000000000000000000000000000000",
        network: "bscTestNet",
        walletAddress: encryptedWalletAddress,
      },
      {
        name: "Binance Smart Chain",
        amount: Number(
          await getBalance({
            rpcURL: networks[3].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "bsc",
        address: "0x0000000000000000000000000000000000000000",
        network: "bsc",
        walletAddress: encryptedWalletAddress,
      },
    ];

    console.log(walletPhraseData.address);
    let historys = await _getUserTransactions({
      WalletAddress: walletPhraseData.address,
    });
    await AsyncStorage.setItem("wallets", JSON.stringify([wallet]));
    await AsyncStorage.setItem("tokens", JSON.stringify(tokens)); //
    await AsyncStorage.setItem("networks", JSON.stringify(networks)); // done
    await AsyncStorage.setItem("TXhistory", JSON.stringify([])); // done

    navigation.navigate("home");
  } else {
    navigation.navigate(route);
  }
};

export const _importUserAcount = async () => {
  // request for the user private key
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
    let tokens = await AsyncStorage.getItem("tokens");
    let parseWallets = JSON.parse(wallets);
    let parseTokens = JSON.parse(tokens);

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

    const tokenArr = [
      {
        name: "Ethereum main Network",
        amount: 0,
        symbol: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        network: "eth",
        walletAddress: encryptedWalletAddress,
      },
      {
        name: "Sepolia Test Network",
        amount: 0,
        symbol: "sepolia",
        address: "0x0000000000000000000000000000000000000000",
        network: "sepolia",
        walletAddress: encryptedWalletAddress,
      },
      {
        name: "Smart Chain - Testnet",
        amount: 0,
        symbol: "bscTestNet",
        address: "0x0000000000000000000000000000000000000000",
        network: "bscTestNet",
        walletAddress: encryptedWalletAddress,
      },
      {
        name: "Binance Smart Chain",
        amount: 0,
        symbol: "bsc",
        address: "0x0000000000000000000000000000000000000000",
        network: "bsc",
        walletAddress: encryptedWalletAddress,
      },
    ];

    let newArr = [...parseTokens, ...tokenArr];
    parseWallets.push(walletObj);

    console.log(parseTokens);
    await AsyncStorage.setItem("wallets", JSON.stringify(parseWallets));
    await AsyncStorage.setItem("tokens", JSON.stringify(newArr));
  } catch (error) {
    setLoading(false);
    // console.log(error);
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

  const activeWallet = await _getActiveWallet();
  let parseActiveWactiveWallet = JSON.parse(activeWallet);

  const tokens = await AsyncStorage.getItem("tokens");

  let d = JSON.parse(tokens).filter(
    (val) => val.network == parseActiveNetwork.id
  );
  console.log(parseActiveWactiveWallet);
  console.log(d);

  let final = d.filter(
    (val) => val.walletAddress == parseActiveWactiveWallet.walletAddress
  );
  return JSON.stringify(final);
};

export const _addTokens = async ({ addr }) => {
  console.log("adding");

  const activeNetwork = await _getActiveNetwork();
  const activeWallet = await _getActiveWallet();
  let parseActiveNetwork = JSON.parse(activeNetwork);
  let parseActiveWallet = JSON.parse(activeWallet);

  const tokens = await AsyncStorage.getItem("tokens");

  // if (JSON.parse(tokens).find((val) => val.address == addr)) {
  //   return console.log("Already Listed");
  // }

  const parseTokens = JSON.parse(tokens);

  let abi = await getContractAbi({
    contractAddress: addr,
  });

  console.log(parseActiveNetwork.rpcURL);

  // let API_KEY = "3d24b57ebfb8442bb83583ed476e0133";
  let provider;
  if (parseActiveNetwork.rpcURL == "https://mainnet.infura.io/v3/") {
    provider = new ethers.JsonRpcProvider(
      "https://eth-mainnet.g.alchemy.com/v2/XC3CF1s2-vjl609ZpkChVZywHbCzh-YI"
    );
  } else {
    console.log("sepolia");
    provider = new ethers.JsonRpcProvider(parseActiveNetwork.rpcURL);
  }

  let userWalletAddress = await _decryotData({
    encryptedData: parseActiveWallet.walletAddress,
  });

  const contract = new ethers.Contract(addr, abi, provider);
  const userTokenBalance = await contract.balanceOf(userWalletAddress);

  const token = {
    name: await contract.name(),
    amount: Number(userTokenBalance),
    symbol: await contract.symbol(),
    address: addr,
    network: parseActiveNetwork.id,
    walletAddress: parseActiveWallet.walletAddress,
    // decimals: await contract.decimals(),
  };

  parseTokens.push(token);
  await AsyncStorage.setItem("tokens", JSON.stringify(parseTokens));
};

export const removeToken = async () => {};

async function getContractAbi({ contractAddress }) {
  try {
    // const response = await axios.get(
    //   `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`
    // );

    let abi = [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    return abi;
  } catch (error) {
    console.log(error);
  }
}

export const _getUserTransactions = async ({ WalletAddress }) => {
  // let response = await axios.get(
  //   `https://api.etherscan.io/api?module=account&action=txlist&address=${"0x558A03Ea3052620c34D12fA3A1500EbA7D135bE9"}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${ETHERSCAN_API_KEY}`
  // );
  // console.log(response.data);
  // return JSON.stringify(response.data);
};

const getBalance = async ({ rpcURL, address }) => {
  console.log("getting");

  const provider = new ethers.JsonRpcProvider(
    rpcURL == "https://mainnet.infura.io/v3/"
      ? "https://eth-mainnet.g.alchemy.com/v2/XC3CF1s2-vjl609ZpkChVZywHbCzh-YI"
      : rpcURL
  );
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.formatEther(balance);
  console.log(balanceInEth);
  return balanceInEth;
};

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
